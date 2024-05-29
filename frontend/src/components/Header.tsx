import { useState } from 'react'

const Header = () => {

  const [newFolder, setNewFolder] = useState<any>(null)
  const [open, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div className="flex w-full pt-2 top-0 justify-between  bg-white z-10 relative">
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
        <button onClick={
          () => {
            setIsOpen(!open)
          }
        } className="bg-blue-500 rounded   p-1 text-white px-8 hover:cursor-pointer">
          Create New
        </button>
      </div>
      <div className={`${open ? ' w-36  mb-5 mx-auto flex ml-[82%] flex-col  border-2 border-blue-500 p-2 gap-2 rounded' : 'hidden'} `}>
        <input type="text" placeholder="folder name..." value={newFolder} onChange={
          (e) => {
            setNewFolder(e.target.value)
          }
        } className="border-[1px] border-gray-400 p-1" />
        <button onClick={
          () => {
            setIsOpen(false)
          }
        } className="border-[1px] border-gray-400 py-1">Create</button>
      </div>

    </>
  );
};

export default Header;
