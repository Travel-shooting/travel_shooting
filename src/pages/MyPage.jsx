import { useState } from 'react';
import styled from 'styled-components';
import MyPosts from '../components/UserComponent/MyPosts/MyPosts';
import ProfileEdit from '../components/UserComponent/ProfileEdit/ProfileEdit';

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
  const [userInfo, setUserInfo] = useState({});
  const [mode, setMode] = useState('profile-edit');

  return (
    <Container>
      <Profile>
        <h3>유저 프로필</h3>

        <ProfileImage src={userInfo.profileImage} alt="프로필" />
        <h3>{userInfo.userId}</h3>

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
