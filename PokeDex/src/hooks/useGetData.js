import { useState } from "react";

const API_URL = "";
const LOCAL_URL = "";

const useGetData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  return { pokemons, isLoading };
};

export default useGetData;
