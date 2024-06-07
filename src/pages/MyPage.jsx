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

const Font = styled.h3`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  overflow: hidden;
  cursor: pointer; /* 마우스를 가져다 대면 커서가 손가락 모양으로 변경 */
  &:hover {
    text-decoration: underline; /* 마우스를 가져다 대면 밑줄이 생깁니다. */
  }
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
        <ProfileImage src={user.userImageURL} alt="프로필" />
        <Font size="24px" weight="bold" color="black">{user.userId}</Font>

        <div>
          <Font size="18px" weight="bold" color="lightgrey" onClick={() => setMode('profile-edit')}>프로필 수정</Font>
        </div>
        <div>
          <Font size="18px" weight="bold" color="lightgrey" onClick={() => setMode('my-posts')}>내가 쓴 글</Font>
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
