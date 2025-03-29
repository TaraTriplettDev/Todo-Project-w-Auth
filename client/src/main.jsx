import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ToDo from "./ToDo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<ToDo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
