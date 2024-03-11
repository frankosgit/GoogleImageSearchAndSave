import {
  createBrowserRouter,
} from "react-router-dom";
import LoginHero from "../components/LoginHero";
import { UserProfile } from "../pages/UserProfile";
import { useAuth0 } from "@auth0/auth0-react";
import Hero from "../components/Hero";
import Layout from "../Layout/Layout";
import AuthenticatedRoute from "../components/AuthenticatedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <AuthenticatedRoute>
            <Hero />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/userprofile",
        element: <UserProfile />
      },
    ],
  },

]);