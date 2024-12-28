import { useContext } from "react";
import PokemonList from "../../shared/PokemonList";
import { PokemonsListContext } from "../../../context/PokemonsListContext";

const Favorites = () => {
  const { pokemonsList } = useContext(PokemonsListContext);

  return (
    <PokemonList
      pokemons={pokemonsList.filter((pokemon) => pokemon?.isFavorites === true)}
    />
  );
};

export default Favorites;
