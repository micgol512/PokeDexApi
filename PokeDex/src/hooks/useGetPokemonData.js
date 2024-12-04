import { useEffect, useState } from "react";
import { removeNullValues } from "../services/functions.js";
// import { API_URL, LOCAL_URL } from "../services/links";

const useGetPokemonData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [pokemonsURL, setPokemonsURL] = useState([]);
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
      // console.log("Pobieranie Danych o pokemonach");

      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setPokemonsURL(data.results);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
    const fetchPokes = async (_url) => {
      // console.log("Pobieranie szczegółów dla: ", _url);

      try {
        const resp = await fetch(_url);
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

          images: removeNullValues(data.sprites),
        };
        console.log("PokeData:", pokeData);

        setPokemons((p) => {
          if (p.length < 15) return [...p, pokeData];
          return [pokeData];
        });
      } catch (e) {
        setError(e);
      }
    };
    // setPokemons(() => []);
    pokemonsURL.map(({ url }) => fetchPokes(url));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { pokemons, isLoading, error };
};

export default useGetPokemonData;
