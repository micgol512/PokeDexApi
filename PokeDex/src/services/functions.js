import { LOCAL_URL } from "./links";

export const firstUpper = (string = "none") =>
  `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

export const extractUrls = (obj) => {
  let urls = [];
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      urls = urls.concat(extractUrls(obj[key]));
    } else if (typeof obj[key] === "string" && obj[key].startsWith("http")) {
      urls.push(obj[key]);
    }
  }
  return urls;
};

export const removeNullValues = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  const result = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null) {
      const cleanedValue = removeNullValues(value);
      if (cleanedValue !== undefined) {
        result[key] = cleanedValue;
      }
    }
  }

  return result;
};

export const mergePokemon = (apiPokes, localPokes) => {
  const mergedPokes = apiPokes.map((apiPoke) => {
    const match = localPokes.find((localPoke) => localPoke.id === apiPoke.id);
    return match ? { ...apiPoke, ...match } : apiPoke;
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
  console.log("updateLocalDatabase", id, updatedData.id);

  try {
    const response = await fetch(`${LOCAL_URL}/pokemons/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

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
