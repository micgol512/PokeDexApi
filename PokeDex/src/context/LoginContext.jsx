/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext(false);
const LoginProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const logIn = () => {
    localStorage.setItem("userIsLoggedIn", true);
    setIsLogged(true);
    navigate("/");
  };
  const logOut = () => {
    localStorage.removeItem("userIsLoggedIn");
    localStorage.removeItem("username");
    setIsLogged(false);

    navigate("/");
  };
  useEffect(() => {
    if (localStorage.getItem("userIsLoggedIn") === "true") logIn();
  }, []);
  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, logIn, logOut }}>
      {children}
    </LoginContext.Provider>
  );
};
export { LoginContext, LoginProvider };
