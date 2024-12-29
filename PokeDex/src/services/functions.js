import { LOCAL_URL } from "./links";

export const firstUpper = (string = "none") =>
  `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

export const mergePokemon = (apiPokes, localPokes) => {
  const mergedPokes = apiPokes.map((apiPoke) => {
    const match = localPokes.find((localPoke) => localPoke.id === apiPoke.id);
    if (match) {
      if (match.isFavorites === undefined) {
        // eslint-disable-next-line no-unused-vars
        const { _isFavorites, ...rest } = apiPoke;
        return { ...rest, ...match };
      }
      return { ...apiPoke, ...match };
    }
    return apiPoke;
  });

  const localOnlyPokes = localPokes.filter(
    (localPoke) => !apiPokes.some((apiPoke) => apiPoke.id === localPoke.id)
  );
  return mergedPokes.concat(localOnlyPokes);
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
