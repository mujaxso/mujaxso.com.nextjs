"use client"

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ModeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  // Determine which icon to show based on current theme
  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-5 h-5" />;
    }
    return resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;
  };

  // Get tooltip text based on current theme
  const getTooltip = () => {
    if (theme === 'system') {
      return "System theme (currently " + resolvedTheme + ") - Click to switch to light theme";
    } else if (theme === 'light') {
      return "Light theme - Click to switch to dark theme";
    } else {
      return "Dark theme - Click to switch to system theme";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg backdrop-blur-sm bg-card border border-border text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      {getIcon()}
    </button>
  );
}
