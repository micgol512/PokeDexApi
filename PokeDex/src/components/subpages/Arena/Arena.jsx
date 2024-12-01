import { useContext } from "react";
import { ArenaContext } from "../../../context/ArenaContext";

const Arena = () => {
  const { arenaPokemon } = useContext(ArenaContext);

  if (arenaPokemon.length === 0)
    return <div>List of Pokes in Arena is empty.</div>;

  return (
    <div>
      In Arena {arenaPokemon.length === 1 ? "is" : "are"} {arenaPokemon.length}{" "}
      Poke
      {arenaPokemon.length === 1 ? "" : "s"}!!! Sprawdzam {arenaPokemon[1]}
    </div>
  );
};

export default Arena;
