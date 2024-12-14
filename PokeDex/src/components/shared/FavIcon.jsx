// import { FavoriteOutlinedIcon } from "@mui/icons-material";
// import { FavoriteBorderIcon } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { keyframes, styled } from "@mui/material";
import { useState } from "react";
import { LOCAL_URL } from "../../services/links";

const PulseHeart = keyframes`
0%{
  transform: scale(0.9);
}
50%{
  transform: scale(1.1);
}
100%{
  transform: scale(0.9);
  }`;

const FavFalse = styled(FavoriteBorderIcon)`
  color: red;
  transition: stroke 0.3s, transform 0.2s;
  &:hover {
    // fill: blue;
    stroke: red;
    animation: ${PulseHeart} 250ms ease-in-out infinite;
  }
`;
const FavTrue = styled(FavoriteIcon)`
  color: red;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    fill: gray;
    stroke: red;
    animation: ${PulseHeart} 3s ease-in-out infinite;
  }
`;

const setFavPoke = async (id) => {
  try {
    const req = await fetch(`${LOCAL_URL}/pokemons/${id}`);
    if (req.ok) {
      console.log("LOG: ", req.ok);
      fetch(`${LOCAL_URL}/pokemons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFavorites: true,
        }),
      });
    } else {
      fetch(`${LOCAL_URL}/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          isFavorites: true,
        }),
      });
    }
  } catch (error) {}
};

// eslint-disable-next-line react/prop-types
const FavIcon = ({ isFavorites = false, id }) => {
  const [isFavourite, setIsFavourite] = useState(isFavorites);
  const handleChanger = (e) => {
    e.stopPropagation();
    console.log(
      `Pokeomna #${id} ${isFavourite ? "usunięto z" : "dodano do"} ulubionych.`
    );
    if (!isFavorites) {
      try {
        setFavPoke(id);
        // fetch(`${LOCAL_URL}/pokemons/${id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     isFavorites: true,
        //   }),
        // });
      } catch (error) {
        fetch(`${LOCAL_URL}/pokemons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            isFavorites: true,
          }),
        });
      }
    }
    setIsFavourite((p) => !p);
  };
  if (isFavourite === true) return <FavTrue onClick={handleChanger} />;
  return <FavFalse onClick={handleChanger} />;
};

export default FavIcon;
