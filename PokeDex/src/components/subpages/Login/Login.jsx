import Input from "../../shared/Input";
import Wrapper from "../../shared/Wrapper";
import useLogin from "./useLogin";
import StylButton from "../../shared/StylButton";

const Login = () => {
  const { handleSubmit, setUsername, setPassword, username, password, isLogged } =
    useLogin();

  return (
    <Wrapper styles={{ flexFlow: "row nowrap" }}>
      {isLogged ? (
        <div>Zalogowano jako: {localStorage.getItem("user")}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Wrapper styles={{ flexFlow: "row nowrap" }}>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Wrapper>
        </form>
      )}

      <StylButton type="submit" onClick={handleSubmit}>
        {isLogged ? "Logout" : "Login"}
      </StylButton>
    </Wrapper>
  );
};

export default Login;
