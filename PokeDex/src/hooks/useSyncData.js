import { useContext } from "react";
import { LoginContext, PokemonsListContext } from "../context";
import { mergePokemon } from "../services/functions";
import { LOCAL_URL } from "../services/links";

const useSyncData = () => {
  const { setPokemonsList } = useContext(PokemonsListContext);
  const { isLogged } = useContext(LoginContext);

  const syncData = async () => {
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
  };

  return { syncData };
};

export default useSyncData;
