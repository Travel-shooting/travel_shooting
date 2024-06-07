import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImage } from '../../../redux/slices/logSlice';
import styled from 'styled-components';
import supabase from '../../../util/supabase/supabaseClient';

const ProfileEditWrapper = styled.div`
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #f8f8f8; /* 네모 박스 배경색 */
  padding: 20px;
  border-radius: 10px; /* 둥근 모서리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  position: relative;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const Username = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
`;

const Font = styled.h3`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  overflow: hidden;
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  width: 250px;
  padding: 10px 10px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    background-color: var(--yellow-color);
  }
  margin-bottom: 10px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: ${(props) => (props.editMode ? 'none' : 'block')};
`;

const EditForm = styled.form`
  display: ${(props) => (props.editMode ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const Label = styled.label`
  margin: 10px 0;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const FormButton = styled.button`
  width: 140px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    background-color: var(--yellow-color);
  }
`;


const ProfileEdit = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userImageURL: '',

  });
  const userIdRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const logInUserId = JSON.parse(sessionStorage.getItem('logInUser'));

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.from('USER').select('*').eq('uuid', logInUserId);

      if (error) {
        console.error('Error fetching user data:', error.message);
        setError(error.message);
        return;
      }

      if (data && data.length > 0) {
        setUserInfo({
          userId: data[0].userId,
          userImageURL: data[0].userImageURL,

        });
      }
    };

    fetchUserData();
  }, [logInUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      setEditMode(false);
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const filePath = `public/${fileName}`;
    const realPath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
    dispatch(updateImage(realPath));

    if (uploadError) {
      setError(uploadError.message);
      alert('이미 있는 똑같은 이미지');
      return;
    }
    let updatedUserInfo = { ...userInfo };

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;
      const realPath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) {
        setError(uploadError.message);
        alert('이미 있는 똑같은 이미지');
        return;
      }

      const { error: urlError } = await supabase.storage.from('avatars').getPublicUrl(filePath);
      if (urlError) {
        setError(urlError.message);
        console.error(urlError);
        return;
      }

      updatedUserInfo.userImageURL = realPath;
      dispatch(updateImage(realPath));

      const logInData = JSON.parse(sessionStorage.getItem('logIn'));
      logInData.userImageURL = realPath;
      const updatedLogInData = JSON.stringify(logInData);
      sessionStorage.setItem('logIn', updatedLogInData);
    }

    const { data, error } = await supabase
      .from('USER')
      .update({
        userImageURL: updatedUserInfo.userImageURL,
        userId: updatedUserInfo.userId,
      })
      .eq('uuid', logInUserId);

    if (error) {
      console.error('Error updating user data:', error.message);
      setError(error.message);
      return;
    } else {
      console.log(data);
      setEditMode(false); // 수정 모드 종료
      alert('프로필이 성공적으로 업데이트되었습니다.');
    }
  };

  return (
    <ProfileEditWrapper>
      <Font size={'25px'} weight={'bold'} color={'var(--grey-color)'}>
        프로필 수정
      </Font>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage src={userInfo.userImageURL || 'default-profile.png'} alt="프로필" />
          <Username>{userInfo.userId}</Username>
        </ProfileImageContainer>

        <EditButton
          editMode={editMode}
          bgcolor={'var(--yellow-color)'}
          color={'var(--white-color)'}
          onClick={() => setEditMode(true)}
        >
          수정하기
        </EditButton>

        <EditForm onSubmit={handleSubmit} editMode={editMode}>
          <Label>사진 수정</Label>
          <Input type="file" onChange={handleFileChange} />
          <Label>아이디 수정</Label>
          <Input type="text" name="userId" value={userInfo.userId} onChange={handleChange} />
          <ButtonContainer>
            <FormButton
              bgcolor={'var(--yellow-color)'}
              color={'var(--white-color)'}
              type="submit"
            >
              저장하기
            </FormButton>
            <FormButton
              bgcolor={'var(--white-color)'}
              color={'var(--yellow-color)'}
              onClick={() => setEditMode(false)}
            >
              취소
            </FormButton>
          </ButtonContainer>
        </EditForm>
      </ProfileContainer>
    </ProfileEditWrapper>

  );
};

export default ProfileEdit;
