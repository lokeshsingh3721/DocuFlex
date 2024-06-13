import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Breadcrumb from "./components/Breadcrumb";
import { useLocation } from "react-router-dom";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname == "/login" || location.pathname == "/signup" ? (
        ""
      ) : (
        <LeftSidebar />
      )}
      {location.pathname == "/login" || location.pathname == "/signup" ? (
        ""
      ) : (
        <Breadcrumb />
      )}
      <div className=" ml-40 w-[70%]">{children}</div>
      {location.pathname == "/login" || location.pathname == "/signup" ? (
        ""
      ) : (
        <RightSidebar />
      )}
    </>
  );
};

export default Layout;
