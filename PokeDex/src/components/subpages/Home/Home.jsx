import { useContext, useEffect } from "react";
import useSyncData from "../../../hooks/useSyncData";
import Wrapper from "../../shared/Wrapper";
import { LoginContext } from "../../../context/LoginContext";

const Home = () => {
  const { syncData } = useSyncData();
  const { isLogged } = useContext(LoginContext);
  useEffect(() => {
    if (isLogged) {
      syncData();
    }
  }, []);
  return (
    <Wrapper
      styles={{
        marginTop: "20px",
        gap: "2rem",
      }}
    >
      <h1>Welcome to my PokeDex App</h1>
      {!isLogged && (
        <p>
          For a better experience, please <strong>log in</strong> or{" "}
          <strong>sign up</strong> :)
        </p>
      )}
    </Wrapper>
  );
};

export default Home;
