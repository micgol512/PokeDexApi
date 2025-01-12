import { createContext, useState } from "react";
const PokemonsListContext = createContext();
// eslint-disable-next-line react/prop-types
const PokemonsListProvider = ({ children }) => {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <PokemonsListContext.Provider
      value={{ pokemonsList, setPokemonsList, isLoading, setIsLoading }}
    >
      {children}
    </PokemonsListContext.Provider>
  );
};

export { PokemonsListContext, PokemonsListProvider };
