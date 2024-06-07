import React from 'react';
import styled from 'styled-components';

const NoData = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  text-align: center;
  color: var(--darkgrey-color);
  font-weight: 600;
  line-height: 1.5;
`;

const PostList = ({ postDatas, handleNavigate }) => {
  return (
    <div>
      {postDatas.length ? (
        <>
          <div className="post-container">
            {postDatas.map((post) => (
              <div className="post" onClick={() => handleNavigate(post.id)} key={post.id}>
                <div className="post-img">
                  <img src={post.imageURL[0]} alt="image" width={'100%'} />
                </div>
                <div style={{ paddingLeft: '20px', margin: '20px 0' }}>
                  <p className="post-title">
                    {post.postTitle.length > 12 ? post.postTitle.slice(0, 10) + '...' : post.postTitle}
                  </p>
                  <span className="post-date">{post.postDate}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <NoData>
          해당하는 데이터가 없어요! <br />
          \(o_o)/
        </NoData>
      )}
    </div>
  );
};

export default PostList;
