import { createContext, useState } from "react";

const LoginContext = createContext(false);
const LoginProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const logIn = () => {
    setIsLogged(true);
  };
  const logOut = () => {
    setIsLogged(false);
  };

  return (
    <LoginContext.Provider value={{ isLogged, logIn, logOut }}>
      {children}
    </LoginContext.Provider>
  );
};
export { LoginContext, LoginProvider };
