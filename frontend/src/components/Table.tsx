import { useWebSocket } from "../context/WebsocketProvider";
import { FileType, WebSocketContextType } from "../../types";
import deleteFile from "../utils/deleteFile";
import { useState, useEffect } from "react";
import getFilesByParentId from "../utils/getFilesByParentId";

const Table = ({ id }: { id: string }) => {
  const { sendFile, deleteFile: deleteRecentFile } =
    useWebSocket() as WebSocketContextType;
  const [files, setFiles] = useState<FileType[] | null>(null);
  useEffect(() => {
    async function init(): Promise<void> {
      setFiles(await getFilesByParentId(id));
    }
    init();
  }, [id]);

  async function deleteHandler(id: string, parent: string) {
    try {
      const res = await deleteFile(id, parent);
      if (!res.success) {
        alert("unable to delete file right now ");
        return;
      }
      alert("file deleted successfully");
      setFiles(res.files);
      deleteRecentFile(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <table className="w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b bg-gray-100 text-left">Name</th>
          <th className="py-2 px-4 border-b bg-gray-100 text-left">
            Last edit
          </th>
          <th className="py-2 px-4 border-b bg-gray-100 text-left">Size</th>
          <th className="py-2 px-4 border-b bg-gray-100 text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {files?.map((file: FileType) => (
          <tr
            onClick={() => {
              sendFile(file._id, file.name);
            }}
            key={file._id}
            className="hover:bg-gray-50 hover:cursor-pointer"
          >
            <td className="py-2 px-4 border-b">{file?.name}</td>
            <td className="py-2 px-4 border-b">
              {file ? file.lastEdit : "2024-05-21 14:33"}
            </td>
            <td className="py-2 px-4 border-b">
              {file?.size ? file?.size + "KB" : "15 KB"}
            </td>
            <td className="py-2 px-4 border-b text-center">
              <button className="text-blue-500 hover:underline mr-2">
                Edit
              </button>
              <button
                onClick={() => {
                  deleteHandler(file._id, file.parent);
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
