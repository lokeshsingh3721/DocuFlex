import { useWebSocket } from "../context/WebsocketProvider";
import { FolderType, WebSocketContextType } from "../types";

const Table = ({ files }: { files: FolderType[] }) => {
  const { sendFile, recentFiles } = useWebSocket() as WebSocketContextType;

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
        {files.map((file: FolderType) => (
          <tr
            onClick={() => {
              const hasFile = recentFiles?.some((el) => el._id === file._id);

              if (hasFile) return;

              file.type = "addFile";
              sendFile(file);
            }}
            key={file._id}
            className="hover:bg-gray-50 hover:cursor-pointer"
          >
            <td className="py-2 px-4 border-b">{file?.name}</td>
            <td className="py-2 px-4 border-b">
              {file?.last_edit ? file?.last_edit : "2024-05-21 14:33"}
            </td>
            <td className="py-2 px-4 border-b">
              {file?.size ? file?.size + "KB" : "15 KB"}
            </td>
            <td className="py-2 px-4 border-b text-center">
              <button className="text-blue-500 hover:underline mr-2">
                Edit
              </button>
              <button className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
