"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return (
      <button
        className="p-3 rounded-2xl card-glass border border-border/50 text-foreground/80"
        aria-label="Loading theme"
        suppressHydrationWarning
      >
        <div className="w-5 h-5"></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl card-glass border border-border/50 text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 hover-lift group relative overflow-hidden"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        {theme === 'dark' ? 
          <Sun className="w-4 h-4 transition-transform duration-500" /> : 
          <Moon className="w-4 h-4 transition-transform duration-500" />
        }
      </div>
    </button>
  );
}
