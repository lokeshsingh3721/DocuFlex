import Logo from "../icons/Logo";
import Home from "../icons/Home";
import Files from "../icons/Files";
import Video from "../icons/Video";
import Photos from "../icons/Photos";
import Setting from "../icons/Setting";
import Logout from "../icons/Logout";
import Trash from "../icons/Trash";

const LeftSidebar = () => {
  return (
    <div className="w-[10%]  bg-black  h-screen flex flex-col  justify-between py-4 items-center  fixed ">
      <Logo />
      <div className="flex flex-col gap-2 items-center justify-center">
        <Home />
        <Files />
        <Video />
        <Photos />
        <Trash />
        <Setting />
      </div>
      <div className="flex flex-col  justify-center items-center gap-2 ">
        <Logout />
      </div>
    </div>
  );
};

export default LeftSidebar;
