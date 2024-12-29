import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled, { keyframes } from "styled-components";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { enqueueSnackbar } from "notistack";
import useUpdatePokemonStatus from "../../hooks/useUpdateStatus";

import useSyncData from "../../hooks/useSyncData";

const PulseHeart = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.15); }
100% { transform: scale(1); }
`;

const FavoriteInactiveIcon = styled(FavoriteBorderIcon)`
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    animation: ${PulseHeart} 250ms ease-in-out infinite;
  }
`;
const FavoriteActiveIcon = styled(FavoriteIcon)`
  color: red;
  &:hover {
    animation: ${PulseHeart} 1500ms ease-in-out infinite;
  }
`;

// eslint-disable-next-line react/prop-types
const FavoriteBtn = ({ isFavorites = false, id }) => {
  const [isFavorite, setIsFavorite] = useState(isFavorites);
  const { isLogged } = useContext(LoginContext);
  // const { syncData } = useSyncData();
  const updateStatus = useUpdatePokemonStatus();
  const { syncData } = useSyncData();
  // const handleClick = () => {
  //   updateStatus(id, status);
  // };

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!isLogged) {
      enqueueSnackbar(`Feature available for logged-in users only.`, {
        variant: "error",
      });
      return;
    }
    await updateStatus(id, { isFavorites: !isFavorite });
    setIsFavorite(!isFavorite);
    syncData();
  };

  return isFavorite ? (
    <FavoriteActiveIcon onClick={toggleFavorite} />
  ) : (
    <FavoriteInactiveIcon onClick={toggleFavorite} />
  );
};

export default FavoriteBtn;
