import { useContext } from "react";
import { PokemonsListContext } from "../../../context";
import { PokemonList } from "../../shared";

const ListForEdit = () => {
  const { pokemonsList } = useContext(PokemonsListContext);
  return <PokemonList pokemons={pokemonsList} forEdit="true" />;
};

export default ListForEdit;
