import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider, ColorSchemeScript, useMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "./theme/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorSchemeScript defaultColorScheme="light" />
    <MantineProvider theme={theme} defaultColorScheme="light" withCssVariables>
      <App />
    </MantineProvider>
  </StrictMode>,
);
