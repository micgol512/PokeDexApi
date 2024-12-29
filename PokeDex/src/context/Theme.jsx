/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";

const Theme = createContext();

const basicThemeStyles = {
  light: {
    colors: {
      color: "#0c0c0c",
      focusColor: "#ffcc00",
      hoverColor: "#ffcc00",
      bg: "#fcfcfc",
      focusBg: "#cc0000",
      hoverBg: "#cc0000",
      border: "#3c6aff",
      placeholder: "#3c6affcc",
      error: "#ff0000",
      primary: "#ff0000",
      main: "#ffffffcc",
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  },
  dark: {
    colors: {
      color: "blue",
      focusColor: "#ffcc00",
      hoverColor: "#ffcc00",
      bg: "#cfcfcf",
      focusBg: "#cc0000",
      hoverBg: "#cc0000",
      border: "#0077ff",
      placeholder: "#3c6affcc",
      error: "#ff0000",
      primary: "#0077ff",
      main: "#ffffffcc",
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  },
};

const ThemeProviderWrapp = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const currentTheme = basicThemeStyles[theme];

  const toggleTheme = () => {
    setTheme((p) => (p === "light" ? "dark" : "light"));
  };

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </Theme.Provider>
  );
};
export { Theme, ThemeProviderWrapp };
