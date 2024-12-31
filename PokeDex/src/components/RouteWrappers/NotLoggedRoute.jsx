import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../context";

// eslint-disable-next-line react/prop-types
const NotLoggedRoute = ({ children }) => {
  const { isLogged } = useContext(LoginContext);
  if (isLogged) {
    return children;
  }
  return <Navigate to="/notlogged" replace />;
};
export default NotLoggedRoute;
