
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
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center gap-2">
      <Sun className={`h-4 w-4 transition-colors duration-200 ${isDark ? 'text-muted-foreground/70' : 'text-amber-500'}`} />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className={`h-4 w-4 transition-colors duration-200 ${isDark ? 'text-primary' : 'text-muted-foreground/70'}`} />
    </div>
  );
}
