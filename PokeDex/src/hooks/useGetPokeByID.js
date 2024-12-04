import { useEffect, useState } from "react";
import { API_URL } from "../services/links";

const useGetPokeByID = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);
  // const getPokemons = async () => {
  //   setIsLoading(true);
  //   const [apiPokesResp, localPokesResp] = await Promise.all([
  //     fetch(`${API_URL}/`),
  //     fetch(`${LOCAL_URL}/pokemons`),
  //   ]);
  //   const [apiPokes, localPokes] = await Promise.all([
  //     apiPokesResp.json(),
  //     localPokesResp.json(),
  //   ]);
  // };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      console.log("Pobieranie Danych o pokemonach");

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
          images: { ...data.sprites },
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
