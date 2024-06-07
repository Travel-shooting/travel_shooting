import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadPost } from '../../redux/slices/postSlice';
import supabase from '../../util/supabase/supabaseClient';
import PostList from './PostList';

const Img = styled.img`
  cursor: pointer;
`;

const Tag = styled.button`
  display: inline-block;
  padding: 10px 16px;
  margin: 4px;
  color: ${(props) => (props.selected ? 'var(--black-color)' : 'var(--white-color)')};
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? 'var(--yellow-color)' : 'var(--black-color)')};
  &:hover {
    background-color: var(--yellow-color);
    color: var(--black-color);
  }
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
    const fetchData = async () => {
      const { data: postDatas, error: postError } = await supabase.from('POST').select('*');
      const { data: tagData, tagError } = await supabase.from('POSTTAG').select('*');

      if (postError || tagError) console.error(postError || tagError);
      else {
        const updatedData = postDatas.map((item) => {
          const imageURLs = JSON.parse(item.imageURL).map((obj) => obj.url);
          return {
            ...item,
            imageURL: imageURLs
          };
        });
        setTags(tagData);
        setPostDatas(updatedData);
        localStorage.setItem('loadData', JSON.stringify(updatedData));
        dispatch(loadPost(updatedData));
      }
    };
    fetchData();
  }, [dispatch]);

  const searchHandler = (e) => setSearch(e.target.value);

  const handleSearch = (query) => {
    const filtered = postDatas.filter((post) => post.country.toLowerCase().includes(query));
    setPostDatas(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && search) handleSearch(search);
    else if (e.key === 'Enter' && !search) alert('나라를 입력하세요');
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
  const handleNavigate = (postId) => navigate(`/post/${postId}`);

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
      <PostList postDatas={postDatas} handleNavigate={handleNavigate} />
    </>
  );
};

export default SearchInput;
