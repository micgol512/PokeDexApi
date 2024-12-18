import { useContext, useEffect, useState } from "react";
import { removeNullValues, sortPokesByKey } from "../services/functions.js";
import { PokemonsListContext } from "../context/PokemonsListContext.jsx";

const useGetPokemonData = (url) => {
  const { setIsLoading } = useContext(PokemonsListContext);
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  const fetchPokes = async (_url) => {
    try {
      const resp = await fetch(_url);
      const data = await resp.json();
      return {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        ability: data.abilities.find(({ is_hidden }) => !is_hidden)?.ability
          .name,
        images: removeNullValues(data.sprites), //choose one or make Array of images
      };
    } catch (e) {
      setError(e);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const resp = await fetch(url);
        const data = await resp.json();

        const pokemonsData = await Promise.all(
          data.results.map(({ url }) => fetchPokes(url))
        );

        setPokemons(pokemonsData.filter(Boolean));
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, setIsLoading]);

  // useEffect(() => {
  //   setPokemons((prev) => sortPokesByKey(prev, "id", true));
  // }, [pokemons]);

  return { pokemons, error };
};

export default useGetPokemonData;
