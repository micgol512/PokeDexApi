import { useEffect, useState } from "react";
import { API_URL } from "../services/links";

const useGetPokeByID = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await fetch(`${API_URL}/pokemon/${id}`);
        const data = await resp.json();
        const pokeData = {
          id: data.id,
          name: data.name,
          base_experience: data.base_experience,
          height: data.height,
          weight: data.weight,
          ability: data.abilities.filter(
            ({ is_hidden }) => is_hidden === false
          )[0].ability.name,
          image: data.sprites.front_default,
        };
        setPokemon(pokeData);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, [id]);

  return { pokemon, isLoading, error };
};

export default useGetPokeByID;
