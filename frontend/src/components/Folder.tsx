import React from "react";

const Folder = ({ name }: { name: string }) => {
  return (
    <div className="w-1/7 border-2 border-gray-400 flex flex-col justify-center items-center px-4 py-3 gap-1 rounded hover:scale-105 transition hover:cursor-pointer">
      <svg
        className="w-10 h-auto "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" />
      </svg>
      <p>{name}</p>
      <div className="flex ">
        <svg
          className="w-4 h-auto stroke-gray-300 stroke-[1.5]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="black"
        >
          <path d="M12 8v4l3 3M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9z" />
        </svg>

        <p className="text-xs font-light text-gray-400">
          Last Updated : 20.05.2024
        </p>
      </div>
    </div>
  );
};

export default Folder;
