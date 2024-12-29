import { useContext, useEffect, useState } from "react";

import { mergePokemon } from "../services/functions";
import { LOCAL_URL } from "../services/links";
import { PokemonsListContext } from "../context/PokemonsListContext";

const useSyncData = () => {
  const { setPokemonsList } = useContext(PokemonsListContext);

  const syncData = async () => {
    try {
      const response = await fetch(`${LOCAL_URL}/pokemons`);

      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon. Status: ${response.status}`);
      }
      const data = await response.json();
      setPokemonsList((p) => mergePokemon(p, data));
    } catch (err) {
      //   setError(error.message);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    syncData();
  }, []);

  return { syncData };
};

export default useSyncData;
