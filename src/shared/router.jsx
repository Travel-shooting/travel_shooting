import { createBrowserRouter } from "react-router-dom";
import NewPost from "../components/PostComponent/NewPost";
import Layout from "../layouts/Home";
import HomeComponent from "../pages/MainPage";
import MyPage from "../pages/MyPage"; // 수정된 컴포넌트
import PostComponent from "../pages/PostPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeComponent />,
      },
      {
        path: "/post/:postId",
        element: <PostComponent />,
      },
      {
        path: "/mypage/*",
        element: <MyPage />, // 수정된 컴포넌트
      },
    ],
  },
]);
export default router;
