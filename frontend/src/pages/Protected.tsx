import { useEffect, useState, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }
      setIsValid(true);
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
