import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { LOCAL_URL } from "../../services/links";
import { LoginContext } from "../../context/LoginContext";
import { enqueueSnackbar } from "notistack";

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

const updateFavoriteStatus = async (id, isFavorite) => {
  try {
    const response = await fetch(`${LOCAL_URL}/pokemons/${id}`);
    if (response.ok) {
      // Obiekt istnieje w bazie
      const pokemon = await response.json();
      const updatedPokemon = isFavorite
        ? { ...pokemon, isFavorites: true } // Dodaj isFavorites: true
        : { ...pokemon };

      if (!isFavorite) {
        const keys = Object.keys(pokemon);
        if (
          keys.length === 2 &&
          keys.includes("id") &&
          keys.includes("isFavorites")
        ) {
          // Usuń całego Pokémona, jeśli ma tylko `id` i `isFavorites`
          await fetch(`${LOCAL_URL}/pokemons/${id}`, { method: "DELETE" });
          enqueueSnackbar(`Pokemon #${id} removed from favorites.`, {
            variant: "info",
          });
          return;
        } else {
          delete updatedPokemon.isFavorites;
          enqueueSnackbar(`Pokemon #${id} removed from favorites.`, {
            variant: "info",
          });
        }
      }

      // Aktualizacja obiektu (PUT)
      const updateResponse = await fetch(`${LOCAL_URL}/pokemons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPokemon),
      });

      if (!updateResponse.ok) {
        throw new Error(
          `Failed to update Pokémon #${id}. Server responded with ${updateResponse.status}.`
        );
      }
      // enqueueSnackbar(
      //   isFavorite
      //     ? `Pokemon #${id} added to favorites.`
      //     : `Pokemon #${id} removed from favorites.`,
      //   { variant: "success" }
      // );
    } else if (isFavorite) {
      await fetch(`${LOCAL_URL}/pokemons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isFavorites: true }),
      });
      enqueueSnackbar(`Pokemon #${id} added to favorites.`, {
        variant: "info",
      });
    } else {
      throw new Error(`Pokémon #${id} not found.`);
    }
  } catch (error) {
    enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
  }
};

// eslint-disable-next-line react/prop-types
const FavoriteBtn = ({ isFavorites = false, id }) => {
  const [isFavorite, setIsFavorite] = useState(isFavorites);
  const { isLogged } = useContext(LoginContext);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!isLogged) {
      enqueueSnackbar(`Feature available for logged-in users only.`, {
        variant: "error",
      });
      return;
    }
    await updateFavoriteStatus(id, !isFavorite);
    setIsFavorite(!isFavorite);
  };

  return isFavorite ? (
    <FavoriteActiveIcon onClick={toggleFavorite} />
  ) : (
    <FavoriteInactiveIcon onClick={toggleFavorite} />
  );
};

export default FavoriteBtn;
