import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function bootstrap() {
  if (import.meta.env.DEV && import.meta.env.VITE_MOCK_API === "on") {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }

  createRoot(document.querySelector("#root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

await bootstrap();
