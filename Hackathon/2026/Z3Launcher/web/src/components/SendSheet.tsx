import { useState } from 'react'
import { ChevronDown, ArrowUpRight, CheckCircle2, XCircle, Settings2 } from 'lucide-react'
import {
  walletSend,
  pollOperation,
  type WalletAccount,
  type AccountBalance,
  type OperationStatus,
} from '../api'
import { formatZec } from '../format'
import { Modal, CopyButton, Spinner, Field, accountLabel, inputClass } from './walletShared'

const PRIVACY_OPTIONS = [
  { value: 'FullPrivacy', label: 'Full privacy (shielded only)' },
  { value: 'AllowRevealedAmounts', label: 'Allow revealed amounts' },
  { value: 'AllowRevealedRecipients', label: 'Allow transparent recipients' },
  { value: 'AllowRevealedSenders', label: 'Allow transparent senders' },
  { value: 'AllowFullyTransparent', label: 'Fully transparent' },
]

type Phase = 'form' | 'sending' | 'success' | 'failed'

export function SendSheet({
  accounts,
  balances,
  defaultFromUuid,
  onClose,
  onSent,
}: {
  accounts: WalletAccount[]
  balances: Map<string, AccountBalance>
  defaultFromUuid?: string
  onClose: () => void
  onSent: () => void
}) {
  const [acct, setAcct] = useState<WalletAccount | undefined>(
    accounts.find((a) => a.account_uuid === defaultFromUuid) ?? accounts[0],
  )
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [privacy, setPrivacy] = useState('FullPrivacy')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [phase, setPhase] = useState<Phase>('form')
  const [op, setOp] = useState<OperationStatus | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const bal = acct ? balances.get(acct.account_uuid) : undefined
  const amt = parseFloat(amount)
  const valid = !!acct && to.trim().length > 10 && Number.isFinite(amt) && amt > 0

  async function submit() {
    if (!acct || !valid) return
    const from = acct.addresses?.[0]?.ua
    if (!from) {
      setErr('This account has no address to send from.')
      return
    }
    setPhase('sending')
    setErr(null)
    try {
      const recipient = { address: to.trim(), amount: amt, ...(memo.trim() ? { memo: memo.trim() } : {}) }
      const opid = await walletSend(from, [recipient], privacy)
      const final = await pollOperation(opid, setOp)
      setOp(final)
      if (final.status === 'success') {
        setPhase('success')
        onSent()
      } else {
        setPhase('failed')
        setErr(final.error?.message || `Operation ${final.status}`)
      }
    } catch (e: any) {
      setPhase('failed')
      setErr(e.message)
    }
  }

  // Result screens
  if (phase === 'success' && op?.result) {
    return (
      <Modal title="Sent" subtitle="Your transaction was submitted" onClose={onClose}>
        <div className="flex flex-col items-center py-4 text-center">
          <CheckCircle2 size={56} className="text-[#34C759]" strokeWidth={1.5} />
          <p className="mt-4 text-[15px] font-semibold">
            {formatZec(amt)} ZEC on its way
          </p>
          <p className="mt-1 text-[13px] font-medium text-zinc-500">
            It will confirm once a block is mined.
          </p>
          <div className="mt-5 w-full rounded-xl border border-white/10 bg-black/30 p-3.5 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Transaction ID</span>
            <p className="mt-1 break-all font-mono text-[12px] text-zinc-300">{op.result.txid}</p>
            <div className="mt-2"><CopyButton text={op.result.txid} /></div>
          </div>
        </div>
        <button onClick={onClose} className="apple-btn-primary mt-2 w-full">Done</button>
      </Modal>
    )
  }

  if (phase === 'failed') {
    return (
      <Modal title="Send failed" onClose={onClose}>
        <div className="flex flex-col items-center py-4 text-center">
          <XCircle size={56} className="text-[#FF453A]" strokeWidth={1.5} />
          <p className="mt-4 max-w-sm text-[13px] font-medium text-zinc-400">{err}</p>
        </div>
        <button onClick={() => setPhase('form')} className="apple-btn-secondary mt-2 w-full">Back</button>
      </Modal>
    )
  }

  const sending = phase === 'sending'

  return (
    <Modal title="Send ZEC" subtitle="Transfer to any Zcash address" onClose={onClose}>
      <div className="space-y-4">
        <Field label="From" hint={bal ? `${formatZec(bal.spendable)} ZEC spendable` : undefined}>
          <div className="relative">
            <select
              value={acct?.account_uuid}
              onChange={(e) => setAcct(accounts.find((a) => a.account_uuid === e.target.value))}
              disabled={sending}
              className={`${inputClass} appearance-none pr-10`}
            >
              {accounts.map((a) => (
                <option key={a.account_uuid} value={a.account_uuid} className="bg-zinc-900">
                  {accountLabel(a.name, a.account)} — {formatZec(balances.get(a.account_uuid)?.total ?? 0)} ZEC
                </option>
              ))}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>
        </Field>

        <Field label="To address">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={sending}
            placeholder="u… / z… / t… address"
            className={`${inputClass} font-mono text-[13px]`}
          />
        </Field>

        <Field label="Amount" hint="ZEC">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={sending}
            inputMode="decimal"
            placeholder="0.00"
            className={`${inputClass} tabular-nums`}
          />
        </Field>

        <Field label="Memo" hint="optional · shielded only">
          <input
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            disabled={sending}
            placeholder="Add a private message"
            className={inputClass}
          />
        </Field>

        {/* Advanced: privacy policy */}
        <div>
          <button
            onClick={() => setShowAdvanced((v) => !v)}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-500 transition-colors hover:text-white"
          >
            <Settings2 size={13} />
            Advanced
            <ChevronDown size={13} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
          {showAdvanced && (
            <div className="mt-3">
              <Field label="Privacy policy" hint="ZIP-317 fee is automatic">
                <div className="relative">
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    disabled={sending}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {PRIVACY_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value} className="bg-zinc-900">{p.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                </div>
              </Field>
            </div>
          )}
        </div>

        {err && <p className="text-[12px] font-medium text-[#FF453A]">{err}</p>}

        <button onClick={submit} disabled={!valid || sending} className="apple-btn-primary mt-1 w-full">
          {sending ? (
            <>
              <Spinner size={14} />
              {op?.status === 'executing' ? 'Building transaction…' : 'Submitting…'}
            </>
          ) : (
            <>
              <ArrowUpRight size={16} strokeWidth={2.5} />
              Send {valid ? `${formatZec(amt)} ZEC` : ''}
            </>
          )}
        </button>
      </div>
    </Modal>
  )
}
