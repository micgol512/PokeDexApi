import { useState, useCallback } from "react";
import { LOCAL_URL } from "../services/links";

const useRegisterNewPoke = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerNewPoke = useCallback(async (poke) => {
    setLoading(true);
    setError(null);

    try {
      const [isNameResp, isIdResp] = await Promise.all([
        fetch(`${LOCAL_URL}/pokemons?name=${poke.username}`),
        fetch(`${LOCAL_URL}/pokemons?id=${poke.id}`),
      ]);

      const [isName, isId] = await Promise.all([
        isNameResp.json(),
        isIdResp.json(),
      ]);

      if (isName.length || isId.length) {
        setError("Pokémon with this name or ID already exists.");
        setLoading(false);
        return false;
      }

      const response = await fetch(`${LOCAL_URL}/pokemons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: poke.id,
          name: poke.name,
          height: parseFloat(poke.height),
          weight: parseFloat(poke.weight),
          base_experience: parseFloat(poke.base_experience),
          ability: poke.ability,
          image: poke.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user.");
      }

      setLoading(false);
      return true;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  }, []);

  return { registerNewPoke, loading, error };
};

export default useRegisterNewPoke;
