import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./App.tsx";
import { installApi401Interceptor } from "./shared/api/client";
import { AuthProvider } from "./shared/auth";
import { ThemeProvider } from "./shared/theme/ThemeProvider";

installApi401Interceptor();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MantineProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </MantineProvider>
    </ThemeProvider>
  </StrictMode>,
);
