import { useState } from 'react'
import type { Endpoints } from '../types'
import { Copy, Check } from 'lucide-react'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="z3-btn flex-shrink-0 gap-[7px] px-[14px] py-2 text-[12px]"
      style={
        copied
          ? { background: 'var(--green)', color: '#fff', border: 'none' }
          : { background: 'var(--surface-2)', color: 'var(--muted)', border: 'none' }
      }
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function EndpointPanel({ endpoints }: { endpoints: Endpoints }) {
  return (
    <section className="z3-card overflow-hidden">
      <div className="flex items-center justify-between border-b p-[20px_24px]" style={{ borderColor: 'var(--line)' }}>
        <div>
          <h3 className="m-0 text-[16px] font-bold tracking-[-0.01em]" style={{ color: 'var(--fg)' }}>
            Endpoints
          </h3>
          <p className="mt-[3px] text-[13px] font-medium" style={{ color: 'var(--faint)' }}>
            Connect a wallet or app to your node.
          </p>
        </div>
        <span className={`z3-pill ${endpoints.ready ? 'z3-pill-ready' : 'z3-pill-wait'}`}>
          {endpoints.ready ? 'Ready' : 'Waiting'}
        </span>
      </div>

      <div>
        {endpoints.endpoints.map((e, i) => (
          <div
            key={e.name}
            className="flex items-center gap-[18px] p-[18px_24px]"
            style={{
              borderTop: i ? '1px solid var(--line)' : 'none',
              opacity: endpoints.ready ? 1 : 0.55,
              pointerEvents: endpoints.ready ? 'auto' : 'none',
            }}
          >
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-[9px]">
                <span
                  className="text-[9.5px] font-bold uppercase tracking-[0.06em]"
                  style={{ color: 'var(--faint)', fontFamily: 'var(--font-mono)' }}
                >
                  {e.proto}
                </span>
                <span className="text-[14px] font-semibold" style={{ color: 'var(--fg)' }}>
                  {e.name}
                </span>
              </div>
              <div className="text-[12.5px]" style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                {e.url}
              </div>
              {e.hint && (
                <div className="mt-1 text-[11.5px] font-semibold" style={{ color: 'var(--gold-text)' }}>
                  {e.hint}
                </div>
              )}
            </div>
            <CopyButton value={e.url} />
          </div>
        ))}
      </div>
    </section>
  )
}
