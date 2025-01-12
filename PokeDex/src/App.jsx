import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Layout from "./components/layout/Layout";
import {
  ArenaProvider,
  LoginProvider,
  PokemonsListProvider,
  ThemeProviderWrapp,
} from "./context";
import "./App.css";

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
      <ArenaProvider>
        <LoginProvider>
          <PokemonsListProvider>
            <ThemeProviderWrapp>
              <Layout>
                <Outlet />
              </Layout>
            </ThemeProviderWrapp>
          </PokemonsListProvider>
        </LoginProvider>
      </ArenaProvider>
    </SnackbarProvider>
  );
}

export default App;
