import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Arena,
  Edit,
  Favorites,
  Home,
  Login,
  NotLogged,
  Pokemons,
  Ranking,
  Register,
} from "./components/subpages/";
import PokeDetails from "./components/shared/PokeDetails.jsx";
import { LoggedRoute, NotLoggedRoute } from "./components/RouteWrappers/";

const router = createBrowserRouter(
  [
    {
      element: <App />,
      path: "/",
      children: [
        { element: <Home />, path: "*" },
        { element: <Home />, path: "/" },
        {
          element: (
            <LoggedRoute>
              <NotLogged />
            </LoggedRoute>
          ),
          path: "/notlogged",
        },
        {
          element: (
            <LoggedRoute>
              <Login />
            </LoggedRoute>
          ),
          path: "/login",
        },
        {
          element: (
            <LoggedRoute>
              <Register />
            </LoggedRoute>
          ),
          path: "/register",
        },
        {
          element: <Pokemons />,
          path: "/pokemon",
          children: [{ element: <PokeDetails />, path: "/pokemon/:id" }],
        },

        {
          element: (
            <NotLoggedRoute>
              <Favorites />
            </NotLoggedRoute>
          ),
          path: "/favorites",
        },
        {
          element: (
            <NotLoggedRoute>
              <Arena />
            </NotLoggedRoute>
          ),
          path: "/arena",
        },
        {
          element: (
            <NotLoggedRoute>
              <Ranking />
            </NotLoggedRoute>
          ),
          path: "/ranking",
        },
        {
          element: (
            <NotLoggedRoute>
              <Edit />
            </NotLoggedRoute>
          ),
          path: "/edit",
        },

        // { element: <ListElementsDetails />, path: "/summary/:id" },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  </StrictMode>
);
