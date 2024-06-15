import { useState } from "react";
import { useParams } from "react-router-dom";
import createFolder from "../utils/createFolder";

const Header = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { id } = useParams();
  const handleCreateFolder = async () => {
    console.log(`Folder Created: ${folderName}`);
    if (!folderName) {
      alert("please enter the folder name ");
      return;
    }
    let success;
    if (!id) {
      success = await createFolder(folderName, null);
    } else success = await createFolder(folderName, id as string);
    if (!success) {
      alert("server error");
      return;
    }
    setFolderName("");
    setOpen(false);
  };

  return (
    <>
      <div className="flex w-full  top-0 justify-between bg-white z-10 relative">
        <div className={`w-[80%] flex relative ${open ? "hidden" : ""}`}>
          <input
            className="border-2 w-full border-gray-400 pl-8 py-2 outline-none"
            type="search"
            placeholder="Search files"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <svg
            className="absolute w-5 h-auto top-3 left-2 fill-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className={`bg-blue-500 rounded p-1 text-white px-8 hover:cursor-pointer ${
            open ? "hidden" : ""
          }`}
        >
          Create New
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Create Folder</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full outline-none mb-4"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateFolder}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
