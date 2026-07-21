import { useEffect, useRef, useState } from 'react'

import type { Client } from '../api/client'
import { ApiError } from '../api/client'
import type { PendingSession, VaultStatus } from '../api/types'
import { isLapsed, verifyHeartbeat } from './heartbeat'
import type { Ambient } from './vitals'

/** Reflect the vault's life-state onto the document root so the ambient accent
 *  (tokens.css `[data-state]`) tints the whole instrument. */
export function useRootAmbient(ambient: Ambient | null): void {
  useEffect(() => {
    if (!ambient) return
    document.documentElement.dataset.state = ambient
  }, [ambient])
}

export interface VaultLive {
  status: VaultStatus | null
  error: string | null
  /** Server-aligned `now` (unix secs); ticks locally every second between polls. */
  nowSecs: number
}

/** Poll GET /vault/:id, keeping a server-aligned clock so the countdown decays
 *  smoothly. Used for the seal's `t of n` context + the ambient life-state. */
export function useVaultStatus(client: Client, vaultId: string, pollMs = 4000): VaultLive {
  const [status, setStatus] = useState<VaultStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nowSecs, setNowSecs] = useState(() => Math.floor(Date.now() / 1000))
  const offset = useRef(0)

  useEffect(() => {
    let alive = true
    const refresh = async () => {
      try {
        const s = await client.vaultStatus(vaultId)
        if (!alive) return
        offset.current = s.now - Math.floor(Date.now() / 1000)
        setStatus(s)
        setError(null)
        setNowSecs(Math.floor(Date.now() / 1000) + offset.current)
      } catch (e) {
        if (!alive) return
        setError(e instanceof Error ? e.message : String(e))
      }
    }
    void refresh()
    const poll = window.setInterval(() => void refresh(), pollMs)
    const tick = window.setInterval(
      () => setNowSecs(Math.floor(Date.now() / 1000) + offset.current),
      1000,
    )
    return () => {
      alive = false
      window.clearInterval(poll)
      window.clearInterval(tick)
    }
  }, [client, vaultId, pollMs])

  return { status, error, nowSecs }
}

export interface PendingLive {
  pending: PendingSession[]
  error: string | null
  /** True after the first poll resolves (so we can distinguish "loading" from "none"). */
  loaded: boolean
}

/** Poll GET /vault/:id/pending for open relay-mode requests this guardian could
 *  approve. Poll cadence is deliberately calm (~3s) — this is a watch, not a feed. */
export function usePending(client: Client, vaultId: string, pollMs = 3000): PendingLive {
  const [pending, setPending] = useState<PendingSession[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true
    const refresh = async () => {
      try {
        const list = await client.pending(vaultId)
        if (!alive) return
        setPending(list)
        setError(null)
        setLoaded(true)
      } catch (e) {
        if (!alive) return
        // A 404 means the vault id is wrong; anything else is a transient reach error.
        setError(
          e instanceof ApiError && e.status === 404
            ? `No such vault: ${vaultId}. Check the vault id you enrolled with.`
            : e instanceof Error
              ? e.message
              : String(e),
        )
        setLoaded(true)
      }
    }
    void refresh()
    const poll = window.setInterval(() => void refresh(), pollMs)
    return () => {
      alive = false
      window.clearInterval(poll)
    }
  }, [client, vaultId, pollMs])

  return { pending, error, loaded }
}

/** The guardian's INDEPENDENT inheritance-release gate. */
export interface ReleaseGate {
  /** Whether this purpose is gated at all — only `InheritanceRelease` is. */
  gated: boolean
  /** True once the guardian may arm "Approve". Non-gated purposes are always armed. */
  armed: boolean
  /** The signed heartbeat verified against the canonical message (the guardian did it itself). */
  verified: boolean
  /** The switch has genuinely lapsed, judged from the owner's SIGNED timestamp + local clock. */
  lapsed: boolean
  /** The owner's last signed proof-of-life (unix secs), or null if none is on record. */
  lastSignedTime: number | null
  /** Seconds until the switch would lapse by the signed time (0 once lapsed). */
  secondsUntilLapse: number
  /** Still fetching + verifying the bulletin. */
  checking: boolean
  /** A plain-words reason when not armed (null when armed). */
  reason: string | null
}

/**
 * Gate an `InheritanceRelease` on the owner's OWN signed heartbeat. Before arming Approve the
 * guardian fetches `GET /vault/:id/heartbeat`, re-verifies the Ed25519 signature over the exact
 * canonical message ITSELF (never trusting the coordinator's `state`), and computes `is_lapsed`
 * against the signed timestamp on its own clock (`nowSecs`). Only a verified, genuinely-lapsed
 * proof-of-life arms the release. Non-inheritance purposes (owner-authorized) are never gated.
 */
export function useReleaseGate(
  client: Client,
  vaultId: string,
  session: PendingSession | null,
  nowSecs: number,
): ReleaseGate {
  const gated = session?.purpose === 'InheritanceRelease'
  const sessionId = session?.session_id
  const [checked, setChecked] = useState<{
    verified: boolean
    time: number | null
    intervalSecs: number
    graceSecs: number
  } | null>(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!gated) {
      setChecked(null)
      setChecking(false)
      return
    }
    let alive = true
    setChecking(true)
    ;(async () => {
      try {
        const b = await client.heartbeatBulletin(vaultId)
        // Verify the signature OURSELVES — the coordinator's word is not trusted here.
        const verified =
          b.time !== null && b.sig_hex !== null
            ? await verifyHeartbeat(b.pubkey_hex, vaultId, b.time, b.sig_hex)
            : false
        if (!alive) return
        setChecked({
          verified,
          time: b.time,
          intervalSecs: b.interval_secs,
          graceSecs: b.grace_secs,
        })
      } catch {
        if (!alive) return
        setChecked({ verified: false, time: null, intervalSecs: 0, graceSecs: 0 })
      } finally {
        if (alive) setChecking(false)
      }
    })()
    return () => {
      alive = false
    }
    // Re-check whenever the gated session changes (a new request to consider).
  }, [client, vaultId, gated, sessionId])

  if (!gated) {
    return {
      gated: false,
      armed: true,
      verified: true,
      lapsed: true,
      lastSignedTime: null,
      secondsUntilLapse: 0,
      checking: false,
      reason: null,
    }
  }
  if (checking || !checked) {
    return {
      gated: true,
      armed: false,
      verified: false,
      lapsed: false,
      lastSignedTime: null,
      secondsUntilLapse: 0,
      checking: true,
      reason: 'Verifying the owner’s signed proof-of-life…',
    }
  }
  if (!checked.verified || checked.time === null) {
    return {
      gated: true,
      armed: false,
      verified: false,
      lapsed: false,
      lastSignedTime: checked.time,
      secondsUntilLapse: 0,
      checking: false,
      reason:
        'No verifiable signed proof-of-life is on record — the release cannot be armed until the owner’s own signed heartbeat is present and lapsed.',
    }
  }
  const deadline = checked.time + checked.intervalSecs + checked.graceSecs
  const lapsed = isLapsed(checked.time, checked.intervalSecs, checked.graceSecs, nowSecs)
  return {
    gated: true,
    armed: lapsed,
    verified: true,
    lapsed,
    lastSignedTime: checked.time,
    secondsUntilLapse: Math.max(0, deadline - nowSecs),
    checking: false,
    reason: lapsed
      ? null
      : 'A recent signed proof-of-life stands — the release cannot be armed until the owner’s heartbeats lapse.',
  }
}
