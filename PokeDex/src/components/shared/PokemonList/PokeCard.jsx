/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { firstUpper } from "../../../services/functions";
import FavoriteBtn from "../FavoriteBtn";
import ArenaBtn from "../ArenaBtn";
import Wrapper from "../Wrapper";

const rotateShadow = keyframes`
  0% {
    box-shadow: 0px -2px 2px var(--border-color);
  }
  15% {
    box-shadow: 1px -2px 2px var(--border-color);
  }
  30% {
    box-shadow: 1px 0px 2px var(--border-color);
  }
  45% {
    box-shadow: 1px 1px 2px var(--border-color);
  }
  60% {
    box-shadow: 1px 2px 2px var(--border-color);
  }
  70% {
    box-shadow: -1px 2px 2px var(--border-color);
  }
  80% {
    box-shadow: -1px 0px 2px var(--border-color);
  }
  90% {
    box-shadow: -1px -2px 2px var(--border-color);
  }
  100% {
    box-shadow: 0px -2px 2px var(--border-color);
  }
`;
const BaseCard = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: ${theme.colors.bg};
    color: ${theme.colors.color};
    border: 1px solid ${theme.colors.border};
    border-radius: 0.5rem;
    cursor: pointer;
    width: auto;
    height: 100px;
    padding: 5px;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0px 0px 2px black;
    --border-color: ${theme.colors.border};
    &:hover {
      transform: scale(1.1);
      animation: ${rotateShadow} 250ms ease-in-out infinite;
    }
  `
);

const StyledImg = styled.img`
  width: 50px;
  height: auto;
  box-shadow: 0px 0px 5px #cccccc;
  border-radius: 50%;
  background: #ccccccee;
`;
const PokeCard = ({ pokemon }) => {
  const navigate = useNavigate();
  // console.log("POKECARD: ", pokemon);

  return (
    <BaseCard onClick={() => navigate(`/${pokemon.id}`)}>
      <StyledImg src={pokemon.images.front_default} alt={pokemon.name} />
      {firstUpper(pokemon.name)}
      <Wrapper styles={{ flexDirection: "row" }}>
        <FavoriteBtn isFavorites={pokemon?.isFavorites} id={pokemon.id} />
        <ArenaBtn pokemon={pokemon} />
      </Wrapper>
    </BaseCard>
  );
};

export default PokeCard;
