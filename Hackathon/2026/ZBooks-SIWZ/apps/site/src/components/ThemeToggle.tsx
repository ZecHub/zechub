"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "siwz.theme";

function applyTheme(theme: Theme): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  return resolved;
}

export function ThemeToggle() {
  // Default to "system" on first render so SSR markup matches the inline-script's
  // first-paint behavior. The effect below reconciles to the stored value.
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let stored: Theme | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    } catch {
      /* private mode */
    }
    const initial: Theme =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setThemeState(initial);
    setResolved(applyTheme(initial));

    if (initial === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => setResolved(applyTheme("system"));
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  // Cycle: light -> dark -> system -> light
  const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const label =
    theme === "system" ? `System (${resolved})` : theme === "dark" ? "Dark" : "Light";

  const setTheme = (t: Theme) => {
    setThemeState(t);
    setResolved(applyTheme(t));
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* private mode */
    }
  };

  // Render a neutral placeholder until mounted so SSR doesn't mismatch the
  // resolved icon (which depends on first-paint resolution).
  if (!mounted) {
    return (
      <button type="button" aria-label="Theme" className="theme-toggle" tabIndex={-1}>
        <ThemeGlyph resolved="light" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={`Theme: ${label}. Click for ${next}.`}
      aria-label={`Theme: ${label}. Click for ${next}.`}
      className="theme-toggle"
    >
      <ThemeGlyph resolved={resolved} />
    </button>
  );
}

function ThemeGlyph({ resolved }: { resolved: "light" | "dark" }) {
  return resolved === "dark" ? <MoonIcon /> : <SunIcon />;
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
