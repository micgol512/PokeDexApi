/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})`
  border: 1px solid #3c6aff;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? "darkred" : "#fff")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  cursor: pointer;
  text-shadow: 0px 0px 3px #04060f;

  &:hover {
    background-color: #ffff00;
    color: #3c6aff;
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
