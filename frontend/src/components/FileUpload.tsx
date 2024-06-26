import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            }
          },
        }
      );

      console.log("File uploaded successfully:", response.data);

      // Add a small delay before resetting
      setTimeout(() => {
        setUploadProgress(0);
        setFile(null);
        setIsUploading(false);
      }, 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <input
          type="file"
          onChange={handleFileChange}
          disabled={isUploading}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={isUploading}
          className={`px-4 py-2 text-white ${
            isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          } rounded`}
        >
          Upload
        </button>
      </form>
      {isUploading && (
        <div className="fixed  inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center  z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-black ">Upload Progress: {uploadProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
