/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { firstUpper } from "../../services/functions";
import { ArenaBtn, FavoriteBtn, Wrapper } from "./";

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
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: ${theme.colors.bg};
    color: ${theme.colors.color};
    border: 1px solid ${theme.colors.border};
    border-radius: 0.5rem;
    cursor: pointer;
    width: auto;
    padding: ${({ size }) => (size === "large" ? "2rem" : "1rem")};
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
  width: ${({ size }) => (size === "large" ? "150px" : "100px")};
  height: auto;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.main};
`;

const PokeCard = ({ pokemon, size, forEdit }) => {
  const navigate = useNavigate();

  return (
    <BaseCard
      size={size}
      onClick={() => navigate(`/${forEdit ? "edit/" : ""}${pokemon.id}`)}
    >
      <StyledImg size={size} src={pokemon.image} alt={pokemon.name} />
      {firstUpper(pokemon.name)}
      {!forEdit && (
        <Wrapper styles={{ flexDirection: "row" }}>
          <FavoriteBtn isFavorites={pokemon?.isFavorites} id={pokemon.id} />
          <ArenaBtn pokemon={pokemon} />
        </Wrapper>
      )}
      {(pokemon?.wins || pokemon?.loses || pokemon?.draws) && (
        <Wrapper
          styles={{
            fontSize: "0.8rem",
            backgroundColor: "#00000080",
            width: "80%",
            borderRadius: "0.2rem",
            position: "absolute",
            bottom: "0px",
          }}
        >
          W:{pokemon.wins || 0} L:{pokemon.loses || 0} D:{pokemon.draws || 0}
        </Wrapper>
      )}
    </BaseCard>
  );
};

export default PokeCard;
