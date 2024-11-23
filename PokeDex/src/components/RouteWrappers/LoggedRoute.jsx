import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

// eslint-disable-next-line react/prop-types
const LoggedRoute = ({ children }) => {
  const { isLogged } = useContext(LoginContext);
  if (isLogged) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default LoggedRoute;
