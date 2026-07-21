import { useState, useEffect, useCallback, useRef } from 'react'
import {
  fetchZalletStatus,
  fetchWalletStatus,
  walletTotalBalance,
  walletListAccounts,
  walletListUnspent,
  walletListTransactions,
  walletNewAccount,
  aggregateBalances,
  type WalletAccount,
  type AccountBalance,
  type TotalBalance,
  type WalletTx,
} from '../api'
import { formatZec, shortenAddr } from '../format'
import { WalletConsole } from './WalletConsole'
import { SendSheet } from './SendSheet'
import { ReceiveSheet } from './ReceiveSheet'
import {
  Wallet, ArrowUpRight, ArrowDownLeft, Plus, RefreshCw, ChevronRight, ArrowLeft,
  Terminal, ShieldCheck, Box, Clock,
} from 'lucide-react'
import { CopyButton, Spinner, accountLabel } from './walletShared'
import { WalletSetup } from './WalletSetup'

export function WalletDashboard() {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [provisioned, setProvisioned] = useState<boolean | null>(null)
  const [setupActive, setSetupActive] = useState(false)
  const [reachable, setReachable] = useState(false)
  const [total, setTotal] = useState<TotalBalance | null>(null)
  const [accounts, setAccounts] = useState<WalletAccount[]>([])
  const [balances, setBalances] = useState<Map<string, AccountBalance>>(new Map())
  const [txs, setTxs] = useState<WalletTx[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [sendFor, setSendFor] = useState<string | null | undefined>(undefined)
  const [receiveFor, setReceiveFor] = useState<string | null | undefined>(undefined)
  const [creating, setCreating] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [showConsole, setShowConsole] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  // Guards the one-time automatic creation of the wallet's first account.
  const autoAccountTried = useRef(false)

  const refresh = useCallback(async () => {
    setRefreshing(true)
    try {
      const zs = await fetchZalletStatus()
      setEnabled(zs.enabled)
      if (!zs.enabled) { setReachable(false); return }
      const ws = await fetchWalletStatus()
      setProvisioned(ws.provisioned ?? false)
      // Latch into the setup flow once a wallet doesn't exist yet, and stay there
      // until the user finishes it (onDone). Otherwise, the moment Create flips
      // provisioned=true the parent would re-gate and UNMOUNT WalletSetup —
      // destroying the one-time seed-reveal screen before the user backs it up.
      if (!ws.provisioned) setSetupActive(true)
      setReachable(ws.reachable)
      if (!ws.reachable) return
      const [t, accs, unspent, transactions] = await Promise.all([
        walletTotalBalance().catch(() => null),
        walletListAccounts().catch(() => [] as WalletAccount[]),
        walletListUnspent(0).catch(() => []),
        walletListTransactions().catch(() => [] as WalletTx[]),
      ])
      setTotal(t)
      setBalances(aggregateBalances(unspent))
      setTxs([...transactions].sort((a, b) => (b.mined_height ?? Number.MAX_SAFE_INTEGER) - (a.mined_height ?? Number.MAX_SAFE_INTEGER)))
      setErr(null)
      // A freshly-created (or restored) Zallet wallet has a seed but zero
      // accounts — so there's no receive address and nothing to send. Derive the
      // first account once, automatically, so the wallet is usable out of the
      // box. Account 0 is deterministic from the seed, so this also recovers a
      // restored wallet's original addresses after the chain rescan.
      let list = accs
      if (accs.length === 0 && !autoAccountTried.current) {
        autoAccountTried.current = true
        try {
          await walletNewAccount('Main')
          list = await walletListAccounts().catch(() => accs)
        } catch {
          autoAccountTried.current = false // let the manual "New account" button retry
        }
      }
      setAccounts([...list].sort((a, b) => a.account - b.account))
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const t = setInterval(refresh, 8000)
    return () => clearInterval(t)
  }, [refresh])

  async function createAccount() {
    setCreating(true)
    try {
      await walletNewAccount(`Account ${accounts.length}`)
      await refresh()
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setCreating(false)
    }
  }

  // ---- Gated states -------------------------------------------------------
  if (enabled === false) {
    return (
      <div className="z3-card p-12 text-center">
        <div
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[24px] border"
          style={{ borderColor: 'var(--line)', background: 'var(--surface-2)' }}
        >
          <Wallet size={32} style={{ color: 'var(--muted)' }} strokeWidth={1.5} />
        </div>
        <h3 className="mb-3 text-[24px] font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Wallet not enabled</h3>
        <p className="mx-auto max-w-sm text-[15px] font-medium leading-relaxed" style={{ color: 'var(--faint)' }}>
          Toggle Zallet on in the control bar and start the system to open your wallet.
        </p>
      </div>
    )
  }

  // Enabled but no wallet yet (or setup still in progress) → run the
  // create/restore flow. The latch keeps WalletSetup mounted through the
  // one-time seed reveal even after Create flips provisioned=true.
  if (enabled === true && setupActive) {
    return <WalletSetup onDone={() => { setSetupActive(false); refresh() }} />
  }

  if (enabled === null || provisioned === null || (!reachable && !total)) {
    return (
      <div className="z3-card flex flex-col items-center justify-center p-16 text-center">
        <Spinner size={24} />
        <p className="mt-5 text-[15px] font-semibold" style={{ color: 'var(--fg)' }}>Connecting to your wallet…</p>
        <p className="mt-1 text-[13px] font-medium" style={{ color: 'var(--faint)' }}>Waiting for Zallet to come online.</p>
      </div>
    )
  }

  const selectedAccount = accounts.find((a) => a.account_uuid === selected)

  const richestUuid = () =>
    accounts.reduce<string | undefined>((best, a) => {
      const v = balances.get(a.account_uuid)?.total ?? 0
      const bv = best ? balances.get(best)?.total ?? 0 : -1
      return v > bv ? a.account_uuid : best
    }, undefined)

  return (
    <div className="flex flex-col gap-[18px]">
      {selectedAccount ? (
        <AccountDetail
          account={selectedAccount}
          balance={balances.get(selectedAccount.account_uuid)}
          txs={txs.filter((t) => t.account_uuid === selectedAccount.account_uuid)}
          onBack={() => setSelected(null)}
          onSend={() => setSendFor(selectedAccount.account_uuid)}
          onReceive={() => setReceiveFor(selectedAccount.account_uuid)}
        />
      ) : (
        <Overview
          total={total}
          accounts={accounts}
          balances={balances}
          txs={txs}
          refreshing={refreshing}
          creating={creating}
          onRefresh={refresh}
          onCreate={createAccount}
          onSelect={setSelected}
          onSend={() => setSendFor(richestUuid() ?? null)}
          onReceive={() => setReceiveFor(null)}
        />
      )}

      {err && <p className="px-1 text-[12px] font-medium" style={{ color: 'var(--red)' }}>{err}</p>}

      {/* Developer console (hidden by default) */}
      <div className="pt-2">
        <button
          onClick={() => setShowConsole((v) => !v)}
          className="flex items-center gap-2 text-[12px] font-semibold transition-colors"
          style={{ color: 'var(--faint)' }}
        >
          <Terminal size={13} />
          {showConsole ? 'Hide developer console' : 'Developer console'}
        </button>
        {showConsole && (
          <div className="mt-4">
            <WalletConsole />
          </div>
        )}
      </div>

      {/* Sheets */}
      {sendFor !== undefined && accounts.length > 0 && (
        <SendSheet
          accounts={accounts}
          balances={balances}
          defaultFromUuid={sendFor ?? selected ?? undefined}
          onClose={() => setSendFor(undefined)}
          onSent={refresh}
        />
      )}
      {receiveFor !== undefined && accounts.length > 0 && (
        <ReceiveSheet
          accounts={accounts}
          defaultAccountUuid={receiveFor ?? selected ?? undefined}
          onClose={() => setReceiveFor(undefined)}
        />
      )}
    </div>
  )
}

// ---- Overview -------------------------------------------------------------
function Overview({
  total, accounts, balances, txs, refreshing, creating, onRefresh, onCreate, onSelect, onSend, onReceive,
}: {
  total: TotalBalance | null
  accounts: WalletAccount[]
  balances: Map<string, AccountBalance>
  txs: WalletTx[]
  refreshing: boolean
  creating: boolean
  onRefresh: () => void
  onCreate: () => void
  onSelect: (uuid: string) => void
  onSend: () => void
  onReceive: () => void
}) {
  const totalZec = total ? parseFloat(total.total) : 0
  const transparent = total ? parseFloat(total.transparent) : 0
  const shielded = total ? parseFloat(total.private) : 0

  return (
    <>
      {/* Hero balance */}
      <section className="z3-card relative overflow-hidden p-[30px_32px]">
        <div
          className="pointer-events-none absolute -right-[70px] -top-[70px] h-[240px] w-[240px] rounded-full"
          style={{ background: 'var(--gold-soft)', filter: 'blur(60px)' }}
        />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-bold uppercase tracking-[0.07em]" style={{ color: 'var(--faint)' }}>
                Total balance
              </span>
              <span
                className="rounded-[5px] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em]"
                style={{ color: 'var(--gold-text)', background: 'var(--gold-soft)' }}
                title="Zallet — Zcash's full-node wallet, the successor to the zcashd wallet (alpha)"
              >
                Zallet
              </span>
            </div>
            <div className="mt-[10px] flex items-baseline gap-[9px]">
              <span className="text-[46px] font-bold leading-none tracking-[-0.03em] tabular-nums" style={{ color: 'var(--fg)' }}>
                {formatZec(totalZec)}
              </span>
              <span className="text-[20px] font-semibold" style={{ color: 'var(--muted)' }}>ZEC</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-[9px]">
              <Pill icon={<ShieldCheck size={12} />} tint="var(--gold-text)" label="Shielded" value={formatZec(shielded)} />
              <Pill icon={<Box size={12} />} tint="var(--faint)" label="Transparent" value={formatZec(transparent)} />
            </div>
          </div>
          <button
            onClick={onRefresh}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{ color: 'var(--faint)' }}
            title="Refresh"
          >
            <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="relative mt-[24px] flex max-w-[420px] gap-[11px]">
          <button onClick={onSend} className="z3-btn z3-btn-primary flex-1">
            <ArrowUpRight size={16} strokeWidth={2.5} /> Send
          </button>
          <button onClick={onReceive} className="z3-btn z3-btn-secondary flex-1">
            <ArrowDownLeft size={16} strokeWidth={2.5} /> Receive
          </button>
        </div>
      </section>

      {/* Accounts */}
      <section className="z3-card overflow-hidden">
        <div className="flex items-center justify-between border-b p-[17px_22px]" style={{ borderColor: 'var(--line)' }}>
          <h4 className="text-[11.5px] font-bold uppercase tracking-[0.07em]" style={{ color: 'var(--faint)' }}>Accounts</h4>
          <button
            onClick={onCreate}
            disabled={creating}
            className="flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors disabled:opacity-40"
            style={{ color: 'var(--gold-text)' }}
          >
            {creating ? <Spinner size={12} /> : <Plus size={13} strokeWidth={2.5} />}
            New account
          </button>
        </div>
        <div>
          {accounts.map((a, i) => {
            const b = balances.get(a.account_uuid)
            return (
              <button
                key={a.account_uuid}
                onClick={() => onSelect(a.account_uuid)}
                className="group flex w-full items-center gap-[15px] p-[15px_22px] text-left transition-colors"
                style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}
              >
                <div
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px]"
                  style={{ background: 'var(--gold-soft)', color: 'var(--gold-text)' }}
                >
                  <Wallet size={18} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14.5px] font-semibold" style={{ color: 'var(--fg)' }}>{accountLabel(a.name, a.account)}</p>
                  <p className="truncate text-[11.5px]" style={{ color: 'var(--faint)', fontFamily: 'var(--font-mono)' }}>
                    {shortenAddr(a.addresses?.[0]?.ua ?? '', 14, 8)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14.5px] font-semibold tabular-nums" style={{ color: 'var(--fg)' }}>
                    {formatZec(b?.total ?? 0)} <span className="text-[11px] font-medium" style={{ color: 'var(--faint)' }}>ZEC</span>
                  </p>
                  {b && b.pending > 0 && (
                    <p className="text-[11px] font-semibold" style={{ color: 'var(--gold-text)' }}>+{formatZec(b.pending)} pending</p>
                  )}
                </div>
                <ChevronRight size={16} style={{ color: 'var(--faint)', opacity: 0.6 }} />
              </button>
            )
          })}
        </div>
      </section>

      <ActivityList txs={txs} accounts={accounts} title="Recent activity" />
    </>
  )
}

