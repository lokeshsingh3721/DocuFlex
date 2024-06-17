import { Link } from "react-router-dom";
import { useNavigationContext } from "../context/NavigationProvider";
import { PageNavigation } from "../../types";

const Breadcrumb = () => {
  const { pageNavigation, setPageNavigation } = useNavigationContext();

  function clearNavigation(path: string, id: string) {
    setPageNavigation((page) => {
      const arr: PageNavigation[] = [];

      for (const el of page || []) {
        arr.push({ path: el.path, id: el.id });
        if (el.path === path && el.id === id) {
          break;
        }
      }

      if (arr.length > 0) {
        return arr;
      }
      return null;
    });
  }

  return (
    <div className="ml-40 flex gap-1 pt-5">
      {pageNavigation?.map((page) => {
        return (
          <p>
            {" "}
            <Link
              to={`${page.path}/${page.id}`}
              onClick={() => {
                clearNavigation(page.path, page.id);
              }}
              className="underline"
            >
              {page.path}
            </Link>{" "}
            /{" "}
          </p>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
