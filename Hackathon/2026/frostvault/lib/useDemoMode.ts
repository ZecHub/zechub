"use client";

// Toggles a larger-type, higher-contrast presentation used only while
// screen-recording a demo video. Persisted so it survives navigation during
// a recording session. Purely cosmetic -- no effect on any real vault/API
// behavior.

import { useEffect, useState } from "react";

const KEY = "frostvault:demo-mode";

export function useDemoMode() {
  const [enabled, setEnabledState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEnabledState(window.localStorage.getItem(KEY) === "1");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("demo-mode", enabled);
  }, [enabled, hydrated]);

  function setEnabled(value: boolean) {
    window.localStorage.setItem(KEY, value ? "1" : "0");
    setEnabledState(value);
  }

  return { enabled, setEnabled, hydrated };
}
