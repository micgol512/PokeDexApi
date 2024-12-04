/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import Wrapper from "./Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import useGetPokeByID from "../../hooks/useGetPokeByID";
const PokeDexBasic = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 200px);
  width: 400px;
  height: 300px;
  background: transparent url("../../src/images/PokeDex_show.png") no-repeat
    center / contain;
  z-index: 5;
`;
const PokeImage = styled.img`
  position: absolute;
  top: 90px;
  left: calc(50% - 165px);
  width: 130px;
  height: 90px;
  background: url("../../src/images/pokeBG.jpg");
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
  color: white;
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
        top: 245px;
        left: calc(50% - 148px);

        &::first-line: {
          color: red;
          font-size: 0.1rem;
        }
      `;
  }}
`;

const PokeStrings = ({ type, children }) => {
  if (type === "name") return <PokeString type={type}>{children}</PokeString>;
  return (
    <PokeString type={type}>
      {`${type.slice(0, 1).toUpperCase()}${type.slice(1)}`}:
      {type === "base experience" ? <br /> : ""}
      {children}
    </PokeString>
  );
};

const PokeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pokemon, isLoading, error } = useGetPokeByID(id);
  const firstUpper = (string = "none") =>
    `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
  const backPage = () => {
    navigate(-1);
  };

  if (error) return <div>{error}</div>;
  if (!isLoading) return <div>Loading...</div>;
  console.log("Details: ", pokemon.images);

  return (
    // <Wrapper full>
    <Wrapper
      full
      blur
      styles={{
        top: "110px",
        height: "calc(100vh + 150px)",
      }}
      onClick={backPage}
    >
      <PokeDexBasic onClick={(e) => e.defaultPrevented()} />
      <PokeImage src={pokemon.images?.front_default} alt={pokemon.name} />
      <PokeStrings type={"name"}>{firstUpper(pokemon.name)}</PokeStrings>
      <PokeStrings type={"ability"}>{firstUpper(pokemon.ability)}</PokeStrings>
      <PokeStrings type={"height"}>{pokemon.height}</PokeStrings>
      <PokeStrings type={"weight"}>{pokemon.weight}</PokeStrings>
      <PokeStrings type={"base experience"}>
        {pokemon.base_experience}
      </PokeStrings>
    </Wrapper>
    // </Wrapper>
  );
};

export default PokeDetails;
