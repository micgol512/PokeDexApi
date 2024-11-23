import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../../context/LoginContext";

const NotLogged = () => {
  const { isLoged } = useContext(LoginContext);
  useEffect(() => {
    if (!isLoged) enqueueSnackbar("Page only for logged users.", { variant: "info" });
  }, [isLoged]);

  return <div>Please log in before entering this page.</div>;
};

export default NotLogged;
