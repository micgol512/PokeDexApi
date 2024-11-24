/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ArenaProvider } from "./context/ArenaContext";
import { LoginProvider } from "./context/LoginContext";
import Layout from "./components/layout/Layout";
import "./App.css";
import { ThemeProviderWrapp } from "./context/Theme";

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
          <ThemeProviderWrapp>
            <Layout>
              <Outlet />
            </Layout>
          </ThemeProviderWrapp>
        </ArenaProvider>
      </LoginProvider>
    </SnackbarProvider>
  );
}

export default App;
