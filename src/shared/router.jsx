import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Home';
import HomeComponent from '../pages/MainPage';
import ModifyPost from '../pages/ModifyPost/ModifyPostPage';
import MyPage from '../pages/MyPage'; // 수정된 컴포넌트
import NewPost from '../pages/NewPost';
import PostComponent from '../pages/PostPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomeComponent />
      },
      {
        path: '/post/:postId',
        element: <PostComponent />
      },
      {
        path: '/post/modify/:postId',
        element: <ModifyPost />
      },
      {
        path: '/newpost',
        element: <NewPost />
      },
      {
        path: '/mypage/:userId',
        element: <MyPage /> // 수정된 컴포넌트
      }
    ]
  }
]);
export default router;
