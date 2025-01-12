import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PokemonsListContext } from "../../../context";
import { StyledInput, PokemonList, Wrapper } from "../../shared";

const Pokemons = () => {
  const { pokemonsList, isLoading } = useContext(PokemonsListContext);
  const [sortedPokemons, setSortedPokemons] = useState(pokemonsList);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const onChanegeSearch = (e) => {
    setSortedPokemons(
      pokemonsList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setSearchParams({ page: "1" });
  };
  return (
    <Wrapper styles={{ justifyContent: "center", gap: "20px" }}>
      <StyledInput
        label="Search Pokémon"
        type="search"
        onChange={onChanegeSearch}
      />
      {isLoading ? "Loading..." : <PokemonList pokemons={sortedPokemons} />}
    </Wrapper>
  );
};

export default Pokemons;
