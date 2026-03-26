import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./shared/theme/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MantineProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </ThemeProvider>
  </StrictMode>,
);
