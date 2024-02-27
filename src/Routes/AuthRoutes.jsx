import { useRoutes } from "react-router-dom";
import Auth from "../Pages/Auth";
export default function AuthRoutes() {
  return useRoutes([
    {
      path: "/login",
      element: <Auth />,
    },
    {
      path: "/signup",
      element: <Auth />,
    },
  ]);
}
