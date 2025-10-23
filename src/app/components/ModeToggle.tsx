"use client"

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

type Theme = 'light' | 'dark' | 'system';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getTooltip = () => {
    switch (theme) {
      case 'light': return "Light theme - Click to cycle themes";
      case 'dark': return "Dark theme - Click to cycle themes";
      case 'system': return "System theme - Click to cycle themes";
      default: return "Toggle theme";
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      case 'system': return <Monitor className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  // Show a placeholder while mounting to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="p-2 rounded-2xl"
        aria-label="Loading theme"
        suppressHydrationWarning
      >
        <div className="w-4 h-4"></div>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className="p-2 rounded-2xl glass border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      <div className="relative">
        {getIcon()}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
      </div>
    </Button>
  );
}
