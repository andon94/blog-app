import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { Children } from "../interfaces/context";

const BaseProtectedRoute = ({ children }: Children) => {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to="/"></Navigate>;
  return <>{children}</>;
};

export default BaseProtectedRoute;
