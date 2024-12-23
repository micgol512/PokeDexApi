/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
// import { styled } from "styled-components";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "blue", // Niebieski na hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "yellow", // Żółty na focus
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
    <TextField
      {...(register ? { ...register(name) } : null)}
      label={label}
      placeholder={label}
      type={type}
      error={!!error}
      helperText={error ? helperText : ""}
      autoComplete={autoComplete}
      variant="outlined"
      {...rest}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "blue", // Niebieski na hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "yellow", // Żółty na focus
          },
        },
      }}
    />
  );
};
export default StyledInput;
