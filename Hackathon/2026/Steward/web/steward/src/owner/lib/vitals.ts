import type { VaultStatus } from '../api/types'

/** The vault's ambient life-state, driving the whole UI's accent (see DESIGN.md):
 *  the hearth — active → ember, waning → flare, recoverable → char (gone cold). */
export type Ambient = 'active' | 'waning' | 'recoverable'

export interface Vitals {
  ambient: Ambient
  /** Seconds until the switch trips (>= 0). */
  remaining: number
  /** Total window: trip_at - last_heartbeat. */
  window: number
  /** remaining / window, clamped 0..1. 1 = fresh heartbeat, 0 = tripping. */
  frac: number
  /** True once tripped: the pulse flatlines. */
  flat: boolean
  /** Heartbeat cadence for the ECG, seconds. Slows as the deadline nears. */
  pulsePeriod: number
  /** Waveform amplitude 0..1. Thins as the deadline nears; 0 when flat. */
  pulseAmp: number
}

/** Derive everything the instrument needs from a status + a live `now`. `now` is
 *  server-aligned (see useVault) and ticks locally every second, so the pulse and
 *  countdown decay smoothly between polls. */
export function vitals(s: VaultStatus, nowSecs: number): Vitals {
  // A plain multisig vault has no dead-man's-switch: it is always calmly "active", with no
  // countdown and a steady pulse. (The vault home renders a different summary for it, so these
  // fields are only a safe fallback.)
  if (s.state === null || s.trip_at === null || s.last_heartbeat === null || s.grace_secs === null) {
    return {
      ambient: 'active',
      remaining: Number.POSITIVE_INFINITY,
      window: 1,
      frac: 1,
      flat: false,
      pulsePeriod: 1.15,
      pulseAmp: 1,
    }
  }
  const window = Math.max(1, s.trip_at - s.last_heartbeat)
  const remaining = Math.max(0, s.trip_at - nowSecs)
  const frac = Math.min(1, Math.max(0, remaining / window))

  const recoverable = s.state === 'Recoverable' || remaining <= 0
  // "waning" = inside the grace window: now is past (trip_at - grace) but not tripped.
  const waning = !recoverable && remaining <= s.grace_secs
  const ambient: Ambient = recoverable ? 'recoverable' : waning ? 'waning' : 'active'

  const flat = recoverable
  const pulsePeriod = 1.15 + (1 - frac) * 2.05 // ~1.15s fresh → ~3.2s near trip
  const pulseAmp = flat ? 0 : 0.3 + frac * 0.7 // thins toward 30% near trip

  return { ambient, remaining, window, frac, flat, pulsePeriod, pulseAmp }
}

/** Format the time-to-trip: `Xd Yh` far out, `Xh Ym` closer, live `mm:ss` when near. */
export function formatCountdown(remaining: number): string {
  if (remaining <= 0) return 'LAPSED'
  const d = Math.floor(remaining / 86_400)
  const h = Math.floor((remaining % 86_400) / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = Math.floor(remaining % 60)
  if (d > 0) return `${d}d ${h}h`
  if (remaining >= 3600) return `${h}h ${m}m`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** Whether the countdown is in its live `mm:ss` register. */
export function isClose(remaining: number): boolean {
  return remaining > 0 && remaining < 3600
}

/** Middle-truncate a long address/hash for display, keeping it in the mono ledger. */
export function truncateMiddle(s: string, head = 10, tail = 8): string {
  if (s.length <= head + tail + 1) return s
  return `${s.slice(0, head)}…${s.slice(-tail)}`
}

/** Format a zatoshi count (1e8 per ZEC) as a trimmed ZEC amount string — no unit.
 *  `0 → "0"`, `50_000_000 → "0.5"`, `100_000_000 → "1"`. Integer math throughout so
 *  large balances never lose a zatoshi to float error. */
export function formatZec(zat: number): string {
  const neg = zat < 0
  const abs = Math.abs(Math.trunc(zat))
  const whole = Math.floor(abs / 1e8)
  const frac = abs % 1e8
  let out = whole.toLocaleString('en-US')
  if (frac > 0) {
    out += '.' + String(frac).padStart(8, '0').replace(/0+$/, '')
  }
  return neg ? `−${out}` : out
}
