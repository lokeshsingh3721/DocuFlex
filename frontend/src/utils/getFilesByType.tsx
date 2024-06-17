import { FileType } from "../../types";

export default async function getFilesByType(
  type: string
): Promise<FileType[] | null> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:4000/api/file/fileByType/${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const items = await res.json();

    console.log("working");

    return items.files;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
