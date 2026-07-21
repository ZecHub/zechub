import { useEffect, useState, useCallback } from 'react'
import { fetchWalletStatus, fetchZalletStatus, walletRPC, type WalletStatus, type ZalletStatus } from '../api'
import { Wallet, Plus, List, ArrowUpDown, Hash, CircleDollarSign, Terminal, Send, Copy, Trash2, ChevronRight } from 'lucide-react'

interface RPCResult {
  method: string
  data?: any
  error?: string
  ts: number
}

export function WalletConsole() {
  const [walletStatus, setWalletStatus] = useState<WalletStatus | null>(null)
  const [zalletStatus, setZalletStatus] = useState<ZalletStatus | null>(null)
  const [results, setResults] = useState<RPCResult[]>([])
  const [customMethod, setCustomMethod] = useState('')
  const [customParams, setCustomParams] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const refresh = useCallback(async () => {
    try {
      const [ws, zs] = await Promise.all([fetchWalletStatus(), fetchZalletStatus()])
      setWalletStatus(ws)
      setZalletStatus(zs)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    refresh()
    const t = setInterval(refresh, 5000)
    return () => clearInterval(t)
  }, [refresh])

  async function callRPC(method: string, params?: any[] | Record<string, any>) {
    setBusy(method)
    const res = await walletRPC(method, params)
    setResults((prev) => [
      { method, data: res.result, error: res.error?.message, ts: Date.now() },
      ...prev.slice(0, 29),
    ])
    setBusy(null)
  }

  async function callCustom() {
    if (!customMethod.trim()) return
    let params: any
    if (customParams.trim()) {
      try {
        params = JSON.parse(customParams)
        if (!Array.isArray(params) && typeof params !== 'object') params = [params]
      } catch {
        setResults((prev) => [
          { method: customMethod, error: 'Invalid JSON params', ts: Date.now() },
          ...prev.slice(0, 29),
        ])
        return
      }
    }
    await callRPC(customMethod.trim(), params)
  }

  function copyResult(r: RPCResult) {
    const text = r.error || JSON.stringify(r.data, null, 2)
    navigator.clipboard?.writeText(text)
    setCopied(r.ts)
    setTimeout(() => setCopied(null), 1500)
  }

  const reachable = walletStatus?.reachable ?? false
  const enabled = zalletStatus?.enabled ?? false

  // Disabled state — wallet not enabled
  if (!enabled) {
    return (
      <div className="apple-card p-12 text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-b from-white/10 to-white/5 border border-white/10">
          <Wallet size={32} className="text-zinc-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-[24px] font-bold tracking-tight mb-3">Wallet Not Enabled</h3>
        <p className="text-[15px] font-medium text-zinc-500 max-w-sm mx-auto leading-relaxed">
          Toggle Zallet on in the control bar and start the system to use the wallet console.
        </p>
      </div>
    )
  }

  const actionGroups = [
    {
      title: 'Account',
      actions: [
        { label: 'New Account', method: 'z_getnewaccount', params: { account_name: 'account-' + Date.now() }, icon: Plus, accent: 'text-[#34C759]' },
        { label: 'List Accounts', method: 'z_listaccounts', icon: List, accent: 'text-[#007AFF]' },
        { label: 'Addresses', method: 'listaddresses', icon: Hash, accent: 'text-[#5856D6]' },
      ],
    },
    {
      title: 'Balance',
      actions: [
        { label: 'Total Balance', method: 'z_gettotalbalance', params: [0, true], icon: CircleDollarSign, accent: 'text-[#FF9F0A]' },
        { label: 'Wallet Info', method: 'getwalletinfo', icon: Wallet, accent: 'text-[#64D2FF]' },
        { label: 'Notes Count', method: 'z_getnotescount', params: [0], icon: Hash, accent: 'text-[#BF5AF2]' },
      ],
    },
    {
      title: 'Activity',
      actions: [
        { label: 'Transactions', method: 'z_listtransactions', icon: ArrowUpDown, accent: 'text-[#30D158]' },
        { label: 'Unspent Notes', method: 'z_listunspent', params: [0], icon: List, accent: 'text-[#FF375F]' },
        { label: 'All Methods', method: 'help', icon: Terminal, accent: 'text-zinc-400' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Connection status */}
      <div className="apple-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`relative flex h-9 w-9 items-center justify-center rounded-xl ${reachable ? 'bg-[#34C759]/10' : 'bg-[#FF453A]/10'}`}>
              <Wallet size={18} className={reachable ? 'text-[#34C759]' : 'text-[#FF453A]'} strokeWidth={2} />
              <div className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0d0d0d] ${reachable ? 'bg-[#34C759]' : 'bg-[#FF453A] animate-pulse'}`} />
            </div>
            <div>
              <span className="text-[14px] font-semibold block">
                {reachable ? 'Zallet Connected' : 'Connecting...'}
              </span>
              <span className="text-[11px] font-medium text-zinc-500">
                {reachable ? 'Port 28232' : 'Waiting for wallet to start'}
              </span>
            </div>
          </div>
          <span className="rounded-full bg-[#FF9F0A]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF9F0A]">
            Alpha
          </span>
        </div>
      </div>

      {/* Action groups — 3 columns */}
      <div className="grid grid-cols-3 gap-4">
        {actionGroups.map((group) => (
          <div key={group.title} className="apple-card p-5 space-y-3">
            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{group.title}</h4>
            <div className="space-y-1">
              {group.actions.map((action) => {
                const Icon = action.icon
                const loading = busy === action.method
                return (
                  <button
                    key={action.method}
                    disabled={!reachable || busy !== null}
                    onClick={() => callRPC(action.method, action.params)}
                    className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-left transition-all duration-150 hover:bg-white/5 active:scale-[0.98] disabled:opacity-30 disabled:hover:bg-transparent group"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${action.accent}`}>
                      {loading ? (
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Icon size={15} strokeWidth={2} />
                      )}
                    </div>
                    <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white transition-colors flex-1">
                      {action.label}
                    </span>
                    <ChevronRight size={12} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Custom RPC */}
      <div className="apple-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={14} className="text-zinc-500" />
          <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">RPC Console</h4>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customMethod}
              onChange={(e) => setCustomMethod(e.target.value)}
              placeholder="Method"
              className="w-full rounded-xl bg-white/5 border border-white/8 px-4 py-2.5 text-[13px] font-medium text-white placeholder:text-zinc-600 focus:border-[#007AFF]/50 focus:bg-white/8 focus:outline-none transition-all"
              onKeyDown={(e) => e.key === 'Enter' && callCustom()}
            />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              value={customParams}
              onChange={(e) => setCustomParams(e.target.value)}
              placeholder='Params — e.g. [0, true] or {"key":"val"}'
              className="w-full rounded-xl bg-white/5 border border-white/8 px-4 py-2.5 text-[13px] font-medium text-white placeholder:text-zinc-600 focus:border-[#007AFF]/50 focus:bg-white/8 focus:outline-none transition-all font-mono"
              onKeyDown={(e) => e.key === 'Enter' && callCustom()}
            />
          </div>
          <button
            disabled={!reachable || busy !== null || !customMethod.trim()}
            onClick={callCustom}
            className="flex items-center gap-2 rounded-xl bg-[#007AFF] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#007AFF]/90 active:scale-[0.97] disabled:opacity-30"
          >
            <Send size={13} strokeWidth={2.5} />
            Run
          </button>
        </div>
      </div>

      {/* Results feed */}
      {results.length > 0 && (
        <div className="apple-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Output</h4>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-bold text-zinc-500 tabular-nums">
                {results.length}
              </span>
            </div>
            <button
              onClick={() => setResults([])}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <Trash2 size={11} />
              Clear
            </button>
          </div>
          <div className="max-h-[480px] overflow-auto custom-scrollbar divide-y divide-white/5">
            {results.map((r) => (
              <div
                key={r.ts}
                className={`px-5 py-4 transition-colors ${r.error ? 'bg-[#FF453A]/3' : 'hover:bg-white/2'}`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${r.error ? 'bg-[#FF453A]' : 'bg-[#34C759]'}`} />
                    <code className="text-[13px] font-bold text-white">{r.method}</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-zinc-600 tabular-nums">
                      {new Date(r.ts).toLocaleTimeString()}
                    </span>
                    <button
                      onClick={() => copyResult(r)}
                      className="flex items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-300 transition-colors"
                    >
                      <Copy size={10} />
                      {copied === r.ts ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                {r.error ? (
                  <p className="text-[12px] font-medium text-[#FF453A]/80 pl-4">{r.error}</p>
                ) : (
                  <pre className="overflow-auto rounded-xl bg-black/50 p-4 font-mono text-[11px] leading-[1.6] text-zinc-300 border border-white/5 max-h-52 custom-scrollbar">
                    {typeof r.data === 'string' ? r.data : JSON.stringify(r.data, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
