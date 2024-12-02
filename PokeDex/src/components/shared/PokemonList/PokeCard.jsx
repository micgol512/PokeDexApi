/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BaseCard = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.bg,
  color: theme.colors.color,
}));

const PokeCard = ({ pokemon }) => {
  console.log("Poke card", pokemon);
  const navigate = useNavigate();

  return (
    <BaseCard onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
      {pokemon.name}
    </BaseCard>
  );
};

export default PokeCard;
