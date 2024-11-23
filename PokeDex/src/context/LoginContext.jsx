/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const LoginContext = createContext(false);
const LoginProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const logIn = () => {
    localStorage.setItem("userIsLoggedIn", true);
    setIsLogged(true);
  };
  const logOut = () => {
    localStorage.removeItem("userIsLoggedIn");
    localStorage.removeItem("username");
    setIsLogged(false);
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
