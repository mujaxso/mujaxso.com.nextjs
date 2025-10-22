"use client"

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference and localStorage
    const savedMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved mode if exists, otherwise use system preference
    const initialDarkMode = savedMode !== null ? savedMode === "true" : systemPrefersDark;
    
    setDarkMode(initialDarkMode);
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded-lg backdrop-blur-sm bg-glass border border-glass-border text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
