import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'bootstrap-icons/font/bootstrap-icons.css'



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
