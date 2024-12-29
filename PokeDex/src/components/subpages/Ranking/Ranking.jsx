import { useContext, useEffect, useState } from "react";
import PokemonList from "../../shared/PokemonList";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import Wrapper from "../../shared/Wrapper";
import { sortPokesByKey } from "../../../services/functions";
const Ranking = () => {
  const { pokemonsList } = useContext(PokemonsListContext);
  const [sortBy, setSortBy] = useState("id");
  const [sortAscending, setSortAscending] = useState(true);
  const [sortedPokemons, setSortedPokemons] = useState(pokemonsList);

  useEffect(() => {
    setSortedPokemons(
      pokemonsList.filter(
        (pokemon) => pokemon.loses || pokemon.wins || pokemon.draws
      )
    );
  }, [pokemonsList]);

  useEffect(() => {
    setSortedPokemons((p) => sortPokesByKey(p, sortBy, sortAscending));
  }, [sortBy, sortAscending]);

  const onChangeSortByHandler = (e) => {
    setSortBy(e.target.value);
    setSortedPokemons((p) => sortPokesByKey(p, e.target.value, sortAscending));
  };
  const onChangeSortAscendingHandler = (e) => {
    setSortAscending(e.target.value);
    setSortedPokemons((p) => sortPokesByKey(p, sortBy, e.target.value));
  };

  return (
    <Wrapper styles={{ gap: "20px" }}>
      <Wrapper styles={{ flexDirection: "row" }}>
        <FormLabel sx={{ alignContent: "center" }}>Sort by:</FormLabel>
        <FormControl sx={{ flexDirection: "row" }} size="small">
          <Select value={sortBy} onChange={onChangeSortByHandler}>
            <MenuItem value={"id"}>ID</MenuItem>
            <MenuItem value={"name"}>Name</MenuItem>
            <MenuItem value={"wins"}>Wins</MenuItem>
            <MenuItem value={"loses"}>Loses</MenuItem>
            <MenuItem value={"draws"}>Draws</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ flexDirection: "row" }} size="small">
          <Select value={sortAscending} onChange={onChangeSortAscendingHandler}>
            <MenuItem value={true}>Ascending</MenuItem>
            <MenuItem value={false}>Descending</MenuItem>
          </Select>
        </FormControl>
      </Wrapper>
      <PokemonList pokemons={sortedPokemons} />
    </Wrapper>
  );
};

export default Ranking;
