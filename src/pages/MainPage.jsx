import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchInput from '../components/Main/SearchInput';
import { logIn } from '../redux/slices/logSlice';
import supabase from '../util/supabase/supabaseClient';
const Container = styled.div`
  display: flex;
  gap: 20px;

  overflow-x: hidden;
`;
function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const userId = useSelector((state) => state.log.logInUser);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        dispatch(logIn(user.uuid)); // 현재 로그인된 사용자의 ID 설정
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { data, error } = await supabase.from('POST').select('*').eq('postUserId', userId);

        if (error) console.error(error);
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
      }
    };
    fetchData();
  }, []);
  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };
  // if (userId === null) {
  //   return (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         color: "#bbbbbb",
  //         marginBottom: "32px",
  //         fontSize: "40px",
  //         font: "pretendard-regular",
  //       }}
  //     >
  //       Loading...
  //     </div>
  //   );
  // } else if (!userId) {
  //   return (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         color: "var(--mintgreen-color)",
  //         marginBottom: "32px",
  //         fontSize: "40px",
  //       }}
  //     >
  //       로그인이 필요합니다
  //     </div>
  //   );
  // } else {
  return (
    <>
      <div className="post-box">
        <p className="h2">나의 여행지 기록</p>
        <Container>
          {!userPosts.length ? (
            <div
              style={{
                textAlign: 'center',
                color: '#bbbbbb',
                marginBottom: '32px',
                fontSize: '16px'
              }}
            >
              {'나의 기록이 아직 없어요!'}
            </div>
          ) : (
            userPosts.map((post) => (
              <div onClick={() => handleNavigate(post.id)} className="post" key={post.id}>
                <div className="post-img">
                  <img src={post.imageURL[0]} alt="image" width={'100%'} />
                </div>
                <p className="post-title">{post.postTitle}</p>
                <span>{post.postDate}</span>
              </div>
            ))
          )}
        </Container>

        <div>
          <Link to="/newpost" className="button post-btn" style={{ textDecoration: 'none' }}>
            기록 하러가기
          </Link>
        </div>
      </div>
      <SearchInput />
    </>
  );
}

export default MainPage;
