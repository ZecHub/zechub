import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { RefreshCw, ChevronDown } from 'lucide-react'
import {
  walletAddressForAccount,
  walletUnifiedReceivers,
  type WalletAccount,
} from '../api'
import { shortenAddr } from '../format'
import { Modal, CopyButton, Spinner, Field, accountLabel, inputClass } from './walletShared'

const RECEIVER_META: Record<string, { label: string; tint: string }> = {
  orchard: { label: 'Orchard (shielded)', tint: 'text-[#BF5AF2]' },
  sapling: { label: 'Sapling (shielded)', tint: 'text-[#5856D6]' },
  p2pkh: { label: 'Transparent', tint: 'text-[#FF9F0A]' },
}

export function ReceiveSheet({
  accounts,
  defaultAccountUuid,
  onClose,
}: {
  accounts: WalletAccount[]
  defaultAccountUuid?: string
  onClose: () => void
}) {
  const initial = accounts.find((a) => a.account_uuid === defaultAccountUuid) ?? accounts[0]
  const [acct, setAcct] = useState<WalletAccount | undefined>(initial)
  const [address, setAddress] = useState<string>(initial?.addresses?.[0]?.ua ?? '')
  const [receivers, setReceivers] = useState<Record<string, string> | null>(null)
  const [showReceivers, setShowReceivers] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  // When the account changes, reset to its default address.
  useEffect(() => {
    setAddress(acct?.addresses?.[0]?.ua ?? '')
    setReceivers(null)
    setShowReceivers(false)
    setErr(null)
  }, [acct])

  // Lazily load the individual receivers for the current address.
  useEffect(() => {
    if (!showReceivers || !address || receivers) return
    let live = true
    walletUnifiedReceivers(address)
      .then((r) => live && setReceivers(r))
      .catch((e) => live && setErr(e.message))
    return () => {
      live = false
    }
  }, [showReceivers, address, receivers])

  async function newAddress() {
    if (!acct) return
    setBusy(true)
    setErr(null)
    try {
      const r = await walletAddressForAccount(acct.account)
      setAddress(r.address)
      setReceivers(null)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal title="Receive" subtitle="Share this address to get paid" onClose={onClose}>
      {accounts.length > 1 && (
        <div className="mb-5">
          <Field label="Into account">
            <div className="relative">
              <select
                value={acct?.account_uuid}
                onChange={(e) => setAcct(accounts.find((a) => a.account_uuid === e.target.value))}
                className={`${inputClass} appearance-none pr-10`}
              >
                {accounts.map((a) => (
                  <option key={a.account_uuid} value={a.account_uuid} className="bg-zinc-900">
                    {accountLabel(a.name, a.account)}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
          </Field>
        </div>
      )}

      {/* QR */}
      <div className="flex flex-col items-center">
        <div className="rounded-2xl bg-white p-4 shadow-lg">
          {address ? (
            <QRCodeSVG value={address} size={188} level="M" marginSize={0} />
          ) : (
            <div className="flex h-[188px] w-[188px] items-center justify-center text-zinc-400">
              <Spinner size={20} />
            </div>
          )}
        </div>
        <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          Unified Address
        </span>
      </div>

      {/* Address text + copy */}
      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3.5">
        <p className="break-all font-mono text-[12px] leading-relaxed text-zinc-300">{address}</p>
        <div className="mt-3 flex items-center justify-between">
          <CopyButton text={address} label="Copy address" />
          <button
            onClick={newAddress}
            disabled={busy}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 transition-colors hover:text-white disabled:opacity-40"
          >
            {busy ? <Spinner size={12} /> : <RefreshCw size={12} />}
            New address
          </button>
        </div>
      </div>

      {/* Individual receivers */}
      <button
        onClick={() => setShowReceivers((v) => !v)}
        className="mt-4 flex w-full items-center justify-between rounded-xl px-1 py-1 text-[12px] font-semibold text-zinc-400 transition-colors hover:text-white"
      >
        <span>Individual receivers</span>
        <ChevronDown size={14} className={`transition-transform ${showReceivers ? 'rotate-180' : ''}`} />
      </button>
      {showReceivers && (
        <div className="mt-2 space-y-2">
          {!receivers && !err && (
            <div className="flex items-center gap-2 px-1 py-2 text-[12px] text-zinc-500">
              <Spinner size={12} /> Loading…
            </div>
          )}
          {receivers &&
            Object.entries(receivers).map(([type, addr]) => {
              const meta = RECEIVER_META[type] ?? { label: type, tint: 'text-zinc-400' }
              return (
                <div key={type} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${meta.tint}`}>{meta.label}</span>
                    <CopyButton text={addr} />
                  </div>
                  <p className="break-all font-mono text-[11px] text-zinc-400">{shortenAddr(addr, 16, 12)}</p>
                </div>
              )
            })}
        </div>
      )}

      {err && <p className="mt-3 text-[12px] font-medium text-[#FF453A]">{err}</p>}
    </Modal>
  )
}
