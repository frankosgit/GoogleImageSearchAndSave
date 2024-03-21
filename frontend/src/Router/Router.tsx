import {
  createBrowserRouter,
} from "react-router-dom";
import { UserProfile } from "../pages/UserProfile";
import Layout from "../Layout/Layout";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import AuthedHero from "../components/AuthedHero";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <AuthenticatedRoute>
            <AuthedHero />
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