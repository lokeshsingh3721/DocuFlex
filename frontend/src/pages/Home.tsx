import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Folder from "../components/Folder";

import Recent from "../components/Recent";

const files = [
  {
    name: "ExampleFile1.txt",
    lastEdit: "2024-05-21 14:33",
    size: "15 KB",
  },
  {
    name: "ExampleFile2.docx",
    lastEdit: "2024-05-20 10:22",
    size: "45 KB",
  },
  {
    name: "ExampleFile3.docx",
    lastEdit: "2024-05-20 10:22",
    size: "40 KB",
  },
  {
    name: "ExampleFile1.txt",
    lastEdit: "2024-05-21 14:33",
    size: "15 KB",
  },
  {
    name: "ExampleFile2.docx",
    lastEdit: "2024-05-20 10:22",
    size: "45 KB",
  },
  {
    name: "ExampleFile3.docx",
    lastEdit: "2024-05-20 10:22",
    size: "40 KB",
  },
  // Add more file objects as needed
];

const Home = () => {
  return (
    <div className="flex justify-between pr-4 gap-4  ">
      <Sidebar />
      <div className=" ml-32   w-[70%]">
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
          <Folder name="Personal" />
          <Folder name="Music" />
          <Folder name="Video" />
          <Folder name="Backup doc" />
          <Folder name="Database" />
          <Folder name="Assets" />
          <Folder name="Movies" />
          <Folder name="Notes" />
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
                <td className="py-2 px-4 border-b">{file.lastEdit}</td>
                <td className="py-2 px-4 border-b">{file.size}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="text-blue-500 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" bg-black w-[18%] h-screen flex flex-col  gap-5 py-4 px-2 items-center  fixed right-0 text-white font-light">
        <div className="border-2 border-gray-400 flex flex-col gap-2 py-3 rounded px-2">
          <div className="flex  justify-around  items-center">
            <div className="w-12 h-12 rounded-full border-white border-[1px] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="user image"
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-lg">Hi,Boston</p>
          </div>
          <p>Storage details</p>
          <progress id="file" value="32" max="100">
            32%
          </progress>
          <p>18.7 GB of 100 GB used</p>
        </div>
        <div className=" border-2 border-gray-400 h-[50%] flex items-center  ">
          <input className="w-full text-xs " type="file" />
        </div>
      </div>
    </div>
  );
};

export default Home;
