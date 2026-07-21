import { useCallback, useEffect, useRef, useState } from 'react'

import { api } from '../api/client'
import type { VaultStatus } from '../api/types'
import type { Ambient } from './vitals'

export interface VaultLive {
  status: VaultStatus | null
  error: string | null
  loading: boolean
  /** Server-aligned `now` (unix secs); ticks locally every second between polls. */
  nowSecs: number
  refresh: () => Promise<void>
}

/** Poll GET /vault/:id every `pollMs`, and keep a locally-ticking, server-aligned
 *  clock so the pulse + countdown update smoothly every second. */
export function useVault(vaultId: string, pollMs = 2000): VaultLive {
  const [status, setStatus] = useState<VaultStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [nowSecs, setNowSecs] = useState(() => Math.floor(Date.now() / 1000))
  const offset = useRef(0) // serverNow - clientNow

  const refresh = useCallback(async () => {
    try {
      const s = await api.vaultStatus(vaultId)
      offset.current = s.now - Math.floor(Date.now() / 1000)
      setStatus(s)
      setError(null)
      setNowSecs(Math.floor(Date.now() / 1000) + offset.current)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [vaultId])

  useEffect(() => {
    void refresh()
    const poll = window.setInterval(() => void refresh(), pollMs)
    const tick = window.setInterval(
      () => setNowSecs(Math.floor(Date.now() / 1000) + offset.current),
      1000,
    )
    return () => {
      window.clearInterval(poll)
      window.clearInterval(tick)
    }
  }, [refresh, pollMs])

  return { status, error, loading, nowSecs, refresh }
}

/** Track prefers-reduced-motion (respected by both signature elements). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/** Reflect the vault's life-state onto the document root so the ambient accent
 *  (tokens.css `[data-state]`) tints the whole instrument. */
export function useRootAmbient(ambient: Ambient | null): void {
  useEffect(() => {
    if (!ambient) return
    document.documentElement.dataset.state = ambient
    return () => {
      // leave the last state in place on unmount; screens set their own
    }
  }, [ambient])
}

// Routing now lives in the unified shared router (`src/shared/router.ts`) — the app
// carries BOTH the owner and the guardian worlds under one wordmark. Re-export `navigate`
// so the owner screens keep importing it from here, unchanged.
export { navigate } from '../../shared/router'
