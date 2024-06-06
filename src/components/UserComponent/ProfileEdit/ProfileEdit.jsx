import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImage } from '../../../redux/slices/logSlice';
import supabase from '../../../util/supabase/supabaseClient';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userImageURL: '',
    password: ''
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
          password: data[0].password // 암호화된 비밀번호
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

    const { error: urlError } = await supabase.storage.from('avatars').getPublicUrl(filePath);
    // sessionStorage에서 'logIn' 항목의 값을 가져옵니다.
    const logInData = JSON.parse(sessionStorage.getItem('logIn'));
    logInData.userImageURL = realPath;

    // 객체를 다시 JSON 문자열로 변환합니다.
    const updatedLogInData = JSON.stringify(logInData);

    // 업데이트된 값을 'logIn' 항목에 다시 저장합니다.
    sessionStorage.setItem('logIn', updatedLogInData);
    if (urlError) {
      setError(urlError.message);
      console.error(urlError);
      return;
    }
    setUserInfo((prev) => ({
      ...prev,
      userImageURL: realPath
    }));

    const { data, error } = await supabase.from('USER').update({ userImageURL: realPath }).eq('uuid', logInUserId);

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
    <div>
      <h2>프로필 편집</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>프로필 이미지:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          {userInfo.userImageURL && (
            <div>
              <img
                src={userInfo.userImageURL}
                alt="프로필"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
            </div>
          )}
          <div>
            <label>이메일:</label>
            <input type="text" name="name" value={userInfo.name} ref={userIdRef} />
          </div>
          <div>
            <label>비밀번호:</label>
            <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
          </div>
          <button type="submit">프로필 업데이트</button>
          <button type="button" onClick={() => setEditMode(false)}>
            취소
          </button>
        </form>
      ) : (
        <div>
          <div>
            <img
              src={userInfo.userImageURL}
              alt="프로필"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          </div>
          <div>
            <span>이메일: {userInfo.userId}</span>
          </div>
          <button onClick={() => setEditMode(true)}>프로필 수정</button>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
