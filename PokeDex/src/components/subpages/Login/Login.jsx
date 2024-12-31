import { FormControl } from "@mui/material";

import useLogin from "../../../hooks/useLogin";
import { StyledButton, StyledInput, Wrapper } from "../../shared";

const Login = () => {
  const {
    handleSubmit,
    setUsername,
    setPassword,
    username,
    password,
    isLogged,
  } = useLogin();

  return (
    <Wrapper styles={{ flexFlow: "row nowrap" }}>
      {isLogged ? (
        <div>Welcome, {localStorage.getItem("user")}</div>
      ) : (
        <>
          <FormControl size="small" sx={{ flexDirection: "row", gap: "5px" }}>
            <StyledInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              autoComplete="name"
            />
            <StyledInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              autoComplete="current-password"
              size="small"
            />
          </FormControl>
        </>
      )}

      <StyledButton type="submit" onClick={handleSubmit}>
        {isLogged ? "Logout" : "Login"}
      </StyledButton>
    </Wrapper>
  );
};

export default Login;
