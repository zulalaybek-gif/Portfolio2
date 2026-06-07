
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();

  if (sessionStorage.getItem("portfolio:chunk-reload") === "1") return;

  sessionStorage.setItem("portfolio:chunk-reload", "1");
  window.location.reload();
});

window.addEventListener("load", () => {
  sessionStorage.removeItem("portfolio:chunk-reload");
});

createRoot(document.getElementById("root")!).render(<App />);
