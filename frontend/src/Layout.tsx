import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LeftSidebar />
      <div className=" ml-32 w-[70%]">{children}</div>
      <RightSidebar />
    </>
  );
};

export default Layout;
