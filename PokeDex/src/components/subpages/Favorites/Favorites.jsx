import { useContext } from "react";
import PokemonList from "../../shared/PokemonList/PokemonList";
import { PokemonsListContext } from "../../../context/PokemonsListContext";

const Favorites = () => {
  const { pokemonsList } = useContext(PokemonsListContext);
  console.log(
    "Favorites List:",
    pokemonsList.filter((pokemon) => pokemon?.isFavorites === true)
  );

  return (
    <PokemonList
      pokemons={pokemonsList.filter((pokemon) => pokemon?.isFavorites === true)}
    />
  );
};

export default Favorites;
