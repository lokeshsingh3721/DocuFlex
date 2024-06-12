import { useState, useEffect } from "react";
import Table from "../components/Table";
import { FolderType } from "../types";
import getFilesByType from "../utils/getFilesByType";

const Documents = () => {
  const [documents, setDocuments] = useState<FolderType[] | null | undefined>(
    undefined
  );

  useEffect(() => {
    const init = async () => {
      const docs = await getFilesByType("document");
      if (docs) setDocuments(docs);
    };
    init();
  }, []);
  return (
    <div className="pt-6">
      <div className="mb-4 flex justify-between items-center pr-6">
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <svg
              className="w-5 h-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" />
            </svg>
            <p> All Documents</p>
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
      {documents ? (
        <Table files={documents} />
      ) : (
        <h1 className="text-center font-bold text-xl">No files</h1>
      )}
    </div>
  );
};

export default Documents;
