import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../../context/LoginContext";
import Wrapper from "../../shared/Wrapper";

const NotLogged = () => {
  const { isLoged } = useContext(LoginContext);
  useEffect(() => {
    if (!isLoged)
      enqueueSnackbar("Page only for logged users.", { variant: "info" });
  }, [isLoged]);

  return (
    <Wrapper styles={{ fontSize: "1.5rem", flexDirection: "row" }}>
      <p>
        Please <strong>log in</strong> or <strong>sing in</strong> before
        entering this page.
      </p>
      <img
        src="../../../src/images/Pikachu.png"
        alt="Pikachu on pokeball"
        height="250px"
      />
    </Wrapper>
  );
};

export default NotLogged;
