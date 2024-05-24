import { Link } from "react-router-dom";

const Navigate = ({ path, id }: { path: string; id: string }) => {
  return (
    <Link to={`${path}/${id}`}>
      <p className="underline">{path}</p>
    </Link>
  );
};

export default Navigate;
