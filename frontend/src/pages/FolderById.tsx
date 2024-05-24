import Header from "../components/Header";
import Folder from "../components/Folder";
import { useEffect, useState } from "react";
import { FolderType } from "../types";
import Table from "../components/Table";
import getItemsByParentId from "../utils/getItemsByParentId";
import { useParams } from "react-router-dom";

type params = {
  name: string;
  id: string;
};

const FolderById = () => {
  const { name, id } = useParams() as params;
  const [items, setItems] = useState<FolderType[] | null | undefined>(
    undefined
  );
  const [folders, setFolders] = useState<FolderType[] | undefined>(undefined);
  const [files, setFiles] = useState<FolderType[] | undefined>(undefined);

  useEffect(() => {
    async function init(): Promise<void> {
      setItems(await getItemsByParentId(id));
      setFolders(() => items?.filter((items) => items.isFolder === true));
      setFiles(() => items?.filter((items) => items.isFolder === false));
    }
    init();
  }, [id, items]);

  console.log(items);

  if (items === undefined)
    return <h1 className="text-center  text-3xl "> Loading... </h1>;

  return (
    <>
      <Header />
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
            <p> {name}</p>
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
        {folders != undefined && folders?.length > 0 ? (
          folders?.map((folder) => {
            return (
              <Folder key={folder._id} name={folder.name} id={folder._id} />
            );
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
            <p> All files</p>
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

      {files != undefined && files?.length > 0 ? (
        <Table files={files} />
      ) : (
        <h1 className="font-bold text-center text-lg">No Files are there </h1>
      )}
    </>
  );
};

export default FolderById;
