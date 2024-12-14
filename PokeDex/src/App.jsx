/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ArenaProvider } from "./context/ArenaContext";
import { LoginProvider } from "./context/LoginContext";
import Layout from "./components/layout/Layout";
import "./App.css";
import { ThemeProviderWrapp } from "./context/Theme";
import { PageProvider } from "./context/PageContext";
import { PokemonsListProvider } from "./context/PokemonsListContext";

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
      <PokemonsListProvider>
        <LoginProvider>
          <ArenaProvider>
            <ThemeProviderWrapp>
              <PageProvider>
                <Layout>
                  <Outlet />
                </Layout>
              </PageProvider>
            </ThemeProviderWrapp>
          </ArenaProvider>
        </LoginProvider>
      </PokemonsListProvider>
    </SnackbarProvider>
  );
}

export default App;
