import React from "react";

const Table = ({ files }: { files: any }) => {
  console.log(files);
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
        {files.map((file, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{file.name}</td>
            <td className="py-2 px-4 border-b">
              {file.lastEdit ? file.lastEdit : "2024-05-21 14:33"}
            </td>
            <td className="py-2 px-4 border-b">
              {file.size ? file.size : "15 KB"}
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
