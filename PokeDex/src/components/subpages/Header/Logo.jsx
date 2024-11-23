import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoImg = styled.img`
  width: min(35vw, 250px);
  height: 100%;
`;

const Logo = () => {
  return (
    <Link to={"/"}>
      <LogoImg src="../../../../src/images/PokeDex_logo.png" />
    </Link>
  );
};

export default Logo;
