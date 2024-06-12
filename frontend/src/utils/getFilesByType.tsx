import { FolderType } from "../types";

export default async function getFilesByType(
  type: string
): Promise<FolderType[] | null> {
  try {
    const res = await fetch(
      `http://localhost:4000/api/file/fileByType/${type}`
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
