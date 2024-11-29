import { useContext } from "react";
import { ArenaContext } from "../../../context/ArenaContext";

import StylButton from "../../shared/StylButton";
import { Link, Outlet } from "react-router-dom";

const Pokemons = () => {
  const { pushToArena, popFromArena } = useContext(ArenaContext);
  return (
    <div>
      Pokemons
      <StylButton onClick={popFromArena}>Decrase</StylButton>
      <StylButton onClick={pushToArena}>Incrase</StylButton>
      <Link to={"/pokemon/1"}>POkemon 1</Link>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Pokemons;
