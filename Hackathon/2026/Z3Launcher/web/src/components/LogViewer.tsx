import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Terminal, Activity } from 'lucide-react'
import { subscribeLogs } from '../api'

interface LogViewerProps {
  compact?: boolean
  headerRight?: ReactNode
}

export function LogViewer({ compact = false, headerRight }: LogViewerProps = {}) {
  const [logs, setLogs] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // subscribeLogs listens to the named "log" SSE event the server emits.
    return subscribeLogs('', (line) => {
      setLogs((prev) => [...prev.slice(-499), line])
    })
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [logs])

  const height = compact ? 'h-[280px]' : 'h-[560px]'

  return (
    <section className={`z3-card flex flex-col overflow-hidden ${height}`}>
      <div className="flex items-center justify-between border-b p-[14px_20px]" style={{ borderColor: 'var(--line)' }}>
        <div className="flex items-center gap-[10px]">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg border"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--line)', color: 'var(--muted)' }}
          >
            <Terminal size={14} />
          </span>
          <span className="text-[14px] font-bold" style={{ color: 'var(--fg)' }}>
            {compact ? 'Live activity' : 'System log'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-[7px] text-[10.5px] font-bold uppercase tracking-[0.06em]" style={{ color: 'var(--green)' }}>
            <span className="h-1.5 w-1.5 animate-z3-pulse rounded-full" style={{ background: 'var(--green)' }} />
            Live
          </span>
          {headerRight}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="custom-scrollbar flex-1 overflow-auto p-[16px_20px] text-[11.5px] leading-[1.7]"
        style={{ background: 'var(--input)', fontFamily: 'var(--font-mono)' }}
      >
        {logs.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center" style={{ color: 'var(--faint)' }}>
            <Activity size={20} className="mb-3 animate-z3-pulse opacity-30" />
            <p className="text-[12px] font-bold uppercase tracking-[0.12em]">Waiting for activity…</p>
          </div>
        ) : (
          logs.map((l, i) => (
            <div key={i} className="flex gap-[14px] whitespace-pre-wrap">
              <span className="w-[26px] flex-shrink-0 select-none text-right tabular-nums opacity-50" style={{ color: 'var(--faint)' }}>
                {i + 1}
              </span>
              <span style={{ color: 'var(--muted)' }}>{l}</span>
            </div>
          ))
        )}
      </div>

      <div
        className="flex items-center justify-between border-t p-[9px_20px] text-[10px] font-semibold uppercase tracking-[0.05em]"
        style={{ borderColor: 'var(--line)', color: 'var(--faint)' }}
      >
        <span>{logs.length} / 500 lines</span>
        <span>Source · Z3 system</span>
      </div>
    </section>
  )
}
