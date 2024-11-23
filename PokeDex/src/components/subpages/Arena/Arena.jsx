import { useContext } from "react";
import { ArenaContext } from "../../../context/ArenaContext";

const Arena = () => {
  const { arenaCounter } = useContext(ArenaContext);

  if (arenaCounter === 0) return <div>List of Pokes in Arena is empty.</div>;

  return (
    <div>
      In Arena {arenaCounter === 1 ? "is" : "are"} {arenaCounter} Poke
      {arenaCounter === 1 ? "" : "s"}!!!
    </div>
  );
};

export default Arena;
