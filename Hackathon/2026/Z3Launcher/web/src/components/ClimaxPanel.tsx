import { useEffect, useState } from 'react'
import { fetchClimaxStatus, runClimax, type ClimaxResult, type ClimaxStatus } from '../api'

export function ClimaxPanel() {
  const [status, setStatus] = useState<ClimaxStatus | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [result, setResult] = useState<ClimaxResult | null>(null)

  async function refresh() {
    try {
      setStatus(await fetchClimaxStatus())
    } catch (e) {
      setErr((e as Error).message)
    }
  }

  useEffect(() => {
    refresh()
    const t = setInterval(refresh, 5000)
    return () => clearInterval(t)
  }, [])

  async function run() {
    setBusy(true)
    setErr(null)
    try {
      setResult(await runClimax())
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const modeClass = (m?: string) => {
    if (m === 'shielded-action') return 'border-[#34C759]/20 bg-[#34C759]/5 text-[#34C759]'
    if (m === 'fallback') return 'border-[#FF9F0A]/20 bg-[#FF9F0A]/5 text-[#FF9F0A]'
    return 'border-[#FF453A]/20 bg-[#FF453A]/5 text-[#FF453A]'
  }

  return (
    <section className="apple-card p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight">Test Your Wallet</h2>
          <p className="text-[14px] font-medium text-zinc-500">Run a real test to make sure everything works.</p>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
          status?.ready 
            ? 'bg-[#34C759]/10 text-[#34C759]' 
            : 'bg-zinc-800 text-zinc-500'
        }`}>
          {status?.ready ? 'Ready to test' : 'Waiting for system...'}
        </div>
      </div>
      
      <p className="text-[14px] font-medium text-zinc-400 leading-relaxed max-w-lg">
        Verifies your node stack is working end-to-end. On regtest this tests
        via direct RPC calls; on mainnet/testnet it uses a Zingo wallet if installed.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button
          disabled={busy || !status?.ready}
          onClick={run}
          className="apple-btn-primary px-10 py-3"
        >
          {busy ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
          ) : (
            'Run Test Now'
          )}
        </button>
        
        {status?.wallet && (
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Test Method</span>
            <code className="text-[13px] font-bold text-zinc-300">{status.wallet}</code>
          </div>
        )}
      </div>

      {status && !status.ready && (
        <div className="mt-6 rounded-2xl bg-white/[0.02] border border-white/5 p-4 text-[13px] font-medium text-[#FF9F0A]/80 italic">
          Note: {status.message}
        </div>
      )}

      {err && <p className="mt-4 text-[13px] font-semibold text-[#FF453A] uppercase tracking-tighter">{err}</p>}

      {result && (
        <div className={`mt-8 rounded-[24px] border p-6 shadow-2xl ${modeClass(result.mode)}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-2 w-2 rounded-full ${result.mode === 'shielded-action' ? 'bg-[#34C759]' : 'bg-[#FF9F0A]'}`} />
            <p className="text-[16px] font-bold">
              {result.mode === 'shielded-action'
                ? 'Test Successful!'
                : result.mode === 'fallback'
                  ? 'Partial Success'
                  : 'Test Failed'}
            </p>
          </div>
          <p className="text-[14px] font-medium opacity-90 leading-relaxed">{result.message}</p>
          {result.output && (
            <div className="mt-6">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">Technical Output</p>
              <pre className="overflow-auto rounded-2xl bg-black/60 p-6 font-mono text-[12px] leading-relaxed text-[#34C759]/90 border border-white/5 max-h-64 custom-scrollbar">
                {result.output}
              </pre>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
