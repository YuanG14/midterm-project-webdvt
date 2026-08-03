import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "ledger-theme";

const ThemeContext = createContext(undefined);

/**
 * Reads any previously saved theme from localStorage.
 * Returns null if nothing has been saved yet (or storage is unavailable).
 */
function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Detects the user's OS/browser preference via prefers-color-scheme.
 * Falls back to "dark" if the media query is unavailable.
 */
function getSystemTheme() {
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  }
  return "dark";
}

function getInitialTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Keep the <html> element's class and color-scheme in sync with theme state,
  // so every existing route (all of which style via CSS variables) picks it up.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable (e.g. private browsing) — theme still works for this session.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
