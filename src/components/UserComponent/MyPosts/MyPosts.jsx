import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../util/supabase/supabaseClient';
import Pagination from '../../Pagination';
const itemCountPerPage = 5; //한페이지당 보여줄 아이템 갯수
const pageCountPerPage = 5; //보여줄 페이지 갯수
const MyPosts = () => {
  const [error, setError] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const userId = useSelector((state) => state.log.logInUser);
  const navigate = useNavigate();
  //페이지네이션
  const [offset, setOffset] = useState(0); //현재페이지에서 시작할 item index

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('POST').select('*').eq('postUserId', userId);

      if (error) setError(true);
      else {
        const updatedData = data.map((item) => {
          const imageURLs = JSON.parse(item.imageURL).map((obj) => obj.url);
          return {
            ...item,
            imageURL: imageURLs
          };
        });
        setUserPosts(updatedData);
        console.log(data);
      }
    };
    fetchData();
  }, []);
  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };
  /** 현재페이지당 보여줄 item index들 계산하는 함수 */
  const setCurrentPageFunc = (page) => {
    const lastOffset = (page - 1) * itemCountPerPage; // (2-1) * 2 = 2
    setOffset(lastOffset);
  };
  return (
    <div>
      <h2>내가 쓴 글</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {userPosts.slice(offset, offset + itemCountPerPage).map((post) => (
          <li key={post.id} onClick={() => handleNavigate(post.id)}>
            <h3>{post.postTitle}</h3>
            <p>{post.postContent}</p>
            <p>{post.postDate}</p>
            <div>
              <img src={post.imageURL[0]} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
            </div>
            <p>{post.country}</p>
          </li>
        ))}
      </ul>
      <Pagination
        itemCount={userPosts.length}
        pageCountPerPage={pageCountPerPage}
        itemCountPerPage={itemCountPerPage}
        clickListener={setCurrentPageFunc}
      />
    </div>
  );
};

export default MyPosts;
