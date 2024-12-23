// import { useContext, useState } from "react";
// import { ArenaContext } from "../../../context/ArenaContext";
// import styled, { keyframes } from "styled-components";
// import PokeCard from "../../shared/PokeCard";
// import { PokemonsListContext } from "../../../context/PokemonsListContext";
// import Wrapper from "../../shared/Wrapper";

// const ArenaBasic = styled.div(({ theme, randbg }) => ({
//   display: "flex",
//   flexFlow: "column nowrap",
//   color: "white",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "100%",
//   height: "80vh",
//   gat: "15px",
//   background: `red url("../../src/images/arenas/arena${randbg}.jpg") no-repeat
//     center / cover`,
// }));

// const ArenaFloor = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   width: 50%;
//   height: 100%;
//   background: green;
//   gap: 50px;
// `;

// const FightButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: yellow;
//   border: none;
//   cursor: pointer;
// `;

// const moveToCenter = keyframes`
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-100%); }
// `;
// const moveToCenterSecond = keyframes`
//   0% { transform: translateX(0); }
//   100% { transform: translateX(100%); }
// `;
// const PokemonWrapper = styled.div`
//   animation: ${({ animate, second }) =>
//       animate ? (second ? moveToCenter : moveToCenterSecond) : "none"}
//     2000ms forwards;
// `;

// const Arena = () => {
//   const { arenaPokemon } = useContext(ArenaContext);
//   const { pokemonsList } = useContext(PokemonsListContext);
//   const randbg = Math.ceil(Math.random() * 10);
//   // const randbg = 10;
//   const [pokeId, setPokeId] = useState(1);
//   if (arenaPokemon.length === 0)
//     return (
//       <ArenaBasic randbg={randbg}>Brak elementów do wyświetlenia</ArenaBasic>
//     );
//   // if (arenaPokemon.length === 1) return <PokeCard pokemon={arenaPokemon[0]} />;
//   return (
//     <ArenaBasic randbg={randbg}>
//       <ArenaFloor>
//         {arenaPokemon.map((pokemon, index) => (
//           <PokeCard key={`ArenaPoke-${index}`} pokemon={pokemon} />
//         ))}
//         {/* <PokeCard pokemon={arenaPokemon[0]} />
//       <PokeCard pokemon={arenaPokemon[1]} /> */}
//       </ArenaFloor>
//       <FightButton>Fight</FightButton>
//     </ArenaBasic>
//   );
//   // if (arenaPokemon.length === 0)
//   //   return (
//   //     <ArenaBasic randbg={randbg}>
//   //       <img
//   //         style={{
//   //           position: "absolute",
//   //           top: "150px",
//   //           left: "200px",
//   //           transform: "scaleX(-1)",
//   //         }}
//   //         width={"300px"}
//   //         height={"300px"}
//   //         // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
//   //         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
//   //         alt="left"
//   //       />
//   //       <img
//   //         style={{
//   //           position: "absolute",
//   //           top: "150px",
//   //           right: "200px",
//   //         }}
//   //         width={"300px"}
//   //         height={"300px"}
//   //         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
//   //         alt="left"
//   //       />
//   //       <button onClick={() => setPokeId((p) => p + 1)}>Fight</button>
//   //       {console.log("Arena Lista: ", pokemonsList)}
//   //     </ArenaBasic>
//   //   );

//   return (
//     <div>
//       In Arena {arenaPokemon.length === 1 ? "is" : "are"} {arenaPokemon.length}{" "}
//       Poke
//       {arenaPokemon.length === 1 ? "" : "s"}!!! Sprawdzam{" "}
//       {arenaPokemon[1]?.name}
//     </div>
//   );
// };

// export default Arena;
import { useContext, useEffect, useState } from "react";
import { ArenaContext } from "../../../context/ArenaContext";
import styled, { keyframes } from "styled-components";
import PokeCard from "../../shared/PokeCard";
import { PokemonsListContext } from "../../../context/PokemonsListContext";
import Wrapper from "../../shared/Wrapper";
import useUpdatePokemonStatus from "../../../hooks/useUpdateStatus";

