import Wrapper from "../../shared/Wrapper";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <Wrapper
      styles={{
        flexFlow: "row nowrap",
        background: "red",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
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
          <div>LOGIN i Switch</div>
          <Navbar />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default Header;
