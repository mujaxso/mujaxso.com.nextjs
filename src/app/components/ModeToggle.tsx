"use client"

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme as typeof themes[number]);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getTooltip = () => {
    if (!mounted) return "Toggle theme";
    switch (theme) {
      case 'light': return "Light theme - Click to cycle themes";
      case 'dark': return "Dark theme - Click to cycle themes";
      case 'system': return "System theme - Click to cycle themes";
      default: return "Toggle theme";
    }
  };

  const getIcon = () => {
    if (!mounted) return <Monitor className="w-5 h-5" />;
    switch (theme) {
      case 'light': return <Sun className="w-5 h-5" />;
      case 'dark': return <Moon className="w-5 h-5" />;
      case 'system': return <Monitor className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  // Show a placeholder while mounting to avoid hydration mismatch
  // Use the same styling as the actual button to prevent layout shift
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-10 w-10 flex items-center justify-center p-0 glass border-white/20 rounded-full shadow-lg"
        aria-label="Loading theme"
        suppressHydrationWarning
      >
        <Monitor className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className="h-10 w-10 flex items-center justify-center p-0 glass border-white/20 rounded-full shadow-lg"
      aria-label={getTooltip()}
      title={getTooltip()}
      suppressHydrationWarning
    >
      {getIcon()}
    </Button>
  );
}
