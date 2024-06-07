import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../../util/supabase/supabaseClient';
import Pagination from '../../Pagination';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열로 설정 */
  gap: 15px;
`;

const Item = styled.li`
  width: 100%;
  height: 220px;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;
const Font = styled.h3`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  overflow: hidden;
`;
const itemCountPerPage = 12; //한페이지당 보여줄 아이템 갯수
const pageCountPerPage = 5; //보여줄 페이지 갯수
const MyPosts = () => {
  const [error, setError] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const userId = JSON.parse(sessionStorage.getItem('logInUser'));
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
      <Container>
        <Font size={'25px'} weight={'bold'} color={'var(--grey-color)'}>
          내가 쓴 글
        </Font>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ height: '1000px' }}>
          {userPosts.length > 0 ? (
            <>
              <List>
                {userPosts.slice(offset, offset + itemCountPerPage).map((post) => (
                  <Item key={post.id} onClick={() => handleNavigate(post.id)}>
                    <img src={post.imageURL[0]} />
                    <Font size={'18px'} weight={'500'}>
                      {post.postTitle.length > 12 ? post.postTitle.slice(0, 10) + '...' : post.postTitle}
                    </Font>
                  </Item>
                ))}
              </List>
            </>
          ) : (
            <div>없음</div>
          )}
        </div>
        <Pagination
          itemCount={userPosts.length}
          pageCountPerPage={pageCountPerPage}
          itemCountPerPage={itemCountPerPage}
          clickListener={setCurrentPageFunc}
        />
      </Container>
    </div>
  );
};

export default MyPosts;
