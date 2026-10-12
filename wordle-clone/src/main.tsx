import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import "./style.css";
import "./wordle-theme.css";

createRoot(document.getElementById("root") ?? (() => { throw new Error("Missing application root"); })()).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
