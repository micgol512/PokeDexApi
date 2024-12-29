import { useCallback, useContext, useEffect } from "react";

import { mergePokemon } from "../services/functions";
import { LOCAL_URL } from "../services/links";
import { PokemonsListContext } from "../context/PokemonsListContext";
import { LoginContext } from "../context/LoginContext";

const useSyncData = () => {
  const { setPokemonsList } = useContext(PokemonsListContext);
  const { isLogged } = useContext(LoginContext);
  const syncData = useCallback(async () => {
    try {
      const response = await fetch(`${LOCAL_URL}/pokemons`);

      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon. Status: ${response.status}`);
      }
      const data = await response.json();
      isLogged && setPokemonsList((p) => mergePokemon(p, data));
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }, []);

  useEffect(() => {
    syncData();
  }, []);

  return { syncData };
};

export default useSyncData;
