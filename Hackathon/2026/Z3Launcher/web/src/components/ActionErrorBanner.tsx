import { useEffect, useState } from 'react'
import { AlertOctagon, X, Copy, Check } from 'lucide-react'
import type { Snapshot } from '../types'

// ActionErrorBanner surfaces failures from background actions (Start/Reset)
// that the HTTP layer cannot report (the 202 Accepted has already been
// returned by the time the compose command fails). The backend now pushes
// the last error in every status snapshot; this component renders it as a
// prominent red banner and offers a "Copy details" button so the user can
// paste the full output (or share it in a bug report) without having to
// scroll through the live activity log.
//
// The banner only shows when there is an error to show, so during normal
// operation it adds zero visual weight.
export function ActionErrorBanner({ snapshot }: { snapshot: Snapshot }) {
  const err = snapshot.lastActionError
  const [dismissed, setDismissed] = useState(false)
  const [copied, setCopied] = useState(false)

  // Reset the dismissed state whenever a NEW error arrives, so the user
  // doesn't have to close it twice if they swipe it away and a different
  // action also fails.
  useEffect(() => {
    setDismissed(false)
  }, [err, snapshot.lastActionAt])

  if (!err || dismissed) return null

  const full = `Action: ${snapshot.lastActionName ?? 'action'}\nAt: ${snapshot.lastActionAt ?? ''}\n\n${err}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(full)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section
      role="alert"
      className="apple-card p-6 border-l-8 border-l-[#FF453A]/60 bg-[#FF453A]/[0.04]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF453A]/15 text-[#FF453A]">
            <AlertOctagon size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-bold tracking-tight text-white">
              Action failed: {snapshot.lastActionName ?? 'unknown'}
            </h3>
            <p className="mt-1 text-[13px] text-zinc-400">
              The HTTP request was accepted, but the background command failed.
              Check the live activity log for the full <code className="text-zinc-200 font-mono text-[12px]">docker compose</code> output.
            </p>
            <pre className="mt-3 max-h-40 overflow-auto rounded-xl bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-zinc-200 border border-white/5 whitespace-pre-wrap break-words">
              {err}
            </pre>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-[11px] font-bold text-zinc-200 hover:bg-white/10 transition-all active:scale-95"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy error details'}
              </button>
              <span className="text-[11px] font-medium text-zinc-500 tabular-nums">
                {snapshot.lastActionAt ? new Date(snapshot.lastActionAt).toLocaleString() : ''}
              </span>
            </div>
          </div>
        </div>
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <X size={16} />
        </button>
      </div>
    </section>
  )
}
