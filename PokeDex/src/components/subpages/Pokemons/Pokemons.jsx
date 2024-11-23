import { useContext } from "react";
import { ArenaContext } from "../../../context/ArenaContext";
import Button from "../../shared/Button";

const Pokemons = () => {
  const { pushToArena, popFromArena } = useContext(ArenaContext);
  return (
    <div>
      Pokemons
      <Button onClick={popFromArena}>Decrase</Button>
      <Button onClick={pushToArena}>Incrase</Button>
    </div>
  );
};

export default Pokemons;
