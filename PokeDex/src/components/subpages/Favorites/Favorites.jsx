import { useContext, useEffect, useState } from "react";
import { PokemonsListContext } from "../../../context";
import { PokemonList } from "../../shared";

const Favorites = () => {
  const { pokemonsList } = useContext(PokemonsListContext);
  const [sortedPokemons, setSortedPokemons] = useState([]);

  useEffect(() => {
    setSortedPokemons(
      pokemonsList.filter((pokemon) => pokemon?.isFavorites === true)
    );
  }, [pokemonsList]);

  return <PokemonList pokemons={sortedPokemons} />;
};

export default Favorites;
