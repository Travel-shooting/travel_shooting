import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadPost } from '../../redux/slices/postSlice';
import supabase from '../../util/supabase/supabaseClient';
const Img = styled.img`
  cursor: pointer;
`;

const Tag = styled.button`
  padding: 10px 16px;
  margin: 4px;
  color: ${(props) => (props.selected ? 'var(--black-color)' : 'var(--white-color)')};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  letter-spacing: 0.05em;
  background-color: ${(props) => (props.selected ? 'var(--yellow-color)' : 'var(--black-color)')};
  &:hover {
    background-color: var(--yellow-color);
    color: var(--black-color);
  }
`;
const NoData = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  text-align: center;
  color: var(--darkgrey-color);
  font-weight: 600;
  line-height: 1.5;
`;
const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [postDatas, setPostDatas] = useState([]);
  const loadData = useSelector((state) => state.post.loadData);
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  useEffect(() => {
    const tagData = async () => {
      const { data: tagData, tagError } = await supabase.from('POSTTAG').select('*');
      if (tagError) console.error(tagError);
      else setTags(tagData);
    };

    const fetchData = async () => {
      const { data, error } = await supabase.from('POST').select('*');
      if (error) {
        console.error(error);
      } else {
        const updatedData = data.map((item) => {
          const imageURLs = JSON.parse(item.imageURL).map((obj) => obj.url);
          return {
            ...item,
            imageURL: imageURLs
          };
        });
        setPostDatas(updatedData);
        dispatch(loadPost(updatedData));
      }
    };
    tagData();
    fetchData();
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = (query) => {
    const filtered = postDatas.filter((post) => post.postTitle.toLowerCase().includes(query));
    setPostDatas(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && search) {
      handleSearch(search);
    } else if (e.key === 'Enter' && !search) {
      alert('나라를 입력하세요');
    }
  };
  const handleTags = (query) => {
    setSelectedTagId(query);
    const fetchTags = async () => {
      const { data: tagData, error } = await supabase.from('TAGS').select('*').eq('tagId', query);
      if (error) console.error(error);
      else {
        const filteredPostDatas = loadData.filter((postData) => tagData.some((tag) => tag.postId === postData.id));
        setPostDatas(filteredPostDatas);
      }
    };
    fetchTags();
  };
  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };
  return (
    <>
      <p className="h2">
        트래블 슈팅과 함께
        <br />
        여러 나라를 탐험하세요
      </p>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="나라를 입력하세요"
          value={search}
          onChange={searchHandler}
          onKeyPress={handleKeyPress}
        />
        <div className="search-icon">
          <Img
            src="https://skwkufggbhgnltheimss.supabase.co/storage/v1/object/public/icon/search.svg"
            alt="검색"
            onClick={() => handleSearch(search)}
          />
        </div>
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <Tag selected={tag.id == selectedTagId} key={tag.id} onClick={() => handleTags(tag.id)}>
            # {tag.tagValue}
          </Tag>
        ))}
      </div>
      <div className="tags">
        {postDatas.length ? (
          <>
            <div className="post-container">
              {postDatas.map((post) => (
                <div className="post" onClick={() => handleNavigate(post.id)} key={post.id}>
                  <div className="post-img">
                    <img src={post.imageURL[0]} alt="image" width={'100%'} />
                  </div>
                  <p className="post-title">{post.postTitle}</p>
                  <span className="post-date">{post.postDate}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoData>
            해당하는 데이터가 없어요! <br />
            \(o_o)/
          </NoData>
        )}
      </div>
    </>
  );
};

export default SearchInput;
