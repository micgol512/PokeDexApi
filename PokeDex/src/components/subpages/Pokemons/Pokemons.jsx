import { useContext } from "react";
import { ArenaContext } from "../../../context/ArenaContext";

import StylButton from "../../shared/StylButton";

const Pokemons = () => {
  const { pushToArena, popFromArena } = useContext(ArenaContext);
  return (
    <div>
      Pokemons
      <StylButton onClick={popFromArena}>Decrase</StylButton>
      <StylButton onClick={pushToArena}>Incrase</StylButton>
    </div>
  );
};

export default Pokemons;
