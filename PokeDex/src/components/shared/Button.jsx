/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive", // Blokuje przekazywanie `isActive` do DOM
})`
  color: #f5f5f5;
  border: 1px solid #808080;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? "red" : "#fff")};
  cursor: pointer;
  text-shadow: 0px 0px 3px #04060f;
  &:hover {
    background-color: #000b3d;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Button = ({ onClick, children, isActive }) => (
  <StyledButton onClick={onClick} isActive={isActive}>
    {children}
  </StyledButton>
);

export default Button;
