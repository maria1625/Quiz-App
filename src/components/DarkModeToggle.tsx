import { useEffect, useState } from "react";
import { getStoredTheme, saveTheme, type ThemeMode } from "../utils/localStorage";

function getInitialTheme(): ThemeMode {
  const storedTheme = getStoredTheme();
  if (storedTheme) return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function DarkModeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    saveTheme(theme);
  }, [isDarkMode, theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
    >
      {isDarkMode ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}
