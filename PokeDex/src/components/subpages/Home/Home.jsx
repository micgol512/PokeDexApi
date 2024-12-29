import { useContext, useEffect } from "react";
import useSyncData from "../../../hooks/useSyncData";
import Wrapper from "../../shared/Wrapper";
import { LoginContext } from "../../../context/LoginContext";

const Home = () => {
  const { syncData } = useSyncData();
  const { isLogged } = useContext(LoginContext);
  useEffect(() => {
    console.log("Syncing data");

    syncData();
  }, []);
  return (
    <Wrapper
      styles={{
        textAlign: "center",
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
