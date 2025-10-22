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
        className="p-2 rounded-xl card-glass border border-border/50 text-foreground/80"
        aria-label="Loading theme"
        suppressHydrationWarning
      >
        <div className="w-4 h-4"></div>
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="p-2 rounded-2xl"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      {theme === 'dark' ? 
        <Sun className="w-4 h-4" /> : 
        <Moon className="w-4 h-4" />
      }
    </Button>
  );
}
