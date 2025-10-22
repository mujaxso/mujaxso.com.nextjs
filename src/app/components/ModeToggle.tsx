"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Get tooltip text based on current theme
  const getTooltip = () => {
    if (theme === 'light') {
      return "Light theme - Click to switch to dark theme";
    } else {
      return "Dark theme - Click to switch to light theme";
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl card-glass border border-border/50 text-foreground/80 hover:text-primary transition-all duration-500 hover:scale-110 hover:shadow-xl group relative overflow-hidden pulse-glow"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-effect"></div>
      <div className="relative z-10">
        {theme === 'dark' ? 
          <Sun className="w-5 h-5 transition-transform duration-700 group-hover:rotate-180" /> : 
          <Moon className="w-5 h-5 transition-transform duration-700 group-hover:rotate-180" />
        }
      </div>
    </button>
  );
}
