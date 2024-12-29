import { useContext, useEffect, useState } from "react";
import Wrapper from "../../shared/Wrapper";
import Logo from "./Logo";
import { NavButton, Navbar } from "./Navbar";
import { LoginContext } from "../../../context/LoginContext";
import Login from "../Login/Login";
import useGetPokemonData from "../../../hooks/useGetPokemonData";
import ThemeChanger from "./ThemeChanger";
import { API_URL, LOCAL_URL } from "../../../services/links";
import { mergePokemon } from "../../../services/functions";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
import useSyncData from "../../../hooks/useSyncData";

const Header = () => {
  const { isLogged } = useContext(LoginContext);
  const { setPokemonsList } = useContext(PokemonsListContext);
  const { pokemons } = useGetPokemonData(
    `${API_URL}/pokemon?limit=15&offset=0`
  );
  const { syncData } = useSyncData();

  useEffect(() => {
    setPokemonsList(pokemons);
    if (isLogged) {
      syncData();
    }
  }, [isLogged, pokemons]);

  return (
    <Wrapper
      styles={{
        height: "max(100px,10vh)",
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
