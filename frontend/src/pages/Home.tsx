import Folder from "../components/Folder";
import { useEffect, useState } from "react";
import getFolders from "../utils/getFolder";
import { FolderType } from "../types";
import Table from "../components/Table";
import { useWebSocket } from "../context/WebsocketProvider";
import { useParams } from "react-router-dom";
import createFolder from "../utils/createFolder";

const Home = () => {
  const [folders, setFolders] = useState<FolderType[] | null | undefined>(
    undefined
  );
  const recentFiles = useWebSocket()?.recentFiles;
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
  useEffect(() => {
    async function init(): Promise<void> {
      setFolders(await getFolders());
    }
    init();
  }, [open]);

  if (folders === undefined)
    return <h1 className="text-center  text-3xl "> Loading... </h1>;

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
      <div className="mt-8 mb-4 flex justify-between items-center pr-6">
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <svg
              className="w-5 h-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" />
            </svg>
            <p> Folders</p>
          </div>
        </div>
        <div className="flex rounded justify-center items-center gap-2 border-2 border-black px-3 py-1">
          <svg
            className="w-3 h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
          </svg>
          <p>Sort:A-Z</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap  items-center">
        {folders && folders.length > 0 ? (
          folders.map((folder) => {
            return <Folder key={folder._id} folder={folder} />;
          })
        ) : (
          <h1 className="font-bold mx-auto text-lg">No folders are there </h1>
        )}
      </div>

      <div className="mt-8 mb-4 flex justify-between items-center pr-6">
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <svg
              className="w-5 h-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" />
            </svg>
            <p> Recent files</p>
          </div>
        </div>
        <div className="flex rounded justify-center items-center gap-2 border-2 border-black px-3 py-1">
          <svg
            className="w-3 h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
          </svg>
          <p>Sort:A-Z</p>
        </div>
      </div>
      {recentFiles && recentFiles.length > 0 ? (
        <Table files={recentFiles} />
      ) : (
        <p className="text-center font-bold text-xl">No recent files </p>
      )}
    </>
  );
};

export default Home;
