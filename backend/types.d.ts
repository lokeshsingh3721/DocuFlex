export type FolderType = {
  _id: string;
  name: string;
  createdAt: string;
  parent: string;
  lastEdit: string;
};
export type FileType = {
  _id: string;
  name: string;
  createdAt: string;
  lastEdit: string;
  parent: string;
  type: string;
  size: string;
  userId: string;
};
export type RecentFileType = {
  name: string;
  userId: string;
  fileId: string;
  token?: string;
};
