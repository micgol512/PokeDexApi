/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BaseCard = styled.div(({ theme }) => ({
  display: "flex",
  flexFlow: "column nowrap",
  backgroundColor: theme.colors.bg,
  color: theme.colors.color,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "0.5rem",
  cursor: "pointer",
  width: "auto",
  height: "100px",
  padding: "5px",
  transition: "background-color 0.3s, transform 0.2s",
  "&:hover": {
    transform: "scale(1.1)",
  },
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
