import Button from "../../shared/Button";
import Input from "../../shared/Input";
import Wrapper from "../../shared/Wrapper";
import useLogin from "./useLogin";

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

      <Button type="submit" onClick={handleSubmit}>
        {isLogged ? "Logout" : "Login"}
      </Button>
    </Wrapper>
  );
};

export default Login;
