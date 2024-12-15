/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import Wrapper from "./Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import useGetPokeByID from "../../hooks/useGetPokeByID";
import { firstUpper } from "../../services/functions";
import { useContext, useEffect } from "react";
import { PokemonsListContext } from "../../context/PokemonsListContext";
import FavIcon from "./FavIcon";
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
const NavBtn = styled.div`
  position: absolute;
  top: 228px;
  color: red;
  font-weight: 800;
  cursor: pointer;
  z-index: 5;
  ${({ nav }) => {
    if (nav === "-")
      return css`
        left: calc(50% - 65px);
      `;
    else
      return css`
        left: calc(50% - 35px);
      `;
  }}
  &:before {
    content: "${({ nav }) => {
      if (nav === "-") return css`‹‹`;
      return css`››`;
    }}";
  }
`;
const PokeStrings = ({ type, children }) => (
  <PokeString onClick={(e) => e.stopPropagation()} type={type}>
    {type !== "name" && <Span>{`${firstUpper(type)}: `}</Span>}
    {children}
  </PokeString>
);

const PokeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pokemon, isLoading, error } = useGetPokeByID(id);
  const { pokemonsList } = useContext(PokemonsListContext);
  const randBG = Math.ceil(Math.random() * 3);

  const backPage = () => {
    navigate(`/pokemon`);
  };

  const prevPoke = () => {
    if (id > 1) navigate(`/pokemon/${id - 1}`);
  };
  const nextPoke = () => {
    if (id < 151) navigate(`/pokemon/${parseInt(id) + 1}`);
  };
  const getPokeByID = (_id) => pokemonsList.find((poke) => poke.id === _id);
  // console.log(getPokeByID(id));
  useEffect(() => {
    console.log("Pokemon ID:", getPokeByID(parseInt(id)));
  }, []);
  if (error) return <div>{error}</div>;
  if (!isLoading) return <div>Loading...</div>;
  // console.log("Details: ", pokemon.images);

  return (
    // <Wrapper full>
    <Wrapper
      full
      blur="true"
      styles={{
        top: "110px",
        height: "100vh",
      }}
      onClick={backPage}
    >
      <PokeDexBasic onClick={(e) => e.stopPropagation()} />
      <PokeImage
        src={pokemon.images?.front_default}
        alt={pokemon.name}
        randBG={randBG}
      />
      <PokeStrings type={"name"}>{firstUpper(pokemon.name)}</PokeStrings>
      <PokeStrings type={"ability"}>{firstUpper(pokemon.ability)}</PokeStrings>
      <PokeStrings type={"height"}>{pokemon.height}</PokeStrings>
      <PokeStrings type={"weight"}>{pokemon.weight}</PokeStrings>
      <PokeStrings type={"base experience"}>
        {pokemon.base_experience}
      </PokeStrings>
      <NavBtn
        onClick={(e) => {
          e.stopPropagation();
          prevPoke();
        }}
        nav="-"
      />
      <NavBtn
        onClick={(e) => {
          e.stopPropagation();
          nextPoke();
        }}
        nav="+"
      />
      {/* <NavBtn type="+" /> */}
      <FavIcon
        isFavorites={getPokeByID(parseInt(id)).isFavorites}
        id={pokemon.id}
      />
    </Wrapper>
    // </Wrapper>
  );
};

export default PokeDetails;
