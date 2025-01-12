import { useContext, useEffect, useState } from "react";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { PokemonsListContext } from "../../../context";
import { sortPokesByKey } from "../../../services/functions";
import { PokemonList, Wrapper } from "../../shared";
import { useSearchParams } from "react-router-dom";

const Ranking = () => {
  const { pokemonsList } = useContext(PokemonsListContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "id");
  const [sortAscending, setSortAscending] = useState(
    searchParams.get("ascending") === "true"
  );
  const [sortedPokemons, setSortedPokemons] = useState(pokemonsList);

  useEffect(() => {
    setSortedPokemons(pokemonsList);
  }, [pokemonsList]);

  useEffect(() => {
    setSortedPokemons((p) => sortPokesByKey(p, sortBy, sortAscending));
  }, [sortBy, sortAscending]);

  const onChangeSortByHandler = (e) => {
    const newSortBy = e.target.value;
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("sortBy", newSortBy);
      return params;
    });
    setSortBy(newSortBy);
    setSortedPokemons((p) => sortPokesByKey(p, newSortBy, sortAscending));
  };

  const onChangeSortAscendingHandler = (e) => {
    const newSortAscending = e.target.value;
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("ascending", newSortAscending);
      return params;
    });
    setSortAscending(newSortAscending);
    setSortedPokemons((p) => sortPokesByKey(p, sortBy, newSortAscending));
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
            <MenuItem value={"base_experience"}>Experience</MenuItem>
            <MenuItem value={"height"}>Height</MenuItem>
            <MenuItem value={"weight"}>Weight</MenuItem>
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
