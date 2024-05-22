import React from "react";

const Header = () => {
  return (
    <div className="flex w-full pt-2 sticky top-0 justify-between  bg-white z-10">
      <div className="w-[80%] flex relative">
        <input
          className="border-2 w-full border-gray-400  pl-8 py-2 outline-none"
          type="search"
          placeholder="Search files"
        />
        <svg
          className="absolute w-5 h-auto top-3 left-2 fill-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </div>
      <button className="bg-blue-500 rounded   p-1 text-white px-8 hover:cursor-pointer">
        Create New
      </button>
    </div>
  );
};

export default Header;
