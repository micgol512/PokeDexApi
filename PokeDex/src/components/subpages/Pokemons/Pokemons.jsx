import { useContext, useState } from "react";
import Wrapper from "../../shared/Wrapper";
import PokemonList from "../../shared/PokemonList";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
import StyledInput from "../../shared/StyledInput";

const Pokemons = () => {
  const { pokemonsList, isLoading } = useContext(PokemonsListContext);
  const [sortedPokemons, setSortedPokemons] = useState(pokemonsList);

  const onChanegeSearch = (e) => {
    setSortedPokemons(
      pokemonsList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <Wrapper styles={{ justifyContent: "center" }}>
      <StyledInput
        label="Search Pokemon"
        type="search"
        onChange={onChanegeSearch}
      />
      {isLoading ? "Loading..." : <PokemonList pokemons={sortedPokemons} />}
    </Wrapper>
  );
};

export default Pokemons;
