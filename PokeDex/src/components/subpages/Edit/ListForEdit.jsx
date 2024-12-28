import React, { useContext } from "react";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
import PokemonList from "../../shared/PokemonList";

const ListForEdit = () => {
  const { pokemonsList } = useContext(PokemonsListContext);
  return <PokemonList pokemons={pokemonsList} forEdit="true" />;
};

export default ListForEdit;
