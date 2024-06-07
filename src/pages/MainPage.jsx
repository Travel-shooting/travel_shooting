import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/virtual';
import { Swiper, SwiperSlide } from 'swiper/react';
import SearchInput from '../components/Main';
import { logIn } from '../redux/slices/logSlice';
import supabase from '../util/supabase/supabaseClient';

function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const userId = JSON.parse(sessionStorage.getItem('logInUser'));
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        dispatch(logIn(user.uuid));
      }
    };
    fetchUserData();
  }, [dispatch]);

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
        }
      }
    };
    fetchData();
  }, [userId]);

  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <>
      <div className="post-box">
        <p className="h2">나의 여행 기록</p>
        <div>
          {!userPosts.length ? (
            <div
              style={{
                textAlign: 'center',
                color: 'var(--placeholder-color)',
                marginBottom: '32px',
                fontSize: '16px'
              }}
            >
              나의 기록이 아직 없어요!
            </div>
          ) : (
            <Swiper
              className="post-container"
              spaceBetween={40}
              centeredSlides={true}
              breakpoints={{
                980: {
                  slidesPerView: 3.5
                },
                568: {
                  slidesPerView: 2.5
                },
                0: {
                  slidesPerView: 1.5
                }
              }}
            >
              {userPosts.map((post) => (
                <SwiperSlide onClick={() => handleNavigate(post.id)} className="post" key={post.id}>
                  <img className="post-img" src={post.imageURL[0]} alt="image" width={'100%'} />
                  <h1 className="post-title" style={{ margin: '20px' }}>
                    {post.postTitle.length > 12 ? post.postTitle.slice(0, 10) + '...' : post.postTitle}
                  </h1>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <button className="post-btn" onClick={() => navigate('/newpost')}>
          기록 하러가기
        </button>
      </div>
      <SearchInput />
    </>
  );
}

export default MainPage;
