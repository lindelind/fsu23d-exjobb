import { createBrowserRouter } from "react-router-dom";
import LayoutTemplate from "./pages/LayoutTemplate";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { FindVet } from "./pages/FindVet";
import { PetFirstAid } from "./pages/PetFirstAid";
import { VetDetailPage } from "./pages/VetDetailPage";
import { SavedClinics } from "./pages/SavedClinics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutTemplate />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/find-vet-clinic",
        element: <FindVet />,
      },
      {
        path: "/vet-clinic/:id",
        element: <VetDetailPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/saved-clinics",
        element: <SavedClinics />,
      },
      // {
      //   path: "/pet-first-aid",
      //   element: <PetFirstAid />,
      // },
    ],
  },
]);