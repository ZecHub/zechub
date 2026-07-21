import { useState, useEffect } from 'react'
import { postAction, resetStack, fetchZalletStatus, toggleZallet, type Action, type ZalletStatus } from '../api'
import { Play, RotateCw, Square, Trash2, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react'
import type { ServiceState, Snapshot } from '../types'
import { Modal } from './walletShared'

type Status = 'idle' | 'pending' | 'success' | 'error'

// "Is anything actually running" — source of truth is containerUp (a running
// Docker container, even if its RPC isn't answering yet). Falls back to live
// service states for older backends that don't send containerUp.
function isActive(snap: Snapshot | null): boolean {
  if (!snap) return false
  if (snap.services.some((s) => s.containerUp)) return true
  const live: ServiceState[] = ['syncing', 'ready', 'running']
  return snap.services.some((s) => live.includes(s.state))
}

const ACTIONS: { action: Action; label: string; variant: 'primary' | 'secondary' | 'danger'; icon: typeof Play }[] = [
  { action: 'start', label: 'Start', variant: 'primary', icon: Play },
  { action: 'restart', label: 'Restart', variant: 'secondary', icon: RotateCw },
  { action: 'stop', label: 'Stop', variant: 'secondary', icon: Square },
  { action: 'reset', label: 'Erase data', variant: 'danger', icon: Trash2 },
]

export function Controls({ snap }: { snap: Snapshot | null }) {
  const [busy, setBusy] = useState<Action | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [err, setErr] = useState<string | null>(null)
  const [zallet, setZallet] = useState<ZalletStatus | null>(null)
  const [zalletBusy, setZalletBusy] = useState(false)
  const [showReset, setShowReset] = useState(false)

  const active = isActive(snap)

  useEffect(() => {
    fetchZalletStatus().then(setZallet).catch(() => {})
    const t = setInterval(() => {
      fetchZalletStatus().then(setZallet).catch(() => {})
    }, 5000)
    return () => clearInterval(t)
  }, [])

  async function handleZalletToggle() {
    if (!zallet) return
    setZalletBusy(true)
    try {
      await toggleZallet(!zallet.enabled)
      setZallet(await fetchZalletStatus())
    } catch {
      /* ignore */
    } finally {
      setZalletBusy(false)
    }
  }

  async function run(action: Action) {
    setBusy(action)
    setStatus('pending')
    setErr(null)
    try {
      await postAction(action)
      setStatus('success')
      setTimeout(() => setStatus((s) => (s === 'success' ? 'idle' : s)), 3500)
    } catch (e) {
      setStatus('error')
      setErr((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  function statusChip() {
    if (status === 'idle') return null
    if (status === 'pending') {
      return (
        <div className="flex items-center gap-2" style={{ color: 'var(--gold-text)' }}>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="text-[12px] font-semibold">Running {busy}…</span>
        </div>
      )
    }
    if (status === 'success') {
      return (
        <div className="flex items-center gap-1.5" style={{ color: 'var(--green)' }}>
          <CheckCircle2 size={14} strokeWidth={2.5} />
          <span className="text-[12px] font-semibold">Command accepted</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-1.5" style={{ color: 'var(--red)' }}>
        <AlertCircle size={14} strokeWidth={2.5} />
        <span className="text-[12px] font-semibold">Action failed</span>
      </div>
    )
  }

  const btnClass = (v: 'primary' | 'secondary' | 'danger') =>
    v === 'primary' ? 'z3-btn z3-btn-primary' : v === 'danger' ? 'z3-btn z3-btn-danger' : 'z3-btn z3-btn-secondary'

  return (
    <section className="z3-card p-[18px_20px]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-[10px]">
          {ACTIONS.map((a) => {
            const Icon = a.icon
            const isLoading = busy === a.action
            // Start needs an idle stack; Stop/Restart need a running one; Reset
            // (erase data) is always reachable — you may need to wipe leftover
            // containers or volumes even when nothing is currently running.
            const gated = a.action === 'start' ? active : a.action === 'reset' ? false : !active
            const disabled = !!busy || gated
            return (
              <button
                key={a.action}
                disabled={disabled}
                onClick={() => (a.action === 'reset' ? setShowReset(true) : run(a.action))}
                className={btnClass(a.variant)}
              >
                {isLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Icon size={15} strokeWidth={2.2} />
                )}
                {a.label}
              </button>
            )
          })}

          {/* Zallet toggle */}
          {zallet?.available && (
            <div className="ml-1 flex items-center gap-2.5 border-l pl-4" style={{ borderColor: 'var(--line)' }}>
              <span className="text-[12.5px] font-semibold" style={{ color: 'var(--muted)' }}>Zallet</span>
              <span
                className="rounded-[6px] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em]"
                style={{ color: 'var(--gold-text)', background: 'var(--gold-soft)' }}
              >
                Alpha
              </span>
              <button
                disabled={zalletBusy}
                onClick={handleZalletToggle}
                className="relative inline-flex h-[22px] w-[38px] items-center rounded-full px-0.5 transition-colors"
                style={{ background: zallet.enabled ? 'var(--green)' : 'var(--surface-2)' }}
              >
                <span
                  className="h-[18px] w-[18px] rounded-full bg-white shadow transition-transform"
                  style={{ transform: zallet.enabled ? 'translateX(16px)' : 'translateX(0)' }}
                />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          {statusChip() || (
            <>
              <p className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--faint)' }}>
                Control hub
              </p>
              <p className="text-[13px] font-medium" style={{ color: 'var(--muted)' }}>
                Start, stop, and reset your stack.
              </p>
            </>
          )}
        </div>
      </div>

      {err && (
        <div
          className="mt-4 rounded-xl border p-4 text-[13px] font-medium"
          style={{ background: 'var(--red-soft)', borderColor: 'var(--red-soft)', color: 'var(--red)' }}
        >
          <span className="mr-1 font-bold">Error:</span> {err}
        </div>
      )}

      {showReset && <ResetDialog hasWallet={!!zallet?.enabled} onClose={() => setShowReset(false)} />}
    </section>
  )
}

// ResetDialog guards the destructive Erase (down -v wipes the wallet AND chain
// state). The user must type RESET to confirm — a stray click can't destroy a
// wallet whose seed they may not have backed up.
function ResetDialog({ hasWallet, onClose }: { hasWallet: boolean; onClose: () => void }) {
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const armed = typed.trim().toUpperCase() === 'RESET'

  async function confirm() {
    if (!armed) return
    setBusy(true)
    setErr(null)
    try {
      await resetStack()
      onClose()
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal title="Erase all data?" subtitle="This cannot be undone." onClose={onClose}>
      <div
        className="mb-5 flex items-start gap-3 rounded-xl border p-4"
        style={{ background: 'var(--red-soft)', borderColor: 'var(--red-soft)' }}
      >
        <AlertTriangle size={18} style={{ color: 'var(--red)' }} className="mt-0.5 shrink-0" strokeWidth={2.2} />
        <p className="text-[13px] font-semibold leading-relaxed" style={{ color: 'var(--red)' }}>
          This deletes the chain state{hasWallet ? ' and your wallet' : ''}. {hasWallet ? 'If you have not backed up your recovery phrase, your funds will be lost forever. ' : ''}This wipe is irreversible.
        </p>
      </div>

      <label className="mb-2 block text-[12px] font-semibold" style={{ color: 'var(--muted)' }}>
        Type <span className="font-mono" style={{ color: 'var(--fg)' }}>RESET</span> to confirm
      </label>
      <input
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        autoFocus
        autoComplete="off"
        spellCheck={false}
        placeholder="RESET"
        className="z3-input mb-4 w-full px-4 py-2.5 font-mono text-[14px] font-semibold outline-none"
        style={{ color: 'var(--fg)' }}
      />

      {err && <p className="mb-3 text-[12px] font-medium" style={{ color: 'var(--red)' }}>{err}</p>}

      <div className="flex justify-end gap-2.5">
        <button onClick={onClose} className="z3-btn z3-btn-secondary">Cancel</button>
        <button onClick={confirm} disabled={!armed || busy} className="z3-btn z3-btn-danger" style={armed ? { background: 'var(--red-soft)' } : undefined}>
          {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Trash2 size={15} strokeWidth={2.2} />}
          Erase everything
        </button>
      </div>
    </Modal>
  )
}
