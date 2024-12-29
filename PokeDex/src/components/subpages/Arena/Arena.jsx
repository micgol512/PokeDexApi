import { useContext, useEffect, useState } from "react";
import { ArenaContext } from "../../../context/ArenaContext";
import styled, { keyframes } from "styled-components";
import PokeCard from "../../shared/PokeCard";
import Wrapper from "../../shared/Wrapper";
import useUpdatePokemonStatus from "../../../hooks/useUpdateStatus";
import { Button } from "@mui/material";

const ArenaBasic = styled.div(({ theme, randbg }) => ({
  display: "flex",
  flexFlow: "column nowrap",
  color: theme.colors.color,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "15px",
  background: `url("../../src/images/arenas/arena${randbg}.jpg") no-repeat center / cover`,
}));

const ArenaFloor = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 50px;
  & > p {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    width: 200px;
    height: 250px;
    trasform: scale(1);
  }
`;

const FightButton = styled(Button)(({ theme }) => ({
  "&&": {
    fontWeight: "bold",
    backgroundColor: theme.colors.focusColor,
    color: theme.colors.color,
    border: "none",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s, transform 0.2s, color 0.3s",
  },
  "&:hover": {
    color: theme.colors.bg,
    backgroundColor: theme.colors.hoverBg,
    transform: "scale(1.05)",
  },
}));

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
  100% { transform: translateX(50%); }
`;
const PokemonWrapper = styled.div`
  animation: ${({ animate, second }) =>
      animate ? (second ? moveToCenter : moveToCenterSecond) : "none"}
    2000ms forwards;
`;

const Arena = () => {
  const { arenaPokemon, popFromArena } = useContext(ArenaContext);
  const [fightStarted, setFightStarted] = useState(false);
  const [endFight, setEndFight] = useState(false);
  const updateStatus = useUpdatePokemonStatus();
  const randbg = Math.ceil(Math.random() * 10);
  useEffect(() => {
    setFightStarted(false);
    setEndFight(false);
    return () => {
      if (endFight) popFromArena();
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
    popFromArena();
  };
  if (!endFight) {
    return (
      <ArenaBasic randbg={randbg}>
        {arenaPokemon.length === 0 && (
          <ArenaFloor>
            <p>Add first Pokémon to the Arena</p>
            <p>Add second Pokémon to the Arena</p>
          </ArenaFloor>
        )}
        {arenaPokemon.length === 1 && (
          <ArenaFloor>
            <PokeCard pokemon={arenaPokemon[0]} size="large" />
            <p>Add another Pokémon to the Arena</p>
          </ArenaFloor>
        )}
        {arenaPokemon.length === 2 && (
          <Wrapper styles={{ gap: "20px" }}>
            <ArenaFloor>
              <PokemonWrapper animate={fightStarted}>
                <PokeCard pokemon={arenaPokemon[0]} size="large" />
              </PokemonWrapper>
              <PokemonWrapper animate={fightStarted} second={true}>
                <PokeCard pokemon={arenaPokemon[1]} size="large" />
              </PokemonWrapper>
            </ArenaFloor>
            <FightButton onClick={handleFight} variant="contained">
              Fight
            </FightButton>
          </Wrapper>
        )}
      </ArenaBasic>
    );
  } else {
    return (
      <ArenaBasic randbg={randbg}>
        <Wrapper styles={{ gap: "20px" }}>
          <ArenaFloor>
            <PokeCard pokemon={arenaPokemon[0]} size="large" />
          </ArenaFloor>
          <FightButton onClick={handleResetArenaFight}>Reset Arena</FightButton>
        </Wrapper>
      </ArenaBasic>
    );
  }
};

export default Arena;
