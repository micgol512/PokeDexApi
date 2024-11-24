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
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  },
  dark: {
    colors: {
      color: "#0c0c0c",
      focusColor: "#ffcc00",
      hoverColor: "#ffcc00",
      bg: "#fcfcfc",
      focusBg: "#cc0000",
      hoverBg: "#cc0000",
      border: "#3c6aff",
      placeholder: "#3c6affcc",
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  },
};

export const ThemeProviderWrapp = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const currentTheme = basicThemeStyles[theme];

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </Theme.Provider>
  );
};
