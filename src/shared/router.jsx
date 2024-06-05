import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "../components/HomeComponent";
import PostComponent from "../components/PostComponent";
import Layout from "../pages/Home";
import UserComponent from "../components/UserComponent"; // 수정된 경로

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
        element: <UserComponent />, // 수정된 컴포넌트
      },
    ],
  },
]);
export default router;
