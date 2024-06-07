import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../../util/supabase/supabaseClient';
import Pagination from '../../Pagination';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const Item = styled.li`
  width: 100%;
  height: 220px;
  margin-bottom: 40px;

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
const itemCountPerPage = 12;
const pageCountPerPage = 5;
const MyPosts = () => {
  const [error, setError] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const userId = JSON.parse(sessionStorage.getItem('logInUser'));
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

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

  const setCurrentPageFunc = (page) => {
    const lastOffset = (page - 1) * itemCountPerPage;
    setOffset(lastOffset);
  };
  return (
    <div>
      <Container>
        <Font size={'25px'} weight={'bold'} color={'var(--black-color)'}>
          내가 쓴 글
        </Font>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ height: '1000px' }}>
          {userPosts.length > 0 ? (
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
          ) : (
            <NoData>
              해당하는 데이터가 없어요! <br />
              \(o_o)/
            </NoData>
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
