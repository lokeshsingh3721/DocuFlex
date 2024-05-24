import { FolderType } from "../types";

export default async function getItemsByParentId(
  id: string
): Promise<FolderType[] | null> {
  try {
    const res = await fetch(`http://localhost:4000/api/directory/${id}`);
    const items = await res.json();

    return items.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
