import { useEffect, useState } from "react";
// import { API_URL, LOCAL_URL } from "../services/links";

const useGetPokemonData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch(url);
        const data = resp.json();
        setPokemons(data);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [url]);

  return { pokemons, isLoading, error };
};

export default useGetPokemonData;
