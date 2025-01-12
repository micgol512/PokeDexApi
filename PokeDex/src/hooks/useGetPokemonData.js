import { useContext, useEffect, useState } from "react";
import { PokemonsListContext } from "../context";

const useGetPokemonData = (url) => {
  const { setIsLoading } = useContext(PokemonsListContext);
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  const fetchPoke = async (_url) => {
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
        image: data.sprites.front_default,
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
          data.results.map(({ url }) => fetchPoke(url))
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

  return { pokemons, error };
};

export default useGetPokemonData;
