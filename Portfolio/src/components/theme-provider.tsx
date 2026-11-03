"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const THEME_STORAGE_KEY = "orbital-theme";

const ThemeContext = createContext<ThemeState>({
  theme: "dark",
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});

export function useTheme() {
  return useContext(ThemeContext);
}

function systemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function paint(theme: Theme, animate: boolean, timer: { current: number | null }) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  if (animate) {
    if (timer.current) window.clearTimeout(timer.current);
    root.classList.add("theme-switching");
    timer.current = window.setTimeout(() => {
      root.classList.remove("theme-switching");
      timer.current = null;
    }, 300);
  }

  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", theme === "dark" ? "#111318" : "#F5F7FA"));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const transitionTimer = useRef<number | null>(null);

  useEffect(() => {
    const fromDom = document.documentElement.dataset.theme;
    const initial: Theme =
      fromDom === "light" || fromDom === "dark" ? fromDom : (storedTheme() ?? systemTheme());

    paint(initial, false, transitionTimer);
    setThemeState(initial);

    // Only follow OS changes when the visitor has not made an explicit choice.
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event: MediaQueryListEvent) => {
      if (storedTheme()) return;
      const next: Theme = event.matches ? "light" : "dark";
      paint(next, true, transitionTimer);
      setThemeState(next);
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
        transitionTimer.current = null;
      }
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode / blocked storage: the theme still applies for this visit.
    }
    paint(next, true, transitionTimer);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const current: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
