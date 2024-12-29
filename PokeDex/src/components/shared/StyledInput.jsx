/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { styled } from "styled-components";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.colors.border, // Niebieski na hover
    },
    "&.Mui-focused fieldset": {
      color: theme.colors.focusColor,
      borderColor: theme.colors.focusColor, // Żółty na focus
    },
  },
}));
const StyledInput = ({
  register,
  name = "",
  label = "LABEL",
  type = "text",
  error = false,
  helperText = "",
  autoComplete = "off",
  ...rest
}) => {
  return (
    <StyledTextField
      {...(register ? { ...register(name) } : null)}
      label={label}
      placeholder={label}
      type={type}
      error={!!error}
      helperText={helperText}
      autoComplete={autoComplete}
      variant="outlined"
      size="small"
      {...rest}
    />
  );
};
export default StyledInput;
