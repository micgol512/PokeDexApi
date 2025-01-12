/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { PokemonsListContext } from "../../context";
import { PokeCard, StaticPagination, Wrapper } from "./";

const PokemonList = ({ pokemons, forEdit }) => {
  const { isLoading } = useContext(PokemonsListContext);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  if (isLoading) return <div>Loading...</div>;
  if (pokemons.length === 0) return <div>The list of Pokémon is empty.</div>;
  return (
    <>
      <Wrapper
        styles={{
          flexFlow: "row wrap",
          gap: "15px",
          maxWidth: "1250px",
          justifyContent: "center",
        }}
      >
        {pokemons.map((pokemon, index) => {
          if (Math.floor(index / 15) === currentPage - 1)
            return (
              <PokeCard
                key={`pokecard-${pokemon.id}`}
                pokemon={pokemon}
                forEdit={forEdit}
              />
            );
        })}
      </Wrapper>
      <StaticPagination
        max={Math.ceil(pokemons.length / 15)}
        page={currentPage}
      />
    </>
  );
};

export default PokemonList;
