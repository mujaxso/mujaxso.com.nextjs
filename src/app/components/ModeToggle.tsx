"use client"

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

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
      className="p-2 rounded-2xl"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      {getIcon()}
    </Button>
  );
}
