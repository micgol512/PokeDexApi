export const extractUrls = (obj) => {
  let urls = [];
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      // Rekurencja, jeśli wartość jest obiektem
      urls = urls.concat(extractUrls(obj[key]));
    } else if (typeof obj[key] === "string" && obj[key].startsWith("http")) {
      // Dodaj URL do tablicy, jeśli jest stringiem zaczynającym się od "http"
      urls.push(obj[key]);
    }
  }
  return urls;
};
