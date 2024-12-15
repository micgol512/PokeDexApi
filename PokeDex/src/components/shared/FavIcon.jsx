// // import { FavoriteOutlinedIcon } from "@mui/icons-material";
// // import { FavoriteBorderIcon } from "@mui/icons-material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { keyframes, styled } from "@mui/material";
// import { useContext, useState } from "react";
// import { LOCAL_URL } from "../../services/links";
// import { LoginContext } from "../../context/LoginContext";
// import { enqueueSnackbar } from "notistack";

// const PulseHeart = keyframes`
// 0%{
//   transform: scale(0.9);
// }
// 50%{
//   transform: scale(1.1);
// }
// 100%{
//   transform: scale(0.9);
//   }`;

// const FavFalse = styled(FavoriteBorderIcon)`
//   color: red;
//   transition: stroke 0.3s, transform 0.2s;
//   &:hover {
//     // fill: blue;
//     stroke: red;
//     animation: ${PulseHeart} 250ms ease-in-out infinite;
//   }
// `;
// const FavTrue = styled(FavoriteIcon)`
//   color: red;
//   transition: background-color 0.3s, transform 0.2s;
//   &:hover {
//     fill: gray;
//     stroke: red;
//     animation: ${PulseHeart} 3s ease-in-out infinite;
//   }
// `;

// const setFavPoke = async (id) => {
//   try {
//     const req = await fetch(`${LOCAL_URL}/pokemons/${id}`);
//     if (req.ok) {
//       const pokeData = await req.json();
//       console.log("POKEDATA:", pokeData);
//       if (!pokeData.isFavorites) {
//         fetch(`${LOCAL_URL}/pokemons/${id}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             isFavorites: true,
//           }),
//         });
//       }
//     } else {
//       fetch(`${LOCAL_URL}/pokemons`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           isFavorites: true,
//         }),
//       });
//     }
//   } catch (e) {
//     console.error(e);
//   } finally {
//     enqueueSnackbar(`Pokemon #${id} add to favourites.`, {
//       variant: "success",
//     });
//   }
// };
// const removeIsFavorite = async (id) => {
//   try {
//     // Pobierz dane dla danego pokemona
//     const response = await fetch(`${LOCAL_URL}/pokemons/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       if (response.status === 404) {
//         console.log(`Pokemon o ID ${id} nie istnieje w bazie.`);
//         return; // Nic nie robimy, jeśli nie istnieje
//       } else {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }
//     }
//     const pokemon = await response.json();

//     // Sprawdź, czy właściwość `isFavorite` istnieje
//     if (!pokemon.hasOwnProperty("isFavorites")) {
//       console.log(`Pokemon o ID ${id} nie zawiera właściwości isFavorites.`);
//       return; // Nic nie robimy, jeśli właściwość nie istnieje
//     }

//     // Jeśli Pokemon zawiera tylko `id` i `isFavorites`, usuń cały obiekt
//     const keys = Object.keys(pokemon);
//     if (
//       keys.length === 2 &&
//       keys.includes("id") &&
//       keys.includes("isFavorites")
//     ) {
//       const deleteResponse = await fetch(`${LOCAL_URL}/pokemons/${id}`, {
//         method: "DELETE",
//       });

//       if (!deleteResponse.ok) {
//         throw new Error(
//           `HTTP Error podczas usuwania: ${deleteResponse.status}`
//         );
//       }

//       console.log(`Pokemon o ID ${id} został całkowicie usunięty z bazy.`);
//       return;
//     }

//     // Jeśli Pokemon zawiera inne właściwości, usuń tylko `isFavorite`
//     const updatedPokemon = { ...pokemon };
//     delete updatedPokemon.isFavorites;

//     const updateResponse = await fetch(`${LOCAL_URL}/pokemons/${id}`, {
//       method: "PUT", // PUT nadpisuje cały obiekt
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedPokemon),
//     });

//     if (!updateResponse.ok) {
//       throw new Error(
//         `HTTP Error podczas aktualizacji: ${updateResponse.status}`
//       );
//     }

//     console.log(
//       `Właściwość isFavorite została usunięta z Pokemona o ID ${id}.`
//     );
//   } catch (error) {
//     console.error("Wystąpił błąd:", error);
//   }
// };

// // eslint-disable-next-line react/prop-types
// const FavIcon = ({ isFavorites = false, id }) => {
//   const [isFavourite, setIsFavourite] = useState(isFavorites);
//   const { isLogged } = useContext(LoginContext);
//   const handleChanger = (e) => {
//     e.stopPropagation();
//     if (isLogged) {
//       if (!isFavorites) {
//         try {
//           setFavPoke(id);
//           // fetch(`${LOCAL_URL}/pokemons/${id}`, {
//           //   method: "PUT",
//           //   headers: {
//           //     "Content-Type": "application/json",
//           //   },
//           //   body: JSON.stringify({
//           //     isFavorites: true,
//           //   }),
//           // });
//           // eslint-disable-next-line no-unused-vars
//         } catch (e) {
//           enqueueSnackbar(`Error: ${e}`, {
//             variant: "error",
//           });
//         }
//         // setIsFavourite(true);
//       } else {
//         //tu logika do usówania z favorites

//         removeIsFavorite(id);
//         // setIsFavourite(false);
//       }
//       setIsFavourite((p) => !p);
//     } else {
//       enqueueSnackbar(`Feauture for only Logged users`, { variant: "error" });
//     }
//   };
//   if (isFavourite === true) return <FavTrue onClick={handleChanger} />;
//   return <FavFalse onClick={handleChanger} />;
// };

// export default FavIcon;
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { keyframes, styled } from "@mui/material";
import { useContext, useState } from "react";
import { LOCAL_URL } from "../../services/links";
import { LoginContext } from "../../context/LoginContext";
import { enqueueSnackbar } from "notistack";

// Animacja
const PulseHeart = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.15); }
100% { transform: scale(1); }
`;

// Style ikon
const FavoriteInactiveIcon = styled(FavoriteBorderIcon)`
  color: red;
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
      // Obiekt nie istnieje, tworzę nowy
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

// Komponent
const FavIcon = ({ isFavorites = false, id }) => {
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

export default FavIcon;