// ---- Account detail (drill-in) -------------------------------------------
function AccountDetail({
  account, balance, txs, onBack, onSend, onReceive,
}: {
  account: WalletAccount
  balance?: AccountBalance
  txs: WalletTx[]
  onBack: () => void
  onSend: () => void
  onReceive: () => void
}) {
  const ua = account.addresses?.[0]?.ua ?? ''
  const pools = balance?.pools
  return (
    <>
      <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors" style={{ color: 'var(--muted)' }}>
        <ArrowLeft size={15} /> All accounts
      </button>

      <section className="z3-card p-[30px_32px]">
        <span className="text-[11.5px] font-bold uppercase tracking-[0.07em]" style={{ color: 'var(--faint)' }}>
          {accountLabel(account.name, account.account)}
        </span>
        <div className="mt-[10px] flex items-baseline gap-[9px]">
          <span className="text-[40px] font-bold leading-none tracking-[-0.03em] tabular-nums" style={{ color: 'var(--fg)' }}>
            {formatZec(balance?.total ?? 0)}
          </span>
          <span className="text-[18px] font-semibold" style={{ color: 'var(--muted)' }}>ZEC</span>
        </div>
        {pools && (
          <div className="mt-4 flex flex-wrap gap-[9px]">
            <Pill icon={<ShieldCheck size={12} />} tint="var(--gold-text)" label="Orchard" value={formatZec(pools.orchard)} />
            <Pill icon={<ShieldCheck size={12} />} tint="var(--gold-text)" label="Sapling" value={formatZec(pools.sapling)} />
            <Pill icon={<Box size={12} />} tint="var(--faint)" label="Transparent" value={formatZec(pools.transparent)} />
          </div>
        )}
        <div className="mt-[24px] flex max-w-[420px] gap-[11px]">
          <button onClick={onSend} className="z3-btn z3-btn-primary flex-1">
            <ArrowUpRight size={16} strokeWidth={2.5} /> Send
          </button>
          <button onClick={onReceive} className="z3-btn z3-btn-secondary flex-1">
            <ArrowDownLeft size={16} strokeWidth={2.5} /> Receive
          </button>
        </div>
      </section>

      <section className="z3-card p-[24px]">
        <h4 className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.07em]" style={{ color: 'var(--faint)' }}>Default address</h4>
        <div className="rounded-[12px] border p-4" style={{ borderColor: 'var(--line)', background: 'var(--input)' }}>
          <p className="break-all text-[12px] leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{ua}</p>
          <div className="mt-3"><CopyButton text={ua} label="Copy address" /></div>
        </div>
      </section>

      <ActivityList txs={txs} accounts={[account]} title="Account activity" />
    </>
  )
}

