/* eslint-disable react/prop-types */
import { useContext } from "react";
import PokeCard from "./PokeCard";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
// name, height, weight, base_experience, sprites
const PokemonList = ({ pokemons }) => {
  // console.log("Komponent pokelIst otrzymuje: ", pokemons);
  const { pokemonsList, isLoading } = useContext(PokemonsListContext);
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
      {pokemonsList.map((pokemon) => (
        <PokeCard key={`pokecard-${pokemon.id}`} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
