import { useState, useContext } from "react";
import { enqueueSnackbar } from "notistack";
import { LoginContext } from "../context";
import { LOCAL_URL } from "../services/links";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLogged, logIn, logOut } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogged) {
      const url = `${LOCAL_URL}/users?username=${username}&password=${password}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
          enqueueSnackbar("Login succesfull.", { variant: "success" });
          localStorage.setItem("user", username);
          logIn();
          setPassword("");
          setUsername("");
        } else {
          enqueueSnackbar("Invalid username or password", { variant: "error" });
          logOut();
        }
      } catch (err) {
        enqueueSnackbar(`Failed to connect to the server: ${err}`, {
          variant: "error",
        });
        logOut();
      }
    } else {
      enqueueSnackbar("Logout.", { variant: "info" });
      logOut();
      setPassword("");
      setUsername("");
    }
  };

  return {
    handleSubmit,
    setUsername,
    setPassword,
    username,
    password,
    isLogged,
  };
};

export default useLogin;
