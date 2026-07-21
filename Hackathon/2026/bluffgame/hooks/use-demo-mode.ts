"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "bluff:demo-mode";
const EVENT_NAME = "bluff:demo-mode-change";

const readStoredValue = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
};

/**
 * Non-destructive, purely visual "Demo Recording Mode" flag. Persisted to
 * localStorage and synced across every component that mounts this hook
 * (including other tabs) via a custom event + the native `storage` event.
 */
export function useDemoMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readStoredValue());

    const sync = () => setEnabled(readStoredValue());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setDemoMode = useCallback((value: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  const toggleDemoMode = useCallback(() => {
    setDemoMode(!readStoredValue());
  }, [setDemoMode]);

  return { enabled, setDemoMode, toggleDemoMode };
}
