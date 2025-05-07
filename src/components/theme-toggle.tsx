
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  
  // Set initial state based on theme
  useEffect(() => {
    setIsDark(
      theme === "dark" || 
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  const toggleTheme = () => {
    // Toggle between light and dark mode
    const newTheme = isDark ? "light" : "dark";
    
    // Apply smooth transition for entire document
    document.documentElement.classList.add('theme-transition');
    
    setTheme(newTheme);
    setIsDark(!isDark);
    
    // Reset transition class after animation completes to allow normal transitions afterward
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500); // Increased from 300ms to 500ms for smoother transitions
  };

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      <Sun className={`h-4 w-4 transition-all duration-300 ${isDark ? 'text-muted-foreground opacity-70' : 'text-amber-500'}`} />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
        className="transition-all duration-300"
      />
      <Moon className={`h-4 w-4 transition-all duration-300 ${isDark ? 'text-primary' : 'text-muted-foreground opacity-70'}`} />
    </div>
  );
}
