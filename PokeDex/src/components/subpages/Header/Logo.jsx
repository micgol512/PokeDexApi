import styled from "styled-components";

const ImagedDiv = styled.div`
  width: min(35vw, 250px);
  height: 100%;
  background: transparent url("../../../../src/icons/PokeDex_logo.png") no-repeat center /
    contain;
`;

const Logo = () => {
  return <ImagedDiv></ImagedDiv>;
};

export default Logo;
