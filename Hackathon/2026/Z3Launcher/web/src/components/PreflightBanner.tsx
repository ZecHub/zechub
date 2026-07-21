import { useEffect, useRef, useState } from 'react'
import {
  startInstall,
  subscribeInstall,
  startRuntime,
  subscribeRuntime,
  fetchInstallPlan,
  fetchPreflight,
  clearStale,
  type InstallDone,
  type InstallPlan,
  type PreflightReport,
} from '../api'
import { installLabel, installTone } from '../install'
import {
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  ExternalLink,
  Cpu,
  Terminal,
  CheckCircle2,
  XCircle,
  Eraser,
} from 'lucide-react'

export function PreflightBanner() {
  const [rep, setRep] = useState<PreflightReport | null>(null)
  const [plan, setPlan] = useState<InstallPlan | null>(null)
  const [busy, setBusy] = useState(false)
  const [confirm, setConfirm] = useState(false)

  // Streaming install state.
  const [installing, setInstalling] = useState(false)
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState<InstallDone | null>(null)

  // Safe stale-container cleanup (compose down, keeps volumes).
  const [clearing, setClearing] = useState(false)
  const [clearErr, setClearErr] = useState<string | null>(null)

  async function doClear() {
    setClearing(true)
    setClearErr(null)
    try {
      await clearStale()
      await load() // re-run preflight so the warning clears
    } catch (e) {
      setClearErr((e as Error).message)
    } finally {
      setClearing(false)
    }
  }

  async function load() {
    setBusy(true)
    try {
      const [r, p] = await Promise.allSettled([fetchPreflight(), fetchInstallPlan()])
      if (r.status === 'fulfilled') setRep(r.value)
      if (p.status === 'fulfilled') setPlan(p.value)
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function doInstall() {
    if (!plan) return
    setConfirm(false)
    setInstalling(true)
    setDone(null)
    setLines([])
    startInstall()
      .then(() => {
        subscribeInstall(
          (line) => setLines((l) => [...l.slice(-400), line]),
          (d) => {
            setDone(d)
            setInstalling(false)
            load() // refresh checks so the banner clears once Docker is ready
          },
        )
      })
      .catch((e: unknown) => {
        const msg = (e as Error).message
        setLines((l) => [...l, 'Error: ' + msg])
        setDone({ state: 'failed', error: msg })
        setInstalling(false)
      })
  }

  function doStartRuntime() {
    setInstalling(true)
    setDone(null)
    setLines([])
    startRuntime()
      .then(() => {
        subscribeRuntime(
          (line) => setLines((l) => [...l.slice(-400), line]),
          (d) => {
            setDone(d)
            setInstalling(false)
            load()
          },
        )
      })
      .catch((e: unknown) => {
        const msg = (e as Error).message
        setLines((l) => [...l, 'Error: ' + msg])
        setDone({ state: 'failed', error: msg })
        setInstalling(false)
      })
  }

  if (!rep) return null

  const dockerFail = rep.checks.find((c) => c.name === 'docker' && c.status === 'fail')
  // Colima (or another runtime) is installed but just needs starting — the
  // backend hint contains "Start Runtime" when this is the case.
  const runtimeStopped = dockerFail?.message?.includes('installed but stopped') ?? false
  const fixed = rep.checks.filter((c) => c.status === 'fixed')
  const warns = rep.checks.filter((c) => c.status === 'warn')
  const showConsole = installing || lines.length > 0 || done !== null

  return (
    <section className={`apple-card p-8 border-l-8 ${rep.ok ? 'border-l-[#34C759]/40' : 'border-l-[#FF453A]/40'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${rep.ok ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#FF453A]/10 text-[#FF453A]'}`}>
            {rep.ok ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
          </div>
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-white">System Check</h2>
            <p className="text-[14px] font-medium text-zinc-500">
              {rep.ok && !dockerFail && warns.length === 0
                ? 'All checks passed — your system is ready.'
                : 'Checking if your computer is ready to run Zcash.'}
            </p>
          </div>
        </div>
        <button onClick={load} className="apple-btn-secondary px-6">
          <RefreshCw size={14} className={busy ? 'animate-spin' : ''} />
          Check Again
        </button>
      </div>

      {rep.ok && !dockerFail && warns.length === 0 && fixed.length === 0 && (
        <div className="mt-6 rounded-2xl border border-[#34C759]/20 bg-[#34C759]/5 p-4 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-[#34C759] shrink-0" />
          <div>
            <p className="text-[14px] font-semibold text-white">System is ready</p>
            <p className="text-[13px] text-zinc-400">Docker is running, ports are free, and disk space is sufficient. Click Start to launch the stack.</p>
          </div>
        </div>
      )}

      {(dockerFail || fixed.length > 0 || warns.length > 0) && (
        <div className="mt-8 space-y-4">
          {dockerFail && runtimeStopped && (
            <div className="rounded-[20px] border border-[#FF9F0A]/20 bg-[#FF9F0A]/5 p-6">
              <div className="flex items-center gap-2 text-[#FF9F0A] mb-2">
                <ShieldAlert size={14} />
                <span className="text-[12px] font-bold uppercase tracking-wider">Docker Runtime Stopped</span>
              </div>
              <p className="text-[17px] font-bold text-white">{dockerFail.message}</p>
              {dockerFail.hint && (
                <p className="mt-2 text-[14px] text-zinc-400 leading-relaxed">{dockerFail.hint}</p>
              )}

              <div className="mt-6">
                {showConsole ? (
                  <InstallConsole
                    lines={lines}
                    installing={installing}
                    done={done}
                    title="Starting runtime"
                    onRetry={doStartRuntime}
                  />
                ) : (
                  <button onClick={doStartRuntime} className="apple-btn-primary">
                    Start Docker Runtime
                  </button>
                )}
              </div>
            </div>
          )}

          {dockerFail && !runtimeStopped && (
            <div className="rounded-[20px] border border-[#FF453A]/20 bg-[#FF453A]/5 p-6">
              <div className="flex items-center gap-2 text-[#FF453A] mb-2">
                <ShieldAlert size={14} />
                <span className="text-[12px] font-bold uppercase tracking-wider">Required Tool Missing</span>
              </div>
              <p className="text-[17px] font-bold text-white">Docker is not installed</p>
              <p className="mt-2 text-[14px] text-zinc-400 leading-relaxed">{dockerFail.message}</p>

              {plan && !plan.automatic && !showConsole && (
                <a
                  href={plan.manual}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#007AFF] hover:underline"
                >
                  How to install Docker <ExternalLink size={14} />
                </a>
              )}

              {plan && plan.automatic && (
                <div className="mt-6">
                  {showConsole ? (
                    <InstallConsole
                      lines={lines}
                      installing={installing}
                      done={done}
                      manual={plan.manual}
                      title="Docker install"
                      onRetry={doInstall}
                    />
                  ) : confirm ? (
                    <div className="rounded-2xl bg-black/40 p-5 border border-white/5">
                      <p className="text-[14px] font-medium text-zinc-300 mb-3 flex items-center gap-2">
                        <Cpu size={14} className="text-[#34C759]" />
                        We will run: <code className="text-[#34C759] mx-1">{plan.command}</code>
                      </p>
                      {plan.elevated && (
                        <p className="text-[12px] text-[#FF9F0A] mb-4 leading-relaxed">
                          This needs administrator access. On Linux the launcher must run with sudo (or
                          passwordless sudo); on macOS you'll launch Docker.app once afterwards.
                        </p>
                      )}
                      <div className="flex gap-3">
                        <button onClick={doInstall} className="apple-btn-primary py-2 px-6">
                          Confirm &amp; Install
                        </button>
                        <button onClick={() => setConfirm(false)} className="apple-btn-secondary py-2 px-6">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setConfirm(true)} className="apple-btn-primary">
                      Install Docker for me
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {fixed.map((c, i) => (
            <div key={i} className="rounded-2xl border border-[#007AFF]/20 bg-[#007AFF]/5 p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">Auto-Fixed</span>
                <p className="text-[14px] font-medium text-white">{c.message}</p>
              </div>
              <div className="text-[11px] font-bold text-[#007AFF]/60 uppercase">Resolved</div>
            </div>
          ))}

          {warns.map((c, i) => (
            <div key={i} className="rounded-2xl border border-[#FF9F0A]/20 bg-[#FF9F0A]/5 p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FF9F0A]" />
                <span className="text-[11px] font-bold text-[#FF9F0A] uppercase tracking-wider">Recommendation</span>
              </div>
              <p className="text-[14px] font-medium text-white">{c.message}</p>
              {c.hint && <p className="mt-1 text-[13px] text-zinc-500">{c.hint}</p>}

              {c.name === 'stale-stack' && (
                <div className="mt-4">
                  <button onClick={doClear} disabled={clearing} className="apple-btn-secondary">
                    {clearing ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <Eraser size={14} />
                    )}
                    Clear stale containers
                  </button>
                  <p className="mt-2 text-[12px] text-zinc-500">
                    Removes the leftover containers only — your synced chain and wallet are kept.
                  </p>
                  {clearErr && <p className="mt-2 text-[12px] font-medium text-[#FF453A]">{clearErr}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function InstallConsole({
  lines,
  installing,
  done,
  manual,
  title = 'Docker install',
  onRetry,
}: {
  lines: string[]
  installing: boolean
  done: InstallDone | null
  manual?: string
  title?: string
  onRetry: () => void
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    boxRef.current?.scrollTo(0, boxRef.current.scrollHeight)
  }, [lines])

  const tone = installTone(done?.state, done?.error)
  const toneColor =
    tone === 'success' ? 'text-[#34C759]' : tone === 'error' ? 'text-[#FF453A]' : 'text-zinc-400'

  return (
    <div className="rounded-2xl bg-black/50 border border-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-zinc-300">
          <Terminal size={14} className="text-zinc-400" />
          {title}
        </div>
        <div className="flex items-center gap-2 text-[12px] font-semibold">
          {installing && <RefreshCw size={13} className="animate-spin text-[#007AFF]" />}
          {tone === 'success' && <CheckCircle2 size={14} className="text-[#34C759]" />}
          {tone === 'error' && <XCircle size={14} className="text-[#FF453A]" />}
          <span className={toneColor}>{installLabel(tone)}</span>
        </div>
      </div>
      {installing && <div className="line-loader" />}
      <div
        ref={boxRef}
        className="h-48 overflow-auto p-4 font-mono text-[12px] leading-relaxed text-zinc-400"
      >
        {lines.length === 0 ? (
          <p className="text-zinc-600">starting…</p>
        ) : (
          lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap break-all">
              {l}
            </div>
          ))
        )}
      </div>
      {done && tone === 'error' && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/5">
          <a
            href={manual}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-semibold text-[#007AFF] hover:underline inline-flex items-center gap-1"
          >
            Manual install <ExternalLink size={13} />
          </a>
          <button onClick={onRetry} className="apple-btn-secondary py-1.5 px-4 text-[13px]">
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
