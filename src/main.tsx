import "@fontsource-variable/inter";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App.tsx";
import { hasSessionHint } from "./auth/sessionHint.ts";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (root.hasChildNodes() && !hasSessionHint()) {
  hydrateRoot(root, tree);
} else {
  if (root.hasChildNodes()) root.replaceChildren();
  createRoot(root).render(tree);
}
