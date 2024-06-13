import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Breadcrumb from "./components/Breadcrumb";
import { useLocation } from "react-router-dom";
import Protected from "./pages/Protected";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname == "/login" || location.pathname == "/signup" ? (
        ""
      ) : (
        <Protected>
          {" "}
          <LeftSidebar />
        </Protected>
      )}
      {location.pathname == "/login" || location.pathname == "/signup" ? (
        ""
      ) : (
        <Protected>
          {" "}
          <Breadcrumb />
        </Protected>
      )}
      <div className=" ml-40 w-[70%]">{children}</div>
      {location.pathname == "/login" || location.pathname == "/signup" ? (
        ""
      ) : (
        <Protected>
          {" "}
          <RightSidebar />
        </Protected>
      )}
    </>
  );
};

export default Layout;
