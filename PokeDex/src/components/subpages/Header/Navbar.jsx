/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import Wrapper from "../../shared/Wrapper";
import StyledButton from "../../shared/StyledButton";
import { Badge } from "@mui/material";
import { useContext } from "react";
import { ArenaContext } from "../../../context/ArenaContext";
// import { Badge } from "@mui/material";

const routes = [
  { name: "Pokemons", id: 1, path: "pokemon" },
  { name: "Favorites", id: 2, path: "favorites" },
  { name: "Arena", id: 3, path: "arena" },
  { name: "Ranking", id: 4, path: "ranking" },
  { name: "Edit", id: 5, path: "edit" },
];

const NavButton = ({ name, path }) => (
  <NavLink to={path}>
    {({ isActive }) => <StyledButton isActive={isActive}>{name}</StyledButton>}
  </NavLink>
);

const Navbar = () => {
  const { arenaPokemon } = useContext(ArenaContext);

  return (
    <Wrapper styles={{ flexFlow: "row nowrap" }}>
      {routes.map(({ name, id, path }) => {
        if (path === "arena")
          return (
            <Badge
              key={`menu-badged-btn-${id}`}
              badgeContent={arenaPokemon.length}
              color={"info"}
              max={2}
            >
              <NavButton key={`menu-btn-${id}`} name={name} path={path} />
            </Badge>
          );
        return <NavButton key={`menu-btn-${id}`} name={name} path={path} />;
      })}
    </Wrapper>
  );
};

export { Navbar, NavButton };
