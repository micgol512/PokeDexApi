import Input from "../../shared/Input";
import Wrapper from "../../shared/Wrapper";
import StylButton from "../../shared/StylButton";
import useLogin from "../../../hooks/useLogin";
import { FormControl } from "@mui/material";

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
        <div>Zalogowano jako: {localStorage.getItem("user")}</div>
      ) : (
        <>
          <FormControl
            onSubmit={handleSubmit}
            size="small"
            sx={{ flexDirection: "row" }}
          >
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="name"
            />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              size="small"
            />
          </FormControl>
        </>
      )}

      <StylButton type="submit" onClick={handleSubmit}>
        {isLogged ? "Logout" : "Login"}
      </StylButton>
    </Wrapper>
  );
};

export default Login;
