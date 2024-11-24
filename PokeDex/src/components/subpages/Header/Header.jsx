import { useContext } from "react";
import Wrapper from "../../shared/Wrapper";
import Logo from "./Logo";
import { NavButton, Navbar } from "./Navbar";
import { LoginContext } from "../../../context/LoginContext";
import Login from "../Login/Login";

const Header = () => {
  const { isLogged } = useContext(LoginContext);

  return (
    <Wrapper
      styles={{
        flexFlow: "row nowrap",
        background: "red",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10px",
      }}
    >
      <Wrapper
        styles={{
          height: "max(100px,10vh)",
          width: "1250px",
          flexFlow: "row nowrap",
          justifyContent: "space-around",
          alignItems: "space-around",
        }}
      >
        <Logo />
        <Wrapper>
          <Wrapper styles={{ flexFlow: "row nowrap" }}>
            {" "}
            <Login />
            {!isLogged && <NavButton name={"Register"} path={"register"} />}
          </Wrapper>
          <Navbar />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default Header;
