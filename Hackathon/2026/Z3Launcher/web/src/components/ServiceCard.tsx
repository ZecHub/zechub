import type { Service } from '../types'
import { formatBytes, formatHeight } from '../format'
import { Server, Database, Layers } from 'lucide-react'

const ICONS: Record<string, typeof Server> = {
  zebra: Server,
  zaino: Database,
  zallet: Layers,
}

export function ServiceCard({ svc }: { svc: Service }) {
  const ready = svc.state === 'ready' || svc.state === 'running'
  const syncing = svc.state === 'syncing' || svc.state === 'starting'
  const Icon = ICONS[svc.service] ?? Server

  const dot = ready ? 'var(--green)' : syncing ? 'var(--gold)' : 'var(--faint)'
  const stateLabel =
    svc.state === 'unreachable' ? 'Not connected' : svc.state === 'starting' ? 'Starting…' : svc.state

  return (
    <div className="z3-card z3-card-hover flex flex-col gap-[18px] p-[22px]">
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-[11px] border"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--line)', color: syncing ? 'var(--gold-text)' : 'var(--muted)' }}
        >
          {/* While the container is coming up, the icon tile shows a spinner so
              the user can see it's being brought up; it switches to the service
              icon (and a green dot) once running. */}
          {syncing ? (
            <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Icon size={19} strokeWidth={2} />
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold capitalize" style={{ color: syncing ? 'var(--gold-text)' : 'var(--muted)' }}>
          {syncing ? (
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: dot }} />
          )}
          {stateLabel}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h3 className="m-0 text-[17px] font-bold capitalize tracking-[-0.01em]" style={{ color: 'var(--fg)' }}>
            {svc.service}
          </h3>
          {svc.service === 'zallet' && (
            <span
              className="rounded-[5px] px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.06em]"
              style={{ color: 'var(--gold-text)', background: 'var(--gold-soft)' }}
            >
              Alpha
            </span>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between border-t pt-[13px]" style={{ borderColor: 'var(--line)' }}>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.06em]" style={{ color: 'var(--faint)' }}>
            Block height
          </span>
          <span className="text-[13px] font-medium tabular-nums" style={{ color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}>
            {formatHeight(svc.height)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 text-right">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.06em]" style={{ color: 'var(--faint)' }}>
            Free disk
          </span>
          <span className="text-[13px] font-medium tabular-nums" style={{ color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}>
            {formatBytes(svc.diskFree)}
          </span>
        </div>
      </div>
    </div>
  )
}
