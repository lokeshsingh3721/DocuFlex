import Logo from "../icons/Logo";
import Home from "../icons/HomeIcon";
import Files from "../icons/FilesIcon";
import Video from "../icons/VideoIcon";
import Photos from "../icons/PhotosIcon";
import Setting from "../icons/SettingIcon";
import Logout from "../icons/LogoutIcon";
import Trash from "../icons/TrashIcon";

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
