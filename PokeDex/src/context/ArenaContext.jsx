import { enqueueSnackbar } from "notistack";
import { createContext, useState } from "react";
import { LOCAL_URL } from "../services/links";

const ArenaContext = createContext(0);
// eslint-disable-next-line react/prop-types
const ArenaProvider = ({ children }) => {
  const [arenaPokemon, setArenaPokemon] = useState([]);

  const pushToArena = (id) => {
    setArenaPokemon((p) => {
      if (p.includes(id)) {
        enqueueSnackbar("Pokémon is alredy in arena", { variant: "warning" });
      } else if (p.length > 1) {
        enqueueSnackbar("Arena is full.", { variant: "error" });
      } else {
        enqueueSnackbar("Pokémon add to arena", { variant: "success" });
        return [...p, id];
      }
      return [...p];
    });
  };
  const popFromArena = (id) => {
    setArenaPokemon((p) => {
      if (id === undefined) {
        return [];
      }
      if (p.indexOf(id) === -1) {
        enqueueSnackbar("Pokémon isn't in arena", { variant: "info" });
        return [...p];
      } else {
        enqueueSnackbar("Pokémon remove from arena", { variant: "warning" });
        return p.filter((pokeId) => pokeId !== id);
      }
    });
  };
  const updateArenaWinner = async (id) => {
    try {
      const response = await fetch(`${LOCAL_URL}/pokemons/${id}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Pokémon #${id}. Status: ${response.status}`
        );
      }
      const data = await response.json();
      setArenaPokemon((p) => [{ ...p[0], ...data }]);
      enqueueSnackbar(`Pokémon #${id} updated.`, {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar(`Error: ${e.message}`, { variant: "error" });
    }
  };

  const isInArena = (id) => arenaPokemon.some((p) => p.id === id);
  return (
    <ArenaContext.Provider
      value={{
        arenaPokemon,
        pushToArena,
        popFromArena,
        updateArenaWinner,
        isInArena,
      }}
    >
      {children}
    </ArenaContext.Provider>
  );
};
export { ArenaContext, ArenaProvider };
