/* eslint-disable react/display-name */
import { TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 0.5rem;
  padding: 0 5px;
  width: 100px;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.color};

  &::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
  }
  &::placeholder:focus {
    color: ${(props) => props.theme.colors.placeholder};
  }
  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.focusBg};
    color: ${(props) => props.theme.colors.focusColor};
  }
  // &:hover {
  //   background-color: ${(props) => props.theme.colors.hoverBg};
  //   color: ${(props) => props.theme.colors.hoverColor};
  // }
`;
StyledInput.defaultProps = {
  theme: {},
};
// const StyletTextArea = styled(TextField)`
//   // width: 100px;

//   border: 1px solid ${(props) => props.theme.colors.border};
//   // background-color: ${(props) => props.theme.colors.bg};
//   color: ${(props) => props.theme.colors.color};

//   &::placeholder {
//     color: ${(props) => props.theme.colors.placeholder};
//   }
//   // &::placeholder:focus {
//   color: ${(props) => props.theme.colors.placeholder};
//   // }
//   &:focus {
//     outline: none;
//     background-color: ${(props) => props.theme.colors.focusBg};
//     color: ${(props) => props.theme.colors.focusColor};
//     color: green;
//   }
//   // &:hover {
//   outline: none;
//   //   background-color: ${(props) => props.theme.colors.hoverBg};
//   //   color: ${(props) => props.theme.colors.hoverColor};
//   // }
// `;

const CssTextField = styled(TextField)(({ theme }) => ({
  "&": {
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: theme.colors.hoverColor,
  },
  "& label.Mui-focused": {
    color: theme.colors.border,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.colors.border,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "0.5rem",
      borderColor: theme.colors.border,
    },
    "&:hover fieldset": {
      borderColor: theme.colors.hoverColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.colors.border,
    },
  },
  "& .Mui-error": {
    color: theme.colors.border.error, // Kolor tekstu przy błędzie
  },
}));

const Input = React.forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ type = "text", value, onChange, placeholder, error }, ref) => {
    return (
      <CssTextField
        inputRef={ref}
        size="small"
        label={placeholder}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        helperText={error ? error : " "}
        error={!!error}
      />
    );
  }
);

export default Input;