// ---- Shared bits ----------------------------------------------------------
function Pill({ icon, tint, label, value }: { icon: React.ReactNode; tint: string; label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-full border px-3 py-1.5"
      style={{ borderColor: 'var(--line)', background: 'var(--surface-2)' }}
    >
      <span style={{ color: tint }}>{icon}</span>
      <span className="text-[11px] font-semibold" style={{ color: 'var(--muted)' }}>{label}</span>
      <span className="text-[11px] font-bold tabular-nums" style={{ color: 'var(--fg)' }}>{value}</span>
    </div>
  )
}

function ActivityList({ txs, accounts, title }: { txs: WalletTx[]; accounts: WalletAccount[]; title: string }) {
  const nameOf = (uuid: string) => {
    const a = accounts.find((x) => x.account_uuid === uuid)
    return a ? accountLabel(a.name, a.account) : 'Account'
  }
  return (
    <section className="z3-card overflow-hidden">
      <div className="border-b p-[17px_22px]" style={{ borderColor: 'var(--line)' }}>
        <h4 className="text-[11.5px] font-bold uppercase tracking-[0.07em]" style={{ color: 'var(--faint)' }}>{title}</h4>
      </div>
      {txs.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <Clock size={22} className="mx-auto mb-2" style={{ color: 'var(--faint)', opacity: 0.6 }} />
          <p className="text-[13px] font-medium" style={{ color: 'var(--faint)' }}>No transactions yet</p>
        </div>
      ) : (
        <div className="custom-scrollbar max-h-[420px] overflow-auto">
          {txs.slice(0, 50).map((t, i) => {
            const zec = t.account_balance_delta / 1e8
            const received = zec >= 0
            return (
              <div
                key={`${t.txid}-${i}`}
                className="flex items-center gap-[14px] p-[13px_22px]"
                style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-[10px]"
                  style={{
                    background: received ? 'var(--green-soft)' : 'var(--surface-2)',
                    color: received ? 'var(--green)' : 'var(--muted)',
                  }}
                >
                  {received ? <ArrowDownLeft size={15} strokeWidth={2.2} /> : <ArrowUpRight size={15} strokeWidth={2.2} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold" style={{ color: 'var(--fg)' }}>{received ? 'Received' : 'Sent'}</p>
                  <p className="truncate text-[11.5px]" style={{ color: 'var(--faint)', fontFamily: 'var(--font-mono)' }}>
                    {accounts.length > 1 ? `${nameOf(t.account_uuid)} · ` : ''}
                    {t.mined_height ? `block ${t.mined_height}` : 'pending'}
                  </p>
                </div>
                <p
                  className="text-[13.5px] font-semibold tabular-nums"
                  style={{ color: received ? 'var(--green)' : 'var(--fg)' }}
                >
                  {received ? '+' : '−'}{formatZec(Math.abs(zec))} ZEC
                </p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
