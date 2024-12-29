/* eslint-disable react/prop-types */
import PokeCard from "./PokeCard";
import Wrapper from "./Wrapper";
import StaticPagination from "./StaticPagination";
import { useSearchParams } from "react-router-dom";

const PokemonList = ({ pokemons, forEdit }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  if (pokemons.length === 0) return <div>Brak elementów</div>;
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
