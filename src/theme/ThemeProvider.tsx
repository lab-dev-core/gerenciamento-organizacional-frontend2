import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { createContext, useContext, useState, useEffect } from "react";
import { theme as baseTheme } from "./theme";

type ThemeContextType = {
  colorScheme: "light" | "dark";
  switchTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("color-scheme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    // remove classes antigas
    document.documentElement.classList.remove("mantine-light", "mantine-dark");

    // adiciona a nova
    document.documentElement.classList.add(
      colorScheme === "light" ? "mantine-light" : "mantine-dark"
    );

    localStorage.setItem("color-scheme", colorScheme);
  }, [colorScheme]);

  const switchTheme = () => {
    setColorScheme((c) => (c === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, switchTheme }}>
      <MantineProvider 
        theme={baseTheme} 
        defaultColorScheme={colorScheme}
        forceColorScheme={colorScheme}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeSwitch() {
  return useContext(ThemeContext)!;
}
