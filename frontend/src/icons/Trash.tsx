import { useLocation } from "react-router";

const Trash = () => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1);
  return (
    <span
      className={`svg-parent ${
        currentPath === "trash" ? "underline" : "no-underline"
      }`}
    >
      <svg
        className="w-5 h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50"
        height="50"
        fill="none"
        stroke="white"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
        <path d="M19 6l-1 14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </svg>
      Trash
    </span>
  );
};

export default Trash;
