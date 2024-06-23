import { useWebSocket } from "../context/WebsocketProvider";
import { FileType, WebSocketContextType } from "../../types";
import deleteFile from "../utils/deleteFile";
import { useState, useEffect } from "react";
import getFilesByParentId from "../utils/getFilesByParentId";
import updateFile from "../utils/updateFile";

const Table = ({ id }: { id: string }) => {
  const {
    sendFile,
    deleteFile: deleteRecentFile,
    updateFile: updateRecentFile,
  } = useWebSocket() as WebSocketContextType;

  const [files, setFiles] = useState<FileType[] | null>(null);
  const [editFile, setEditFile] = useState({
    open: false,
    name: "",
    id: "",
  });

  useEffect(() => {
    async function init(): Promise<void> {
      setFiles(await getFilesByParentId(id));
    }
    if (!editFile.open) {
      init();
    }
  }, [id, editFile]);

  const handleEditFile = async () => {
    try {
      console.log(editFile.id, editFile.name);
      const success = await updateFile(editFile.name, editFile.id);
      if (!success) {
        alert("internal server error");
        return;
      }
      alert("updated successfully");
      updateRecentFile(editFile.id);
      setEditFile({ open: false, name: "", id: "" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

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
    <>
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
                <button
                  onClick={() => {
                    setEditFile({ open: true, id: file._id, name: "" });
                  }}
                  className="text-blue-500 hover:underline mr-2"
                >
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

      {editFile.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Update file</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full outline-none mb-4"
              placeholder="File name"
              value={editFile.name}
              onChange={(e) =>
                setEditFile({
                  open: true,
                  name: e.target.value,
                  id: editFile.id,
                })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => setEditFile({ open: false, name: "", id: "" })}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEditFile}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Table;
