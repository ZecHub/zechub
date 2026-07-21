import { useEffect, useState } from 'react'
import { runRegtestSeed, fetchRegtestStatus, type SeedResult } from '../api'

export function RegtestSeeder() {
  const [reachable, setReachable] = useState<boolean | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [result, setResult] = useState<SeedResult | null>(null)
  const [blocks, setBlocks] = useState(10)

  useEffect(() => {
    let cancel = false
    async function check() {
      try {
        const r = await fetchRegtestStatus()
        if (!cancel) setReachable(r.reachable)
      } catch {
        if (!cancel) setReachable(false)
      }
    }
    check()
    const t = setInterval(check, 5000)
    return () => {
      cancel = true
      clearInterval(t)
    }
  }, [])

  async function seed() {
    setBusy(true)
    setErr(null)
    try {
      const r = await runRegtestSeed(blocks)
      setResult(r)
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="apple-card p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight">Test Environment</h2>
          <p className="text-[14px] font-medium text-zinc-500">Mine blocks on your local regtest chain.</p>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
          reachable
            ? 'bg-[#34C759]/10 text-[#34C759]'
            : 'bg-zinc-800 text-zinc-500'
        }`}>
          {reachable == null ? 'Scanning...' : reachable ? 'Node Active' : 'Node Offline'}
        </div>
      </div>

      <p className="text-[14px] font-medium text-zinc-400 leading-relaxed max-w-lg">
        Mine blocks to advance the regtest chain. Coinbase rewards go to the
        configured miner address.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-semibold text-zinc-400">Blocks</label>
          <input
            type="number"
            min={1}
            max={1000}
            value={blocks}
            onChange={(e) => setBlocks(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
            className="w-20 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-[13px] font-medium text-white text-center focus:border-blue-500/50 focus:outline-none transition-colors"
          />
        </div>
        <button
          disabled={busy || !reachable}
          onClick={seed}
          className="apple-btn-primary px-8"
        >
          {busy ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Mining...
            </span>
          ) : (
            `Mine ${blocks} Block${blocks === 1 ? '' : 's'}`
          )}
        </button>
      </div>

      {err && <p className="mt-4 text-[13px] font-semibold text-[#FF453A]">{err}</p>}

      {result && (
        <div className="mt-8 rounded-2xl border border-[#34C759]/20 bg-[#34C759]/5 p-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <p className="text-[13px] font-bold text-[#34C759] uppercase tracking-wider">Mining Complete</p>
            <span className="text-[12px] font-medium text-zinc-400 tabular-nums">
              {result.minedBlocks} blocks mined — tip at {result.tipHeight}
            </span>
          </div>
          <p className="text-[13px] font-medium text-zinc-400">{result.message}</p>

          {result.accounts?.length > 0 && (
            <div className="mt-4 space-y-3">
              {result.accounts.map((a, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="text-[11px] font-bold text-zinc-600 w-4">#{i}</span>
                  <code className="flex-1 truncate font-mono text-[13px] text-zinc-300 group-hover:text-white transition-colors">{a.address}</code>
                  <button
                    onClick={() => navigator.clipboard?.writeText(a.address)}
                    className="rounded-lg bg-white/5 px-3 py-1 text-[11px] font-bold text-zinc-400 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
