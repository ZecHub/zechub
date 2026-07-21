// Tiny dark/light theme store. No provider needed — it's a module-level
// external store wired into React via useSyncExternalStore. The active theme
// is written to <html data-theme="…">, which flips the CSS variables in
// index.css. Persisted to localStorage so it survives a refresh.

import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'z3-theme'
const listeners = new Set<() => void>()

function read(): Theme {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function apply(t: Theme) {
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = t
}

// Apply the persisted theme as early as this module is imported so there's no
// flash. (Import theme.tsx from main.tsx before rendering for best results.)
apply(read())

export function setTheme(t: Theme) {
  try {
    localStorage.setItem(KEY, t)
  } catch {
    /* ignore */
  }
  apply(t)
  listeners.forEach((l) => l())
}

export function toggleTheme() {
  setTheme(read() === 'dark' ? 'light' : 'dark')
}

/** Subscribe a component to the current theme. */
export function useTheme(): Theme {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    read,
    () => 'dark',
  )
}
