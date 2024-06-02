import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "../components/HomeComponent";
import PostComponent from "../components/PostComponent";
import UserComponent from "../components/UserComponent";
import Layout from "../layouts/Layout";

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
        path: "/mypage/:userId",
        element: <UserComponent />,
      },
    ],
  },
]);
export default router;
