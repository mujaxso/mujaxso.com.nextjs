"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Get tooltip text based on current theme
  const getTooltip = () => {
    if (theme === 'light') {
      return "Light theme - Click to switch to dark theme";
    } else {
      return "Dark theme - Click to switch to light theme";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl card-glass border border-border/50 text-foreground/80 hover:text-primary transition-all duration-500 hover:scale-110 hover:rotate-12 hover:shadow-xl group relative overflow-hidden"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      {theme === 'dark' ? 
        <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" /> : 
        <Moon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
      }
    </button>
  );
}
