import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ProfileEdit from "../components/UserComponent/ProfileEdit/ProfileEdit";
import MyPosts from "../components/UserComponent/MyPosts/MyPosts";
import { createClient } from '@supabase/supabase-js';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('USER')
        .select('id, userImageURL, name')
        .eq('userId', 'email0@email.com');

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const userData = data[0];
        setUserInfo({
          id: userData.id,
          name: userData.name,
          profileImage: userData.userImageURL,
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '20px' }}>
        <div>
          <h3>유저 프로필</h3>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img src={userInfo.profileImage} alt="프로필" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
            <span>{userInfo.name}</span>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Link to="profile-edit">프로필 편집</Link>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Link to="my-posts">내가 쓴 글</Link>
        </div>
      </div>
      <div style={{ width: '80%', padding: '20px' }}>
        <Routes>
          <Route path="profile-edit" element={<ProfileEdit />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="/" element={<Navigate to="profile-edit" />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
