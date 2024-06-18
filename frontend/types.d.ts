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
  _id?: string;
  name: string;
  fileId: string;
  token?: string;
  lastEdit?: string;
};
type PageNavigation = {
  path: string;
  id: string;
};

type NavigationContextType = {
  pageNavigation: PageNavigation[] | null;
  setPageNavigation: React.Dispatch<
    React.SetStateAction<PageNavigation[] | null>
  >;
};

type WebSocketContextType = {
  recentFiles: RecentFileType[] | null;
  sendFile: (fileId: string, name: string) => void;
  deleteFile: (fileId: string) => void;
};
