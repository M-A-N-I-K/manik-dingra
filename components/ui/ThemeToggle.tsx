"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full glass hover:bg-white/20 dark:hover:bg-black/40 transition-all duration-300 group relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-accent-foreground group-hover:text-primary transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
        )}
      </div>
      <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
