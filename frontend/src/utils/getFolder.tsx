import { FolderType } from "../types";

export default async function getFolders(): Promise<FolderType[] | null> {
  try {
    const res = await fetch(
      "http://localhost:4000/api/directory/getAllRootDir"
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
