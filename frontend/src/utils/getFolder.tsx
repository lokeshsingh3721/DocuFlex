import { FolderType } from "../types";

export default async function getFolders(): Promise<FolderType[] | null> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:4000/api/directory/getAllRootDir",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const folders = await res.json();
    return folders.data.length > 0 ? folders.data : null;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    // throw the global error
    return null;
  }
}
