import { useContext, useState } from "react";
import { ArenaContext } from "../../../context/ArenaContext";
import styled from "styled-components";
import PokeCard from "../../shared/PokeCard";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
import Wrapper from "../../shared/Wrapper";
const ArenaBasic = styled.div(({ theme, randbg }) => ({
  display: "flex",
  color: "white",
  justifyContent: "center",
  width: "100%",
  height: "80vh",
  gat: "15px",
  background: `red url("../../src/images/arenas/arena${randbg}.jpg") no-repeat
    center / cover`,
}));

const Arena = () => {
  const { arenaPokemon } = useContext(ArenaContext);
  const { pokemonsList } = useContext(PokemonsListContext);
  const randbg = Math.ceil(Math.random() * 10);
  // const randbg = 10;
  const [pokeId, setPokeId] = useState(1);
  if (arenaPokemon.length === 0)
    return (
      <ArenaBasic randbg={randbg}>Brak elementów do wyświetlenia</ArenaBasic>
    );
  // if (arenaPokemon.length === 1) return <PokeCard pokemon={arenaPokemon[0]} />;
  return (
    <ArenaBasic randbg={randbg}>
      {arenaPokemon.map((pokemon, index) => (
        <PokeCard key={`ArenaPoke-${index}`} pokemon={pokemon} />
      ))}
      {/* <PokeCard pokemon={arenaPokemon[0]} />
      <PokeCard pokemon={arenaPokemon[1]} /> */}
    </ArenaBasic>
  );
  // if (arenaPokemon.length === 0)
  //   return (
  //     <ArenaBasic randbg={randbg}>
  //       <img
  //         style={{
  //           position: "absolute",
  //           top: "150px",
  //           left: "200px",
  //           transform: "scaleX(-1)",
  //         }}
  //         width={"300px"}
  //         height={"300px"}
  //         // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
  //         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
  //         alt="left"
  //       />
  //       <img
  //         style={{
  //           position: "absolute",
  //           top: "150px",
  //           right: "200px",
  //         }}
  //         width={"300px"}
  //         height={"300px"}
  //         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
  //         alt="left"
  //       />
  //       <button onClick={() => setPokeId((p) => p + 1)}>Fight</button>
  //       {console.log("Arena Lista: ", pokemonsList)}
  //     </ArenaBasic>
  //   );

  return (
    <div>
      In Arena {arenaPokemon.length === 1 ? "is" : "are"} {arenaPokemon.length}{" "}
      Poke
      {arenaPokemon.length === 1 ? "" : "s"}!!! Sprawdzam{" "}
      {arenaPokemon[1]?.name}
    </div>
  );
};

export default Arena;
