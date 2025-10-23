'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get the stored theme from localStorage
    const stored = localStorage.getItem('mujaxso-theme') as Theme | null
    if (stored) {
      setThemeState(stored)
    } else {
      // If no stored theme, use system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      // We still set the theme to 'system' but apply the system preference
      setThemeState('system')
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    // Update localStorage immediately
    localStorage.setItem('mujaxso-theme', newTheme)
  }

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'system')
    
    // Add the current theme class
    root.classList.add(theme)
    
    // Determine the effective theme to apply
    let effectiveTheme: 'light' | 'dark'
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      effectiveTheme = theme
    }
    
    // Also add the effective theme class
    root.classList.add(effectiveTheme)
    
    // Update localStorage
    localStorage.setItem('mujaxso-theme', theme)
    
    // Set cookie for SSR if needed
    document.cookie = `mujaxso-theme=${theme}; path=/; max-age=31536000`
    
    // Force update the body background and text color
    document.body.style.backgroundColor = 'var(--color-background)'
    document.body.style.color = 'var(--color-foreground)'
  }, [theme, mounted])

  // Provide the context value
  const value: ThemeContextType = {
    theme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
