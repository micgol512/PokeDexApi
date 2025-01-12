/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import styled from "styled-components";

const StyledButtonCss = styled(Button)(({ theme, isActive }) => ({
  "&&": {
    borderRadius: "0.5rem",
    color: theme.colors.color,
  },
  "&:hover": {
    backgroundColor: isActive ? theme.colors.hoverbg : theme.colors.bg,
    color: isActive ? theme.colors.hoverColor : theme.colors.color,
    borderColor: "#0062cc",
    boxShadow: "none",
  },
}));

const StyledButton = ({
  onClick,
  children,
  isActive,
  type = "button",
  disabled = false,
}) => (
  <StyledButtonCss
    variant={isActive ? "contained" : "outlined"}
    size="small"
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </StyledButtonCss>
);

export default StyledButton;
