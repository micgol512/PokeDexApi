/* eslint-disable no-unused-vars */
import { LOCAL_URL } from "./links.js";

export const firstUpper = (string = "none") =>
  `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

export const mergePokemon = (apiPokes, localPokes) => {
  const localMap = new Map(localPokes.map((poke) => [poke.id, poke]));

  const merged = apiPokes.map((apiPoke) => {
    const localPoke = localMap.get(apiPoke.id);
    if (localPoke) {
      const { isFavorites, ...filteredApiPoke } = apiPoke;
      return { ...filteredApiPoke, ...localPoke };
    }
    const { isFavorites, ...filteredApiPoke } = apiPoke;
    return { ...filteredApiPoke };
  });

  const additionalPokes = localPokes.filter(
    (localPoke) => !apiPokes.some((apiPoke) => apiPoke.id === localPoke.id)
  );
  return merged.concat(additionalPokes);
};

export const sortPokesByKey = (pokes, key, ascending = true) =>
  pokes.sort((a, b) => {
    let aValue = parseInt(a[key]) || 0;
    let bValue = parseInt(b[key]) || 0;
    if (key === "name") {
      aValue = a[key].toLowerCase();
      bValue = b[key].toLowerCase();
    }
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });

export const updateLocalDatabase = async (id, updatedData) => {
  try {
    const response = await fetch(`${LOCAL_URL}/pokemons/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.status === 404) {
      const createResponse = await fetch(`${LOCAL_URL}/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updatedData }),
      });

      if (!createResponse.ok) {
        throw new Error("Failed to create new pokemon in local database");
      }

      const result = await createResponse.json();
      return result;
    }

    if (!response.ok) {
      throw new Error("Failed to update local database");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating local database:", error);
    return null;
  }
};
