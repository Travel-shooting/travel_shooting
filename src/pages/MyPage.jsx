import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPosts from '../components/UserComponent/MyPosts/MyPosts';
import ProfileEdit from '../components/UserComponent/ProfileEdit/ProfileEdit';
import supabase from '../util/supabase/supabaseClient';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
`;

const Profile = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const ProfileImage = styled.img`
  width: 150px;
  height: 150px;

  background-image: contain;
  border-radius: 50%;
`;
const MyPage = () => {
  const [mode, setMode] = useState('profile-edit');
  const logInUser = JSON.parse(sessionStorage.getItem('logInUser'));
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.from('USER').select('*').eq('uuid', logInUser);
      setUser(data[0]);
    };
    fetchUserData();
  }, [logInUser]);
  return (
    <Container>
      <Profile>
        <h3>유저 프로필</h3>

        <ProfileImage src={user.userImageURL} alt="프로필" />
        <h3>{user.userId}</h3>

        <div>
          <h1 onClick={() => setMode('profile-edit')}>프로필 편집</h1>
        </div>
        <div>
          <h1 onClick={() => setMode('my-posts')}>내가 쓴 글</h1>
        </div>
      </Profile>
      <div>
        {mode === 'profile-edit' && <ProfileEdit />}
        {mode === 'my-posts' && <MyPosts />}
      </div>
    </Container>
  );
};

export default MyPage;
