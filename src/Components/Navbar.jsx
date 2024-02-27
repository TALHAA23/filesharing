import { Link } from "react-router-dom";
import { useUser } from "../Hooks/UserProvider";
import signOutUser from "../utils/signout";
import Menu from "./Menu";
import Notifications from "./Notifications";
import { useState } from "react";

export default function Navbar() {
  const user = useUser();
  const [numberOfNotifications, setNumberofNotifications] = useState(null);

  const showUploader = () => {
    const box = document.querySelector("#upload-box");
    box.showModal();
  };

  const toggleNotifications = () => {
    const box = document.querySelector(".notificaions-box");
    box.classList.toggle("scale-0");
  };
  return (
    <div>
      <nav className=" sticky px-2 w-full h-[60px] bg-blue-500 text-white flex items-center justify-between ">
        <h1 className=" font-semibold text-xl ml-3">File Sharing</h1>
        <div>
          {user ? (
            <div className=" flex items-center gap-2">
              <div className="relative bg-blue-400 rounded-full border-2 p-2">
                <img
                  onClick={toggleNotifications}
                  className=" w-4"
                  src="/bell-regular.svg"
                  alt="bell"
                />
                {numberOfNotifications && (
                  <span className=" absolute w-4 -top-1 -right-1 aspect-square  flex items-center justify-center text-[9px] rounded-full bg-red-600 text-white ">
                    {numberOfNotifications}
                  </span>
                )}
                <Notifications
                  updateNumberofNotifications={setNumberofNotifications}
                />
              </div>
              <button
                onClick={showUploader}
                className="px-4 py-2 rounded font-medium text-white bg-[#4F46E5]"
              >
                Upload
              </button>
              <div
                title="Signout"
                onClick={signOutUser}
                className="bg-blue-400 rounded-full p-2"
              >
                <img
                  className=" w-4"
                  src="/arrow-right-from-bracket-solid.svg"
                  alt="bell"
                />
              </div>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded font-medium text-white bg-[#4F46E5]"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
      <Menu />
    </div>
  );
}
