import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "../components/HomeComponent";
import Layout from "../layouts/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeComponent />,
      },
    ],
  },
]);
export default router;
