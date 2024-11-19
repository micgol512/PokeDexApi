/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Theme = createContext();

const basicThemeStyles = {
  light: {
    backgroundColor: "#f5f5f5",
    color: "#1f1f1f",
    borderColor: "#1f1f1f",
    boxShadow: "2px 2px 5px #1f1f1f",
  },
  dark: {
    backgroundColor: "#1f1f1f",
    color: "#f5f5f5",
    borderColor: "#f5f5f5",
    boxShadow: "2px 2px 5px #f5f5f5",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const currentTheme = basicThemeStyles[theme];

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Theme.Provider value={{ theme, setTheme, toggleTheme, themeStyles: currentTheme }}>
      {children}
    </Theme.Provider>
  );
};
