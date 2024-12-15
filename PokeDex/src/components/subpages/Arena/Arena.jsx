import { useContext, useState } from "react";
import { ArenaContext } from "../../../context/ArenaContext";
import styled from "styled-components";
const ArenaBasic = styled.div(({ theme, randbg }) => ({
  display: "flex",
  color: "white",
  justifyContent: "center",
  width: "100%",
  height: "80vh",
  background: `red url("../../src/images/arenas/arena${randbg}.jpg") no-repeat
    center / cover`,
}));

const Arena = () => {
  const { arenaPokemon } = useContext(ArenaContext);
  // const randBG = Math.ceil(Math.random() * 10);
  const randbg = 10;
  const [pokeId, setPokeId] = useState(1);

  if (arenaPokemon.length === 0)
    return (
      <ArenaBasic randbg={randbg}>
        <img
          style={{
            position: "absolute",
            top: "150px",
            left: "200px",
            transform: "scaleX(-1)",
          }}
          width={"300px"}
          height={"300px"}
          // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
          alt="left"
        />
        <img
          style={{
            position: "absolute",
            top: "150px",
            right: "200px",
          }}
          width={"300px"}
          height={"300px"}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
          alt="left"
        />
        <button onClick={() => setPokeId((p) => p + 1)}>Fight</button>
      </ArenaBasic>
    );

  return (
    <div>
      In Arena {arenaPokemon.length === 1 ? "is" : "are"} {arenaPokemon.length}{" "}
      Poke
      {arenaPokemon.length === 1 ? "" : "s"}!!! Sprawdzam {arenaPokemon[1]}
    </div>
  );
};

export default Arena;
