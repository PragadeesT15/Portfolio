"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "group relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line/80 bg-raised text-frost transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-glow/40 hover:bg-raised-strong hover:text-cyan-glow focus-visible:outline-cyan-glow",
        className,
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-cyan-glow/10 via-transparent to-violet-glow/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          className="theme-icon theme-icon-sun h-[1.05rem] w-[1.05rem] transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <Moon
          className="theme-icon theme-icon-moon h-[1.05rem] w-[1.05rem] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </span>
      <span className="sr-only">{theme === "dark" ? "Dark mode active" : "Light mode active"}</span>
    </button>
  );
}
