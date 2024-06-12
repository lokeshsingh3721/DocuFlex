import { FolderType } from "../types";

export default async function getFilesByParentId(
  id: string
): Promise<FolderType[] | null> {
  try {
    const res = await fetch(
      `http://localhost:4000/api/file/fileByParentId/${id}`
    );
    const items = await res.json();

    return items.files;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
