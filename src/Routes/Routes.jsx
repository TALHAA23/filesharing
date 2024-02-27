import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import Home from "../Pages/Home";
import Layout from "../Components/Layout";
import Receives from "../Pages/Receives";
import Shares from "../Pages/Shares";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/receives",
          element: <Receives />,
        },
      ],
    },
    {
      path: "/auth/*",
      element: <AuthRoutes />,
    },
  ]);
}
