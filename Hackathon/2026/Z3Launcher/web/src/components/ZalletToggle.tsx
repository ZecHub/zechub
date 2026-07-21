import { useEffect, useState } from 'react'
import { fetchZalletStatus, toggleZallet, type ZalletStatus } from '../api'

export function ZalletToggle() {
  const [status, setStatus] = useState<ZalletStatus | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function refresh() {
    try {
      setStatus(await fetchZalletStatus())
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    refresh()
    const t = setInterval(refresh, 5000)
    return () => clearInterval(t)
  }, [])

  async function toggle() {
    if (!status) return
    setBusy(true)
    setErr(null)
    try {
      await toggleZallet(!status.enabled)
      await refresh()
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="apple-card p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[20px] font-bold tracking-tight">Zallet Wallet</h3>
          <p className="text-[14px] font-medium text-zinc-500">
            Optional full-node CLI wallet that completes the Z3 stack.
          </p>
        </div>
        <span className="rounded-full bg-[#FF9F0A]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FF9F0A]">
          Alpha
        </span>
      </div>

      <p className="text-[13px] font-medium text-zinc-500 leading-relaxed mb-6 max-w-lg">
        Zallet is the Zcash Foundation's replacement for zcashd's built-in wallet.
        Enable it to create addresses, check balances, and send transactions
        directly from your node. Currently alpha — some features may not work.
      </p>

      <div className="flex items-center gap-6">
        <button
          disabled={busy}
          onClick={toggle}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${
            status?.enabled
              ? 'bg-[#34C759]'
              : 'bg-zinc-700'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform duration-200 ${
              status?.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold">
            {busy ? 'Updating...' : status?.enabled ? 'Enabled' : 'Disabled'}
          </span>
          <span className="text-[12px] text-zinc-500">
            {status?.enabled
              ? 'Zallet container is running on port 28232'
              : 'Click to start the Zallet service'}
          </span>
        </div>
      </div>

      {err && (
        <p className="mt-4 text-[13px] font-semibold text-[#FF453A]">{err}</p>
      )}

      <p className="mt-6 text-[11px] text-zinc-600 italic">
        This setting resets when the launcher restarts. Use <code className="text-zinc-400">--with-zallet</code> for permanent activation.
      </p>
    </section>
  )
}
