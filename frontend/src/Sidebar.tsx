import React from "react";
import Logo from "./svg/Logo";
import Home from "./svg/Home";
import Files from "./svg/Files";
import Video from "./svg/Video";
import Photos from "./svg/Photos";
import Recent from "./svg/Recent";
import Setting from "./svg/Setting";
import Logout from "./svg/Logout";

const Sidebar = () => {
  return (
    <div className="w-1/12 bg-black  h-screen flex flex-col  justify-between py-4 items-center fixed">
      <Logo />
      <div className="flex flex-col gap-2 items-center justify-center">
        <Home />
        <Files />
        <Video />
        <Photos />
        <Recent />
        <Setting />
      </div>
      <div className="flex flex-col  justify-center items-center gap-2 ">
        <Logout />
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="user image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
