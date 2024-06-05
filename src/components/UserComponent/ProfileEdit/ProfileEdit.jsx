import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    profileImage: '',
    password: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('user')
        .select('name, userImageURL, password')
        .eq('userId', 'email0@email.com'); // 로그인한 사용자의 이메일을 사용합니다.

      if (error) {
        console.error('Error fetching user data:', error.message);
        setError(error.message);
        return;
      }

      if (data && data.length > 0) {
        const userData = data[0];
        setUserInfo({
          name: userData.name,
          profileImage: userData.userImageURL,
          password: userData.password, // 암호화된 비밀번호
        });
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      return;
    }

    const { data, error: urlError } = await supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlError) {
      setError(urlError.message);
      return;
    }

    setUserInfo((prev) => ({ ...prev, profileImage: data.publicUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      await handleUpload();
    }

    const updates = {
      name: userInfo.name,
      userImageURL: userInfo.profileImage,
      // 비밀번호 업데이트는 별도의 핸들링이 필요할 수 있음
    };

    const { error } = await supabase
      .from('USER')
      .update(updates)
      .eq('userId', 'email0@email.com'); // 로그인한 사용자의 이메일을 사용합니다.

    if (error) {
      console.error('Error updating user data:', error.message);
      setError(error.message);
      return;
    }

    setEditMode(false); // 수정 모드 종료
    alert('프로필이 성공적으로 업데이트되었습니다.');
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
          {userInfo.profileImage && (
            <div>
              <img 
                src={userInfo.profileImage} 
                alt="프로필" 
                style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
              />
            </div>
          )}
          <div>
            <label>이름:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">프로필 업데이트</button>
          <button type="button" onClick={() => setEditMode(false)}>취소</button>
        </form>
      ) : (
        <div>
          <div>
            <img 
              src={userInfo.profileImage} 
              alt="프로필" 
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
            />
          </div>
          <div>
            <span>이름: {userInfo.name}</span>
          </div>
          <div>
            <span>비밀번호: {userInfo.password}</span> {/* 암호화된 비밀번호 */}
          </div>
          <button onClick={() => setEditMode(true)}>프로필 수정</button>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
