// Pure presentation helpers. These are unit-tested (format.test.ts) — the
// React components stay thin so the testable logic lives here.

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let v = n
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  const digits = v >= 100 || i === 0 ? 0 : 1
  return `${v.toFixed(digits)} ${units[i]}`
}

export function formatPct(p: number): string {
  if (!Number.isFinite(p) || p <= 0) return '0%'
  if (p >= 100) return '100%'
  return `${p.toFixed(p >= 99 ? 2 : 1)}%`
}

// formatZec renders a ZEC amount with up to 8 decimals, trailing zeros trimmed,
// and thousands separators on the integer part. 0 renders as "0".
export function formatZec(n: number): string {
  if (!Number.isFinite(n)) return '0'
  if (n === 0) return '0'
  const fixed = n.toFixed(8).replace(/\.?0+$/, '')
  const [int, frac] = fixed.split('.')
  const withCommas = Number(int).toLocaleString('en-US')
  return frac ? `${withCommas}.${frac}` : withCommas
}

// shortenAddr abbreviates a long address for compact display.
export function shortenAddr(addr: string, head = 12, tail = 8): string {
  if (!addr || addr.length <= head + tail + 1) return addr
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`
}

export function formatHeight(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—'
  return n.toLocaleString('en-US')
}

const STATE_STYLES: Record<string, string> = {
  ready: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  running: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  syncing: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  starting: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  stopped: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
  unreachable: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
  unknown: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
}

export function stateBadgeClass(state: string): string {
  return STATE_STYLES[state] ?? STATE_STYLES.unknown
}

export interface Sample {
  height: number
  t: number // epoch ms
}

// etaSeconds estimates remaining sync time from two block-height samples.
// Returns null when it can't form a sensible estimate.
export function etaSeconds(prev: Sample, cur: Sample, tip: number): number | null {
  const dh = cur.height - prev.height
  const dt = (cur.t - prev.t) / 1000
  if (dh <= 0 || dt <= 0 || tip <= cur.height) return null
  const blocksPerSec = dh / dt
  return Math.round((tip - cur.height) / blocksPerSec)
}

export function formatDuration(secs: number | null): string {
  if (secs == null || !Number.isFinite(secs) || secs <= 0) return '—'
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = Math.floor(secs % 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}
