/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import PokeCard from "./PokeCard";
import Wrapper from "./Wrapper";
import StaticPagination from "./StaticPagination";
import { useSearchParams } from "react-router-dom";
import { PokemonsListContext } from "../../context/PokemonsListContext";
// name, height, weight, base_experience, sprites
const PokemonList = ({ pokemons, forEdit }) => {
  // console.log("Komponent pokelIst otrzymuje: ", pokemons);
  const { pokemonsList, isLoading } = useContext(PokemonsListContext);
  // const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  if (isLoading || pokemons.length === 0) return <div>Brak elementów</div>;

  return (
    <>
      <Wrapper
        styles={{
          flexFlow: "row wrap",
          gap: "15px",
          width: "50%",
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
