/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Spinner from "./components/Spinner.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./components/AuthProvider.jsx";

const CssBaseline = lazy(() => import("@mui/material/CssBaseline"));
const MainLayout = lazy(() => import("./layouts/MainLayout.jsx"));

const Home = lazy(() => import("./pages/Home.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const SignOut = lazy(() => import("./pages/SignOut.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-out",
        element: <SignOut />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
      },
    ],
  },
]);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <HelmetProvider>
              <RouterProvider router={router}></RouterProvider>
            </HelmetProvider>
            <CssBaseline />
          </LocalizationProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </Suspense>
  </React.StrictMode>
);
