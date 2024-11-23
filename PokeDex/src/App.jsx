import { Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import { LoginProvider } from "./context/LoginContext";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material";
import { ArenaProvider } from "./context/ArenaContext";

// const theme = {
//   light: {
//     bg: "#fff",
//   },
//   dark: {
//     bg: "#000",
//   },
// };
const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

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
          <ThemeProvider theme={theme}>
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
