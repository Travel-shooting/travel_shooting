import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = 'email0@email.com'; // 로그인한 사용자의 이메일

      const { data, error } = await supabase
        .from('posts') // 게시물 테이블 이름
        .select('*')
        .eq('postUserId', userId); // postUserId가 로그인한 사용자와 동일한 게시물들을 가져옵니다.

      if (error) {
        console.error('Error fetching posts:', error.message);
        setError(error.message);
        return;
      }

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>내가 쓴 글</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.postTitle}</h3>
            <p>{post.postContent}</p>
            <p>{new Date(post.postDate).toLocaleDateString()}</p>
            <div>
              {post.imageURL && JSON.parse(post.imageURL).map((img, index) => (
                <img key={index} src={img.url} alt={`Post image ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
              ))}
            </div>
            <p>{post.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
