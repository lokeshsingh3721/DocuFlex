import { useLocation } from "react-router";

const Setting = () => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1);
  return (
    <div
      className={`svg-parent ${
        currentPath === "setting" ? "underline" : "no-underline"
      }`}
    >
      <svg
        className="w-5 h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="white"
      >
        <circle cx="12" cy="12" r="3" className="hover:fill-white" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51v.17a2 2 0 0 1-4 0v-.17a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3.5a2 2 0 0 1 0-4h.17a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.17a1.65 1.65 0 0 0 1-1.51V3.5a2 2 0 0 1 4 0v.17a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.17a1.65 1.65 0 0 0 1.51 1h.17a2 2 0 0 1 0 4h-.17a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
      Setting
    </div>
  );
};

export default Setting;
