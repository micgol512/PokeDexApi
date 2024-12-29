/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import Wrapper from "./Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { firstUpper } from "../../services/functions";
import { useContext } from "react";
import { PokemonsListContext } from "../../context/PokemonsListContext";
import FavoriteBtn from "./FavoriteBtn";
import ArenaBtn from "./ArenaBtn";

const PokeDexBasic = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 200px);
  width: 400px;
  height: 300px;
  background: transparent url("../../src/images/dex/PokedexBase.png") no-repeat
    center / contain;
  z-index: 5;
`;
const PokeDexBasicClose = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 200px);
  width: 400px;
  height: 300px;
  background: transparent url("../../src/images/dex/PokedexBaseClose.png")
    no-repeat center / contain;
  z-index: 5;
`;

const PokeImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "randBG",
})`
  position: absolute;
  top: 90px;
  left: calc(50% - 165px);
  width: 130px;
  height: 90px;
  background: url("../../src/images/dex/dexBG${({ randBG }) => randBG}.jpg");
  background-position: 0;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: contain;
  object-position: center;
  z-index: 4;
`;
const PokeString = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  background-color: transparent;
  color: lime;
  text-shadow: 0px 0px 1px #000;
  z-index: 5;
  font-size: 0.7rem;
  font-weight: 800;
  ${({ type }) => {
    if (type === "name")
      return css`
        top: 105px;
        left: calc(50% + 45px);
        font-size: 1rem;
      `;
    if (type === "ability")
      return css`
        top: 130px;
        left: calc(50% + 45px);
      `;
    if (type === "weight")
      return css`
        top: 253px;
        left: calc(50% + 113px);
      `;
    if (type === "height")
      return css`
        top: 253px;
        left: calc(50% + 43px);
      `;
    if (type === "base experience")
      return css`
        display: flex;
        flex-direction: column;
        top: 245px;
        left: calc(50% - 148px);
      `;
  }}
`;

const Span = styled.span`
  color: #fff;
  text-shadow: 0px 0px 1px darkred;
  font-size: 0.5rem;
`;
const PokeStrings = ({ type, children }) => (
  <PokeString onClick={(e) => e.stopPropagation()} type={type}>
    {type !== "name" && <Span>{`${firstUpper(type)}: `}</Span>}
    {children}
  </PokeString>
);
const FunctonsBtn = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  top: 5px;
  left: calc(50% + 145px);
  z-index: 5;
`;

const PokeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pokemonsList } = useContext(PokemonsListContext);
  const randBG = Math.ceil(Math.random() * 3);
  const pokemon = pokemonsList.find((poke) => poke.id === parseInt(id));

  const backPage = () => {
    navigate(-1);
  };
  if (!pokemon)
    return (
      <Wrapper
        full
        blur="true"
        styles={{
          top: "110px",
          height: "100vh",
        }}
        onClick={backPage}
      >
        <PokeDexBasicClose />
      </Wrapper>
    );

  return (
    // <Wrapper full>
    <Wrapper full onClick={backPage}>
      <PokeDexBasic onClick={(e) => e.stopPropagation()} />
      <PokeImage src={pokemon.image} alt={pokemon.name} randBG={randBG} />
      <PokeStrings type={"name"}>{firstUpper(pokemon.name)}</PokeStrings>
      <PokeStrings type={"ability"}>{firstUpper(pokemon.ability)}</PokeStrings>
      <PokeStrings type={"height"}>{pokemon.height}</PokeStrings>
      <PokeStrings type={"weight"}>{pokemon.weight}</PokeStrings>
      <PokeStrings type={"base experience"}>
        {pokemon.base_experience}
      </PokeStrings>
      <FunctonsBtn>
        <FavoriteBtn isFavorites={pokemon?.isFavorites} id={pokemon.id} />
        <ArenaBtn pokemon={pokemon} />
      </FunctonsBtn>
    </Wrapper>
    // </Wrapper>
  );
};

export default PokeDetails;
