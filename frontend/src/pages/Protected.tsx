import { useEffect, useState, ReactNode } from "react";
import getFolders from "../utils/getFolder";
import { Link } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }
      const allDir = await getFolders();
      if (!allDir) setIsValid(false);
    };
    init();
  }, []);

  if (!isValid) {
    return (
      <center>
        <h2>Invalid access</h2>
        <Link to={"/login"}>Login</Link>
      </center>
    );
  }

  return <>{children}</>;
};

export default Protected;
