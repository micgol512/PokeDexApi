/* eslint-disable react/prop-types */
import PokeCard from "./PokeCard";
// name, height, weight, base_experience, sprites
const PokemonList = ({ pokemons }) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        gap: "15px",
        width: "50%",
        justifyContent: "center",
      }}
    >
      {pokemons.map((pokemon) => (
        <PokeCard key={`pokecard-${pokemon.id}`} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
