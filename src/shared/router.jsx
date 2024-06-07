import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Home';
import HomeComponent from '../pages/MainPage';
import ModifyPost from '../pages/ModifyPostPage';
import MyPage from '../pages/MyPage';
import NewPost from '../pages/NewPostPage';
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
        element: <MyPage />
      }
    ]
  }
]);
export default router;
