import { createContext, useState } from "react";

const ArenaContext = createContext(0);
// eslint-disable-next-line react/prop-types
const ArenaProvider = ({ children }) => {
  const [arenaCounter, setArenaCounter] = useState(0);

  const pushToArena = () => {
    setArenaCounter((p) => (p === 2 ? 2 : p + 1));
  };
  const popFromArena = () => {
    setArenaCounter((p) => (p === 0 ? 0 : p - 1));
  };

  return (
    <ArenaContext.Provider value={{ arenaCounter, pushToArena, popFromArena }}>
      {children}
    </ArenaContext.Provider>
  );
};
export { ArenaContext, ArenaProvider };
