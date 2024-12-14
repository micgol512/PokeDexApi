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
  const mergePokes = apiPokes.map((apiPoke) => {
    const match = localPokes.find((localPoke) => localPoke.id === apiPoke.id);
    return match ? { ...apiPoke, ...match } : apiPoke;
  });
  return mergePokes;
};

export const sortPokesByKey = (pokes, key, ascending = true) => {
  return pokes.sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};
