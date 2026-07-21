import type { Service } from '../types'
import { formatPct, formatHeight, formatDuration } from '../format'
import { CheckCircle2, CloudDownload } from 'lucide-react'

export function SyncProgress({ zebra, eta }: { zebra: Service; eta: number | null }) {
  const pct = Math.max(0, Math.min(100, zebra.syncPct))
  const ready = zebra.state === 'ready'
  const accent = ready ? 'var(--green)' : 'var(--gold)'
  const accentText = ready ? 'var(--green)' : 'var(--gold-text)'
  const circ = 2 * Math.PI * 58 // 364.4

  return (
    <section className="z3-card flex items-center gap-[38px] p-[30px_34px]">
      {/* Ring */}
      <div className="relative h-[132px] w-[132px] flex-shrink-0">
        <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
          <circle cx="66" cy="66" r="58" fill="none" strokeWidth="9" style={{ stroke: 'var(--line-strong)' }} />
          <circle
            cx="66" cy="66" r="58" fill="none" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ - (circ * pct) / 100}
            style={{ stroke: accent, transition: 'stroke-dashoffset .8s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[27px] font-bold tracking-[-0.02em] tabular-nums" style={{ color: 'var(--fg)' }}>
            {formatPct(zebra.syncPct)}
          </span>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--faint)' }}>
            {ready ? 'Ready' : 'Syncing'}
          </span>
        </div>
      </div>

      {/* Copy + stats */}
      <div className="min-w-0 flex-1">
        <span
          className="inline-flex items-center gap-[7px] text-[11px] font-bold uppercase tracking-[0.09em]"
          style={{ color: accentText }}
        >
          {ready ? <CheckCircle2 size={13} /> : <CloudDownload size={13} className="animate-z3-pulse" />}
          {ready ? 'Sync complete' : 'Syncing chain'}
        </span>
        <h2 className="mb-2 mt-[10px] text-[25px] font-bold tracking-[-0.02em]" style={{ color: 'var(--fg)' }}>
          {ready ? 'Node is ready' : 'Bringing the node online'}
        </h2>
        <p className="m-0 max-w-[440px] text-[14.5px] font-medium leading-[1.55]" style={{ color: 'var(--muted)' }}>
          {ready
            ? 'Zebra is at the chain tip. Zaino is indexing and your endpoints are live — point a wallet at Zaino to start.'
            : 'Downloading and verifying the Zcash chain. Use fast-start to attach a pre-synced snapshot and skip the wait.'}
        </p>

        <div className="mt-[22px] flex gap-9">
          <Stat label="Verified" value={`${formatHeight(zebra.height)}`} mono />
          <Stat label="Chain tip" value={`${formatHeight(zebra.tip)}`} mono />
          <Stat
            label="Remaining"
            value={ready ? 'Synced' : eta != null ? formatDuration(eta) : 'Calculating…'}
            color={ready ? 'var(--green)' : 'var(--fg)'}
          />
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, mono, color }: { label: string; value: string; mono?: boolean; color?: string }) {
  return (
    <div>
      <div className="mb-[5px] text-[10.5px] font-bold uppercase tracking-[0.07em]" style={{ color: 'var(--faint)' }}>
        {label}
      </div>
      <div
        className={`text-[15px] ${mono ? 'font-medium' : 'font-semibold'}`}
        style={{ color: color ?? 'var(--fg)', fontFamily: mono ? 'var(--font-mono)' : undefined }}
      >
        {value}
      </div>
    </div>
  )
}