const ArenaBasic = styled.div(({ theme, randbg }) => ({
  display: "flex",
  flexFlow: "column nowrap",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "80vh",
  gap: "15px",
  background: `red url("../../src/images/arenas/arena${randbg}.jpg") no-repeat center / cover`,
}));

const ArenaFloor = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  background: green;
  gap: 50px;
`;

const FightButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: yellow;
  border: none;
  cursor: pointer;
`;

const moveToCenter = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  75% { transform: translateX(20px); }
  100% { transform: translateX(-80%); }
`;

const moveToCenterSecond = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-20px); }
  100% { transform: translateX(80%); }
`;
const PokemonWrapper = styled.div`
  animation: ${({ animate, second }) =>
      animate ? (second ? moveToCenter : moveToCenterSecond) : "none"}
    2000ms forwards;
`;

const Arena = () => {
  const { arenaPokemon, popFromArena } = useContext(ArenaContext);
  const { pokemonsList } = useContext(PokemonsListContext);
  const [fightStarted, setFightStarted] = useState(false);
  const [endFight, setEndFight] = useState(false);
  const updateStatus = useUpdatePokemonStatus();

  useEffect(() => {
    console.log("ArenaZamontowana");
    setFightStarted(false);
    setEndFight(false);
    return () => {
      if (endFight) popFromArena();
      console.log("ArenaOdmontowana");
    };
  }, []);
  const fight = () => {
    let winnerIndex = 0;
    if (
      arenaPokemon[1].base_experience * arenaPokemon[1].height >
      arenaPokemon[0].base_experience * arenaPokemon[0].height
    ) {
      winnerIndex = 1;
    } else if (
      arenaPokemon[0].base_experience * arenaPokemon[0].height ===
      arenaPokemon[1].base_experience * arenaPokemon[1].height
    ) {
      winnerIndex = -1;
    }
    return winnerIndex;
  };

  const handleFight = () => {
    setFightStarted(true);

    setTimeout(() => {
      const indexWinner = fight();
      if (indexWinner === -1) {
        updateStatus(arenaPokemon[0].id, { draws: 1 });
        updateStatus(arenaPokemon[1].id, { draws: 1 });
      } else {
        updateStatus(arenaPokemon[indexWinner].id, { wins: 1 });
        updateStatus(arenaPokemon[1 - indexWinner].id, { loses: 1 });
        popFromArena(arenaPokemon[1 - indexWinner]);
      }
      setFightStarted(false);
      setEndFight(true);
    }, 2000);
  };
  const handleResetArenaFight = () => {
    setEndFight(false);
    setFightStarted(false);
    // popFromArena();
  };
  if (!endFight) {
    return (
      <ArenaBasic>
        {arenaPokemon.length === 0 && (
          <ArenaFloor>
            <p>Add first Pokémon to the Arena</p>
            <p>Add second Pokémon to the Arena</p>
          </ArenaFloor>
        )}
        {arenaPokemon.length === 1 && (
          <ArenaFloor>
            <PokeCard pokemon={arenaPokemon[0]} />
            <p>Add another Pokémon to the Arena</p>
          </ArenaFloor>
        )}
        {arenaPokemon.length === 2 && (
          <>
            <ArenaFloor>
              <PokemonWrapper animate={fightStarted}>
                <PokeCard pokemon={arenaPokemon[0]} />
              </PokemonWrapper>
              <PokemonWrapper animate={fightStarted} second={true}>
                <PokeCard pokemon={arenaPokemon[1]} />
              </PokemonWrapper>
            </ArenaFloor>
            <FightButton onClick={handleFight}>Fight</FightButton>
          </>
        )}
      </ArenaBasic>
    );
  } else {
    return (
      <ArenaBasic>
        <ArenaFloor>
          <PokeCard pokemon={arenaPokemon[0]} />
        </ArenaFloor>
        <FightButton onClick={handleResetArenaFight}>Reset Arena</FightButton>
      </ArenaBasic>
    );
  }
};

export default Arena;
