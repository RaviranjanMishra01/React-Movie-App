import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Selectmovie from "./assets/Components/Selectmovie.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<App />} />

        {/* Selected Movie Page */}
        <Route path="/movie/:id" element={<Selectmovie />} />

        {/* Fallback */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
