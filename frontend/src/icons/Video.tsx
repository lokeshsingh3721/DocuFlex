import { useLocation, useNavigate } from "react-router-dom";

const Video = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.substring(1);
  return (
    <div
      onClick={() => {
        navigate("/videos");
      }}
      className={`svg-parent ${
        currentPath === "videos" ? "underline" : "no-underline"
      }`}
    >
      <svg
        className="stroke-white w-5 h-auto stroke-[1.5] "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="white"
      >
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
      Videos
    </div>
  );
};

export default Video;
