import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import HabitViewer from "./pages/HabitViewer";
import HabitManagement from "./pages/HabitManagement";
import { toISO } from "./utils/date.ts";
import { HabitViewerLoader } from "./pages/HabitViewer.loader.ts";
import ErrorPage from "./pages/ErrorPage.tsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${toISO(new Date())}`} replace />,
      },
      {
        path: ":date",
        element: <HabitViewer />,
        loader: HabitViewerLoader,
        errorElement: <ErrorPage />,
      },
      { path: "/manage", element: <HabitManagement /> },
    ],
  },
]);
