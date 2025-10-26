'use client'

export default function ThemeScript() {
  // This script runs before React hydration to prevent FOUC
  const scriptContent = `
    (function() {
      try {
        var theme = localStorage.getItem('mujaxso-theme');
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var effectiveTheme = theme === 'system' ? systemTheme : (theme || 'system');
        
        // Remove all theme classes first
        document.documentElement.classList.remove('light', 'dark', 'system');
        
        // Add the selected theme
        if (theme) {
          document.documentElement.classList.add(theme);
        }
        // Always add the effective theme for styling
        document.documentElement.classList.add(effectiveTheme);
        
        // Mark theme as loaded immediately
        document.body.classList.add('theme-loaded');
      } catch (e) {
        console.error('Theme initialization error:', e);
        // Ensure theme is marked as loaded even if there's an error
        document.body.classList.add('theme-loaded');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: scriptContent,
      }}
    />
  );
}
