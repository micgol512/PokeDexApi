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
  };
  const logOut = () => {
    localStorage.removeItem("userIsLoggedIn");
    localStorage.removeItem("username");
    setIsLogged(false);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("userIsLoggedIn") === "true") setIsLogged(true);
  }, []);

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);
  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, logIn, logOut }}>
      {children}
    </LoginContext.Provider>
  );
};
export { LoginContext, LoginProvider };
