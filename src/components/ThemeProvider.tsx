import { createContext, useContext, useEffect, useState } from "react";
import {
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
  THEME_INITIAL_STATE,
  ThemeType,
} from "../types";

const ThemeProviderContext =
  createContext<ThemeProviderState>(THEME_INITIAL_STATE);

export function ThemeProvider({
  children,
  defaultTheme = ThemeType.SYSTEM,
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    return savedTheme || defaultTheme;
  });

  // Function to get the resolved theme (actual theme being used)
  const getResolvedTheme = (): Theme => {
    if (theme === ThemeType.SYSTEM) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? ThemeType.DARK
        : ThemeType.LIGHT;
    }
    return theme;
  };

  const resolvedTheme = getResolvedTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes first
    root.classList.remove(ThemeType.LIGHT, ThemeType.DARK);

    let themeToApply: Theme;

    if (theme === ThemeType.SYSTEM) {
      // For system theme, determine the actual theme
      themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? ThemeType.DARK
        : ThemeType.LIGHT;
    } else {
      themeToApply = theme;
    }

    // Apply the theme class
    root.classList.add(themeToApply);

    // Listen for system theme changes when using system theme
    if (theme === ThemeType.SYSTEM) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        root.classList.remove(ThemeType.LIGHT, ThemeType.DARK);
        root.classList.add(e.matches ? ThemeType.DARK : ThemeType.LIGHT);
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
