import { enqueueSnackbar } from "notistack";
import { LOCAL_URL } from "../services/links";

const useUpdatePokemonStatus = () => {
  const updateStatus = async (id, statusUpdates) => {
    try {
      const response = await fetch(`${LOCAL_URL}/pokemons/${id}`);
      if (response.ok) {
        const pokemon = await response.json();
        let updatedPokemon = { ...pokemon };

        if (statusUpdates.isFavorites === true) {
          if (!pokemon.isFavorites) {
            updatedPokemon.isFavorites = true;
            enqueueSnackbar(`Pokémon #${id} add to favorites.`, {
              variant: "info",
            });
          } else {
            enqueueSnackbar(`Pokémon #${id} is already a favorite.`, {
              variant: "info",
            });
            return;
          }
        } else if (statusUpdates.isFavorites === false) {
          if (pokemon.isFavorites) {
            const keys = Object.keys(pokemon);
            if (
              keys.length === 2 &&
              keys.includes("id") &&
              keys.includes("isFavorites")
            ) {
              await fetch(`${LOCAL_URL}/pokemons/${id}`, { method: "DELETE" });
              enqueueSnackbar(`Pokémon #${id} removed from favorites.`, {
                variant: "info",
              });
              return;
            } else {
              delete updatedPokemon.isFavorites;
              enqueueSnackbar(`Pokémon #${id} removed from favorites.`, {
                variant: "info",
              });
            }
          } else {
            enqueueSnackbar(`Pokémon #${id} is not a favorite.`, {
              variant: "info",
            });
            return;
          }
        } else {
          Object.keys(statusUpdates).forEach((key) => {
            if (key !== "isFavorites") {
              updatedPokemon[key] = (pokemon[key] || 0) + statusUpdates[key];
            }
          });
        }

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
      } else {
        if (
          statusUpdates.isFavorites === true ||
          Object.keys(statusUpdates).some((key) => key !== "isFavorites")
        ) {
          const newPokemon = { id, ...statusUpdates };
          await fetch(`${LOCAL_URL}/pokemons`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPokemon),
          });
          enqueueSnackbar(
            `Pokémon #${id} ${
              statusUpdates.isFavorites ? "add to favorites." : "updated."
            }`,
            {
              variant: "info",
            }
          );
        } else {
          enqueueSnackbar(
            `Pokémon #${id} not found and no valid status to create.`,
            {
              variant: "info",
            }
          );
        }
      }
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  return { updateStatus };
};

export default useUpdatePokemonStatus;
