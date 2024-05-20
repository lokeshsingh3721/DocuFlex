import React from "react";

const Recent = () => {
  return (
    <span className="svg-parent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50"
        height="50"
        fill="none"
        stroke="white"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      Recent
    </span>
  );
};

export default Recent;
