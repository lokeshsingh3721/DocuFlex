import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Breadcrumb from "./components/Breadcrumb";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LeftSidebar />
      <Breadcrumb />
      <div className=" ml-40 w-[70%]">{children}</div>
      <RightSidebar />
    </>
  );
};

export default Layout;
