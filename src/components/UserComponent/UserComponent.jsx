import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import ProfileEdit from "./ProfileEdit"; 
import MyPosts from "./MyPosts";
import LikedPosts from "./LikedPosts";

const UserComponent = () => { 
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '20px' }}>
        <div>
          {/* 유저 프로필 박스 */}
          <h3>유저 프로필</h3>
          {/* 프로필 정보 */}
        </div>
        <div style={{ marginTop: '20px' }}>
          <Link to="/mypage/profile-edit">프로필 편집</Link>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Link to="/mypage/my-posts">내가 쓴 글</Link>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Link to="/mypage/liked-posts">좋아요한 글</Link>
        </div>
      </div>
      <div style={{ width: '80%', padding: '20px' }}>
        <Routes>
          <Route path="profile-edit" element={<ProfileEdit />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="liked-posts" element={<LikedPosts />} />
          <Route path="/" element={<Navigate to="profile-edit" />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserComponent;
