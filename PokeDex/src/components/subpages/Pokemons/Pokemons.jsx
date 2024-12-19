import { useContext, useEffect } from "react";
import { ArenaContext } from "../../../context/ArenaContext";

import StylButton from "../../shared/StylButton";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Wrapper from "../../shared/Wrapper";
import useGetPokemonData from "../../../hooks/useGetPokemonData";
import { API_URL } from "../../../services/links";
import PokemonList from "../../shared/PokemonList";
import { PokemonsListContext } from "../../../context/PokemonsListContext";

const Pokemons = () => {
  const { pushToArena, popFromArena } = useContext(ArenaContext);

  const { pokemonsList, isLoading } = useContext(PokemonsListContext);
  // const { pokemons, isLoading, error } = useGetPokemonData(
  //   `${API_URL}/pokemon/1`
  // );
  useEffect(() => {
    console.log("IsLoading: ", isLoading);
  }, [isLoading]);
  return (
    <Wrapper styles={{ justifyContent: "center" }}>
      Pokemons
      {/* <StylButton onClick={() => popFromArena(1)}>dec 1</StylButton>
      <StylButton onClick={() => popFromArena(2)}>dec 2</StylButton>
      <StylButton onClick={() => popFromArena(3)}>dec 3</StylButton>
      <StylButton onClick={() => pushToArena(1)}>add 1</StylButton>
      <StylButton onClick={() => pushToArena(2)}>add 2</StylButton>
      <StylButton onClick={() => pushToArena(3)}>add 3</StylButton>
      <Link to={"/pokemon/1"}>Pokemon 1 </Link>
      <Link to={"/pokemon/2"}>Pokemon 2 </Link>
       */}
      {isLoading ? "Loading..." : <PokemonList pokemons={pokemonsList} />}
      <Outlet />
    </Wrapper>
  );
};

export default Pokemons;
