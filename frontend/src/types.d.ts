export type FolderType = {
  _id: string;
  name: string;
  createdAt: string;
  isFolder: boolean;
  parent: string;
  last_edit: string;
  size: string;
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
