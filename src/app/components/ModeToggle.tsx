"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  // To prevent hydration mismatch, render a placeholder until mounted
  // But since we can't use hooks conditionally, we'll always render the same structure
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg backdrop-blur-sm bg-card border border-border text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110"
      aria-label="Switch theme"
      suppressHydrationWarning
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
