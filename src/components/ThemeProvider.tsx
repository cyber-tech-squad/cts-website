"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("cts-theme");
    } catch {
      // The theme still works when browser storage is disabled.
    }
    const initial: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;

    function syncTheme(event: StorageEvent) {
      if (event.key !== "cts-theme" || (event.newValue !== "light" && event.newValue !== "dark"))
        return;
      setTheme(event.newValue);
      document.documentElement.dataset.theme = event.newValue;
    }
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  function toggleTheme() {
    // Read the DOM as the source of truth to avoid stale React state during hydration.
    const current = document.documentElement.dataset.theme === "light" ? "light" : theme;
    const next: Theme = current === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("cts-theme", next);
    } catch {
      // Keep the active page usable even when the browser blocks storage.
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeToggle doit être rendu dans ThemeProvider");
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={context.toggleTheme}
      aria-pressed={context.theme === "light"}
      aria-label={`Activer le thème ${context.theme === "dark" ? "clair" : "sombre"}`}
    >
      {context.theme === "dark" ? "☼" : "☾"}
    </button>
  );
}
