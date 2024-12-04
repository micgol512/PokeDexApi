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
  if (typeof obj !== "object" || obj === null) return obj; // Zwróć wartość, jeśli nie jest obiektem

  const result = Array.isArray(obj) ? [] : {}; // Zachowaj strukturę (tablica/obiekt)

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null) {
      const cleanedValue = removeNullValues(value); // Rekurencyjne czyszczenie wartości
      if (cleanedValue !== undefined) {
        // Dodaj tylko, jeśli wynik nie jest undefined
        result[key] = cleanedValue;
      }
    }
  }

  return result;
};
