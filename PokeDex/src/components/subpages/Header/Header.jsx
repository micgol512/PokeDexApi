import { useContext, useEffect } from "react";
import { LoginContext, PokemonsListContext } from "../../../context";
import useSyncData from "../../../hooks/useSyncData";
import useGetPokemonData from "../../../hooks/useGetPokemonData";
import { Wrapper } from "../../shared";
import { Login } from "../";
import { NavButton, Navbar } from "./Navbar";
import Logo from "./Logo";
import ThemeChanger from "./ThemeChanger";
import { API_URL } from "../../../services/links";

const Header = () => {
  const { isLogged } = useContext(LoginContext);
  const { setPokemonsList } = useContext(PokemonsListContext);
  const { pokemons } = useGetPokemonData(
    `${API_URL}/pokemon?limit=151&offset=0`
  );
  const { syncData } = useSyncData();

  const firstLoad = async () => {
    await setPokemonsList(pokemons);
    isLogged && syncData();
  };

  useEffect(() => {
    firstLoad();
  }, [isLogged, pokemons]);

  return (
    <Wrapper
      styles={{
        width: "1250px",
        flexFlow: "row nowrap",
        justifyContent: "space-around",
        alignItems: "space-around",
      }}
    >
      <Logo />
      <Wrapper styles={{ alignItems: "end" }}>
        <Wrapper styles={{ flexFlow: "row nowrap" }}>
          <Login />
          {!isLogged && <NavButton name={"Register"} path={"register"} />}
          <ThemeChanger />
        </Wrapper>
        <Navbar />
      </Wrapper>
    </Wrapper>
  );
};

export default Header;
