/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import Wrapper from "../../shared/Wrapper";
import Button from "../../shared/Button";

const routes = [
  { name: "Home", id: 1, path: "/" },
  { name: "Login", id: 2, path: "login" },
  { name: "Register", id: 3, path: "register" },
];

const NavButton = ({ name, path }) => (
  <NavLink to={path}>
    {({ isActive }) => <Button isActive={isActive}>{name}</Button>}
  </NavLink>
);

const Navbar = () => {
  return (
    <Wrapper styles={{ flexFlow: "row nowrap" }}>
      {routes.map(({ name, id, path }) => (
        <NavButton key={`menu-btn-${id}`} name={name} path={path} />
      ))}
    </Wrapper>
  );
};

export default Navbar;
