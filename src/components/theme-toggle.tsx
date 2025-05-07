
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set initial state based on theme
  useEffect(() => {
    setIsMounted(true);
    setIsDark(
      theme === "dark" || 
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  // Avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  const toggleTheme = () => {
    // Apply transition class before toggling
    document.documentElement.classList.add('theme-transition');
    
    // Toggle between light and dark mode
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

  return (
    <div className="flex items-center gap-2 transition-opacity duration-300">
      <Sun className="h-4 w-4 text-muted-foreground transition-transform duration-300" />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
        className="transition-all duration-300"
      />
      <Moon className="h-4 w-4 text-muted-foreground transition-transform duration-300" />
    </div>
  );
}
