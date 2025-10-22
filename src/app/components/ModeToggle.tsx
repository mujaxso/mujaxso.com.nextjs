"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg backdrop-blur-sm bg-glass border border-glass-border text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110"
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
