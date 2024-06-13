import { FolderType } from "../types";

export default async function getFoldersByParentId(
  id: string
): Promise<FolderType[] | null> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(` http://localhost:4000/api/directory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const items = await res.json();

    return items.folders;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
