/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { enqueueSnackbar } from "notistack";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import StadiumIcon from "@mui/icons-material/Stadium";

import { ArenaContext, LoginContext } from "../../context";

const Shake = keyframes` 
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;
const ArenaActiveIcon = styled(StadiumIcon)`
  color: ${({ theme }) => theme.colors.border};
  &:hover {
    animation: ${Shake} 500ms cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  }
`;
const ArenaInactiveIcon = styled(StadiumOutlinedIcon)`
  color: ${({ theme }) => theme.colors.border};
  &:hover {
    animation: ${Shake} 500ms cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  }
`;

const ArenaBtn = ({ pokemon }) => {
  const { isLogged } = useContext(LoginContext);

  const { pushToArena, popFromArena, isInArena } = useContext(ArenaContext);

  const toggleArena = (e) => {
    e.stopPropagation();
    if (!isLogged) {
      enqueueSnackbar(`Feature available for logged-in users only.`, {
        variant: "error",
      });
      return;
    }
    !isInArena(pokemon.id) ? pushToArena(pokemon) : popFromArena(pokemon);
  };

  return isInArena(pokemon.id) ? (
    <ArenaActiveIcon onClick={toggleArena} />
  ) : (
    <ArenaInactiveIcon onClick={toggleArena} />
  );
};

export default ArenaBtn;
