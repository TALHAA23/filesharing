import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Upload from "./Upload";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Upload />
      <Outlet />
    </div>
  );
}
