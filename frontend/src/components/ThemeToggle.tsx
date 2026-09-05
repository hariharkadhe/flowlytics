"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 animate-pulse"></div>;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-gray-700 dark:text-slate-300 relative group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun className="absolute w-5 h-5 transition-all duration-300 dark:rotate-90 dark:opacity-0 opacity-100 rotate-0" />
        <Moon className="absolute w-5 h-5 transition-all duration-300 dark:rotate-0 dark:opacity-100 opacity-0 -rotate-90" />
      </div>
    </button>
  );
}
