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
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-gray-200
        bg-white/70
        px-3
        py-2
        text-sm
        font-semibold
        text-gray-800
        backdrop-blur
        transition
        hover:bg-white
        dark:border-gray-700
        dark:bg-gray-900/40
        dark:text-gray-100
        dark:hover:bg-gray-900/70
      "
    >
      <span>{isDarkMode ? "☀️" : "🌙"}</span>
      <span>{isDarkMode ? "Modo claro" : "Modo oscuro"}</span>
    </button>
  );
}
