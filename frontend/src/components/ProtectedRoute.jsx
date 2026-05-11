import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, initialLoading } = useContext(AuthContext);


  if (initialLoading) {
    return <p>Loading...</p>;
  }

  console.log(user);
  

  if (!user) {
    return <Navigate to="/login-page"/>;
  }

  return children;
};

export default ProtectedRoute;