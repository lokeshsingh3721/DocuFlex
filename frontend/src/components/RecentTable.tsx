import { useWebSocket } from "../context/WebsocketProvider";
import { RecentFileType, WebSocketContextType } from "../../types";

const RecentTable = () => {
  const { recentFiles } = useWebSocket() as WebSocketContextType;

  if (!recentFiles || recentFiles.length <= 0) {
    return (
      <center>
        <h2>No recent files </h2>
      </center>
    );
  }

  return (
    <table className="w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b bg-gray-100 text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        {recentFiles?.map((file: RecentFileType) => (
          <tr key={file._id} className="hover:bg-gray-50 hover:cursor-pointer">
            <td className="py-2 px-4 border-b">{file?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentTable;
