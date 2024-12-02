/* eslint-disable react/prop-types */
import PokeCard from "./PokeCard";
// name, height, weight, base_experience, sprites
const PokemonList = ({ pokemons }) => {
  console.log("PokeList", pokemons);

  return (
    <div>
      {pokemons.map((pokemon) => (
        <PokeCard key={`pokecard-${pokemon.id}`} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
