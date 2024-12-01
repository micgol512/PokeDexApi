/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import Wrapper from "./Wrapper";
import { useNavigate, useParams } from "react-router-dom";
const PokeDexBasic = styled.div`
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  width: 400px;
  height: 300px;
  background: transparent url("../../src/images/PokeDex_show.png") no-repeat
    center / contain;
  z-index: 5;
`;
const PokeImage = styled.img`
  position: absolute;
  top: calc(50% - 60px);
  left: calc(50% - 165px);
  width: 130px;
  height: 90px;
  background-color: #00ff0d;
  object-fit: contain;
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
  ${({ type }) => {
    if (type === "name")
      return css`
        top: calc(50% - 45px);
        left: calc(50% + 45px);
        font-size: 1rem;
      `;
    if (type === "ability")
      return css`
        top: calc(50% - 25px);
        left: calc(50% + 45px);
      `;
    if (type === "weight")
      return css`
        top: calc(50% + 103px);
        left: calc(50% + 115px);
      `;
    if (type === "height")
      return css`
        top: calc(50% + 103px);
        left: calc(50% + 45px);
      `;
    if (type === "base experience")
      return css`
        display: flex;
        top: calc(50% + 100px);
        left: calc(50% - 148px);
        font-size: 0.5rem;
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
  return (
    <>
      something
      <Wrapper full onClick={() => navigate(-1)}>
        <Wrapper
          styles={{
            position: "relative",
            width: "100%",
            height: "200px",
          }}
        >
          <PokeDexBasic onClick={(e) => e.defaultPrevented()} />
          <PokeImage
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          />
          <PokeStrings type={"name"}>Crabominable ID:{id}</PokeStrings>
          <PokeStrings type={"ability"}>Fast Attack</PokeStrings>
          <PokeStrings type={"height"}>15</PokeStrings>
          <PokeStrings type={"weight"}>34</PokeStrings>
          <PokeStrings type={"base experience"}>34</PokeStrings>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default PokeDetails;
