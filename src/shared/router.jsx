import { createBrowserRouter } from "react-router-dom";
import NewPost from "../components/PostComponent/NewPost";
import Layout from "../layouts/Home";
import HomeComponent from "../pages/MainPage";
import UserComponent from "../pages/MyPage";
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
        path: "/newpost",
        element: <NewPost />,
      },
      {
        path: "/post/:postId",
        element: <PostComponent />,
      },
      {
        path: "/mypage/:userId",
        element: <UserComponent />,
      },
    ],
  },
]);
export default router;
