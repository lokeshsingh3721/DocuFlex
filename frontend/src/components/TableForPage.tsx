import { FileType } from "../../types";

const TableForPage = ({ Files }: { Files: FileType[] }) => {
  return (
    <table className="w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b bg-gray-100 text-left">Name</th>
          <th className="py-2 px-4 border-b bg-gray-100 text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {Files?.map((file: FileType) => (
          <tr key={file._id} className="hover:bg-gray-50 hover:cursor-pointer">
            <td className="py-2 px-4 border-b">{file?.name}</td>
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

export default TableForPage;
