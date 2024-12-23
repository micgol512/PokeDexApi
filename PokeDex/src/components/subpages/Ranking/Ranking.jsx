import { useContext, useEffect, useState } from "react";
import PokemonList from "../../shared/PokemonList";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
import { MenuItem, Select } from "@mui/material";
import Wrapper from "../../shared/Wrapper";
import { sortPokesByKey } from "../../../services/functions";
// NOWY STAN Z LISTĄ POKEMONÓW z contextu PokemonsListContext i zastosowanie do tej listy funkcji sortującej po wybranej prze z urzytkownmika wartości. A lista pokemonów jedynie wyświetla pokemony co mają kluce takie jak: loses, wins,rows (draws)
const Ranking = () => {
  const { pokemonsList } = useContext(PokemonsListContext);
  const [sortBy, setSortBy] = useState("id");
  const [sortAscending, setSortAscending] = useState(true);
  const [sortedPokemons, setSortedPokemons] = useState(pokemonsList);

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
    <>
      <Wrapper styles={{ flexDirection: "row" }}>
        <Select label="Sort" value={sortBy} onChange={onChangeSortByHandler}>
          <MenuItem value={"id"}>ID</MenuItem>
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"wins"}>Wins</MenuItem>
          <MenuItem value={"loses"}>Loses</MenuItem>
          <MenuItem value={"draws"}>Draws</MenuItem>
        </Select>
        <Select
          label="Sort"
          value={sortAscending}
          onChange={onChangeSortAscendingHandler}
        >
          <MenuItem value={true}>Ascending</MenuItem>
          <MenuItem value={false}>Descending</MenuItem>
        </Select>
      </Wrapper>

      <PokemonList pokemons={sortedPokemons} />
    </>
  );
};

export default Ranking;
