import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BaseCard = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.bg,
  color: theme.colors.color,
}));

const PokeCard = (pokemon) => {
  console.log(pokemon);
  const navigate = useNavigate();

  return <BaseCard onClick={() => navigate(`/pokemon/1`)}>PokeCard</BaseCard>;
};

export default PokeCard;
