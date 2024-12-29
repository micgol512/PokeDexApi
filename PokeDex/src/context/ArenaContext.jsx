import { enqueueSnackbar } from "notistack";
import { createContext, useState } from "react";

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
  const isInArena = (id) => arenaPokemon.some((p) => p.id === id);
  return (
    <ArenaContext.Provider
      value={{ arenaPokemon, pushToArena, popFromArena, isInArena }}
    >
      {children}
    </ArenaContext.Provider>
  );
};
export { ArenaContext, ArenaProvider };
