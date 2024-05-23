import React from "react";

const RightSidebar = () => {
  return (
    <div className=" bg-black w-[18%] h-screen flex flex-col  gap-5 py-4 px-2 items-center  fixed top-0 right-0 text-white font-light">
      <div className="border-2 border-gray-400 flex flex-col gap-2 py-3 rounded px-2">
        <div className="flex  justify-around  items-center">
          <div className="w-12 h-12 rounded-full border-white border-[1px] overflow-hidden">
            <img
              src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="user image"
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-lg">Hi,Boston</p>
        </div>
        <p>Storage details</p>
        <progress id="file" value="32" max="100">
          32%
        </progress>
        <p>18.7 GB of 100 GB used</p>
      </div>
      <div className=" border-2 border-gray-400 h-[50%] flex items-center  ">
        <input className="w-full text-xs " type="file" />
      </div>
    </div>
  );
};

export default RightSidebar;
