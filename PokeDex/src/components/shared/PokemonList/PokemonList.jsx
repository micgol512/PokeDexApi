import PokeCard from "./PokeCard";
// name, height, weight, base_experience, sprites
const PokemonList = ({ pokemons }) => {
  console.log(pokemons);

  return <div>Lista</div>;
  //   pokemons.map((pokemon, { id }) => (
  //     <PokeCard key={`pokecard-${id}`} pokemon={pokemon} />
  //   ));
};

export default PokemonList;
