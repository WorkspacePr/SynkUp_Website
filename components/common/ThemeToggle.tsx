"use client";

import MoonIcon from "@/assests/icons/svg/MoonIcon";
import SunIcon from "@/assests/icons/svg/SunIcon";
import React from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    setMounted(true);
    // read current attribute set by the layout script
    const t = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setTheme(t);
  }, []);

  const apply = (t: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
    setTheme(t);
  };

  const toggle = () => apply(theme === "dark" ? "light" : "dark");

  // Render a stable button skeleton on the server to avoid mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 transition-colors"
        disabled
      >
        <SunIcon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors [data-theme=dark]:bg-zinc-800 [data-theme=dark]:text-zinc-200 [data-theme=dark]:hover:bg-zinc-700"
    >
      <span suppressHydrationWarning>
        {theme === "dark" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </span>
    </button>
  );
}