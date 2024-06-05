import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loadPost } from '../../redux/slices/postSlice';
import supabase from '../../util/supabase/supabaseClient';
const Img = styled.img`
  cursor: pointer;
`;
const SearchInput = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [postDatas, setPostDatas] = useState([]);
  const loadData = useSelector((state) => state.post.loadData);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const tagData = async () => {
      const { data: tagData, tagError } = await supabase.from('POSTTAG').select('*');
      if (tagError) console.error(tagError);
      else setTags(tagData);
    };
    tagData();
  }, []);
  useEffect(() => {
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
        console.log(updatedData);
        setPostDatas(updatedData);
        dispatch(loadPost(updatedData));
      }
    };

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
          <div className="tag" key={tag.id} onClick={() => handleTags(tag.id)}>
            #{tag.tagValue}
          </div>
        ))}
        {postDatas.map((post) => (
          <Link to={`/post/${post.id}`} className="post" key={post.id}>
            <div className="post-img">
              <img src={post.imageURL[0]} alt="image" width={'100%'} />
            </div>
            <p className="post-title">{post.postTitle}</p>
            <span>{post.postDate}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchInput;
