/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { SnackbarProvider } from "notistack";
import { ArenaProvider } from "./context/ArenaContext";
import { LoginProvider } from "./context/LoginContext";
import Layout from "./components/layout/Layout";
import "./App.css";

//Set theme
const lightTheme = {
  colors: {
    color: "#0c0c0c",
    focusColor: "#ffcc00",
    hoverColor: "#ffcc00",
    bg: "#fcfcfc",
    focusBg: "#cc0000",
    hoverBg: "#cc0000",
    border: "#3b4cca",
    placeholder: "#3b4cca94",
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
};
const darkTheme = {
  colors: {
    background: "#121212",
    text: "#fff",
    primary: "#90caf9",
    secondary: "#f48fb1",
  },
  typography: {
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
};

function App() {
  return (
    <SnackbarProvider
      dense
      preventDuplicate
      maxSnack={2}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <LoginProvider>
        <ArenaProvider>
          <ThemeProvider theme={lightTheme}>
            <Layout>
              <Outlet />
            </Layout>
          </ThemeProvider>
        </ArenaProvider>
      </LoginProvider>
    </SnackbarProvider>
  );
}

export default App;
