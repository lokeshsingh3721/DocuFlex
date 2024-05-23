import { useLocation, useNavigate } from "react-router";

const Files = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.substring(1);
  return (
    <div
      onClick={() => {
        navigate("/files");
      }}
      className={`svg-parent ${
        currentPath === "files" ? "underline" : "no-underline"
      }`}
    >
      <svg
        className=" w-5 h-auto stroke-white stroke-[1.5] "
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 50 50"
      >
        <path d="M36,4H14C8.49,4,4,8.49,4,14v22c0,5.51,4.49,10,10,10h22c5.51,0,10-4.49,10-10V14C46,8.49,41.51,4,36,4z M41,34	c0,2.209-1.791,4-4,4H13c-2.209,0-4-1.791-4-4V23c0-0.552,0.448-1,1-1h30c0.552,0,1,0.448,1,1V34z M41,20h-2	c0,0-0.001-0.228-0.11-0.45C38.32,18.41,36.98,18,36,18H14c-0.98,0-2.32,0.41-2.89,1.55C11.005,19.76,11,20,11,20H9v-4	c0-2.21,1.79-4,4-4h4c1.41,0,2.16,0.75,2.71,1.29C20.2,13.78,20.44,14,21,14h16c2.21,0,4,1.79,4,4V20z"></path>
      </svg>
      Files
    </div>
  );
};

export default Files;
