import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { ApiError, api } from '../api/client'
import type { Network } from '../api/types'
import { CopyButton } from '../../shared/CopyButton'
import { QuorumSeal } from '../../shared/QuorumSeal'
import { Shell, StateChip } from '../../shared/Shell'
import { addressNetwork, netLabel } from '../lib/address'
import { navigate, useRootAmbient, useVault } from '../lib/hooks'
import { formatZec, vitals } from '../lib/vitals'

const ZATS_PER_ZEC = 100_000_000

/** The labeled explorer link for a broadcast txid — best-effort; the raw txid + a copy button
 *  is the robust part, always shown regardless of whether this link resolves. */
function explorerTxUrl(network: Network, txid: string): string {
  const host = network === 'main' ? 'mainnet' : 'testnet'
  return `https://${host}.zcashexplorer.app/transactions/${txid}`
}

type Phase = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Send a payment — a REAL, app-driven spend. Collects a recipient address + a ZEC amount,
 * validates both client-side (address network + amount ≤ the spendable balance), then hits
 * POST /vault/:id/spend, which builds a transaction to `to` for `amount_zat` zatoshis, has the
 * guardians co-sign the real sighash, broadcasts, and returns the txid.
 *
 * This is a NORMAL PAYMENT to any address — distinct from the recovery sweep (to a new owner
 * address) and the inheritance release (to the heir), which live on the Release screen.
 *
 * Mode mirrors Release exactly: the primary "Send payment" convenes the REAL guardians over the
 * relay (`mode: 'relay'`); the secondary "Simulate (no live guardians)" drives the coordinator's
 * in-process demo shares (`mode: 'auto'`) for a solo/demo vault.
 */
export function Send({ id }: { id: string }) {
  const { status, nowSecs } = useVault(id, 3000)
  const inheritance = status?.inheritance_enabled ?? false
  const v = status && inheritance ? vitals(status, nowSecs) : null
  useRootAmbient(v?.ambient ?? (status ? 'active' : null))

  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [approvals, setApprovals] = useState(0)
  const [txid, setTxid] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const fillTimer = useRef<number | null>(null)

  function stopFill() {
    if (fillTimer.current !== null) {
      window.clearInterval(fillTimer.current)
      fillTimer.current = null
    }
  }
  // Never leave the fill timer running if the screen unmounts mid-send.
  useEffect(() => () => stopFill(), [])

  if (!status) {
    return (
      <Shell>
        <p className="lede">Reading the vault…</p>
      </Shell>
    )
  }

  const network = status.network
  const threshold = status.threshold
  const n = status.guardians.length
  const balanceZat = status.balance.zatoshis
  const notSynced = balanceZat === null
  const busy = phase === 'sending'

  // Recipient: non-empty AND on the vault's network (reuse the shared prefix check). A real spend
  // blocks on both a network mismatch and an unrecognized address; the coordinator's PCZT build
  // is the authoritative validator.
  const toClean = to.trim()
  const toNet = toClean ? addressNetwork(toClean) : null
  const toMismatch = !!toNet && toNet !== 'unknown' && toNet !== network
  const toUnknown = toNet === 'unknown'
  const toOk = toClean.length > 0 && !toMismatch && !toUnknown

  // Amount: a positive number of ZEC → integer zatoshis, ≤ the spendable balance.
  const zec = Number(amount)
  const zatWanted = amount.trim() && Number.isFinite(zec) ? Math.round(zec * ZATS_PER_ZEC) : NaN
  const amountEntered = amount.trim().length > 0
  const amountPositive = Number.isFinite(zatWanted) && zatWanted > 0
  const amountTooBig = amountPositive && balanceZat !== null && zatWanted > balanceZat
  const amountOk = amountPositive && balanceZat !== null && zatWanted <= balanceZat
  const amountInvalidShown = amountEntered && !amountOk && !notSynced

  const canSend = toOk && amountOk && !notSynced && !busy

  async function send(mode: 'relay' | 'auto') {
    if (!canSend) return
    stopFill()
    setPhase('sending')
    setApprovals(0)
    setTxid(null)
    setMessage(null)

    // Theatrical fill of the seal while the long build + co-sign + broadcast runs: arcs light one
    // by one up to threshold-1; the real broadcast lights the last arc and closes the band.
    fillTimer.current = window.setInterval(() => {
      setApprovals((a) => (a < threshold - 1 ? a + 1 : a))
    }, 700)

    try {
      const res = await api.spend(id, { to: toClean, amount_zat: zatWanted, mode })
      stopFill()
      setApprovals(threshold)
      setTxid(res.txid)
      setPhase('sent')
    } catch (e) {
      stopFill()
      setApprovals(0)
      setMessage(e instanceof ApiError ? e.message : String(e))
      setPhase('error')
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void send('relay')
  }

  function reset() {
    stopFill()
    setPhase('idle')
    setApprovals(0)
    setTxid(null)
    setMessage(null)
    setAmount('')
  }

  const captionPhase =
    phase === 'sending'
      ? 'waiting'
      : phase === 'sent'
        ? 'authorized'
        : phase === 'error'
          ? 'error'
          : 'idle'

  // Mirror Release's aside: a plain multisig vault reads "Shared" (no life-state); an inheritance
  // vault shows its hearth ambient.
  const aside = !inheritance ? (
    <StateChip label="Shared" tone="active" />
  ) : v ? (
    <StateChip label={v.ambient} tone={v.ambient} />
  ) : undefined

  return (
    <Shell aside={aside}>
      <div className="release send">
        <header className="release-head">
          <button className="btn btn--ghost btn--sm" onClick={() => navigate(`#/vault/${id}`)}>
            ← Back to the {inheritance ? 'instrument' : 'vault'}
          </button>
          <p className="eyebrow">Send a payment</p>
          <h1 className="release-title">Send from this vault.</h1>
          <p className="lede">
            A real, quorum-signed payment. {threshold} of {n} guardians co-sign one shielded spend
            to the address you name, then it is broadcast to the {netLabel(network)}. No single
            person can move it.
          </p>
        </header>

        <div className="release-body">
          {/* The quorum seal doubles as the send-progress indicator (guardians co-signing). */}
          <div className="seal-stage" data-phase={captionPhase}>
            <QuorumSeal
              n={n}
              threshold={threshold}
              approvals={approvals}
              closed={phase === 'sent'}
              refused={phase === 'error'}
            />
            <p
              className="seal-caption"
              data-phase={captionPhase}
              role={busy ? 'status' : undefined}
              aria-live={busy ? 'polite' : undefined}
            >
              {phase === 'idle' && `${threshold} of ${n} guardians must sign`}
              {phase === 'sending' &&
                'Building the transaction… guardians co-signing… broadcasting…'}
              {phase === 'sent' && 'The seal is closed — broadcast'}
              {phase === 'error' && 'The payment did not complete'}
            </p>
          </div>

          <form className="release-controls" onSubmit={onSubmit}>
            {phase !== 'sent' ? (
              <>
                <label className="field">
                  <span className="field-label eyebrow">Recipient address</span>
                  <input
                    className="input input--mono"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={network === 'main' ? 'u1…' : 'utest1…'}
                    autoComplete="off"
                    spellCheck={false}
                    disabled={busy}
                    aria-invalid={toMismatch || (!!toClean && toUnknown) || undefined}
                  />
                  {toMismatch && (
                    <p className="notice notice--grave" role="alert">
                      That is a {netLabel(toNet as Network)} address, but this is a{' '}
                      {netLabel(network)} vault — send to a {netLabel(network)} address.
                    </p>
                  )}
                  {toClean && toUnknown && (
                    <p className="notice notice--caution" role="note">
                      <span className="notice-title">Unrecognized</span>
                      That doesn’t read as a Zcash address — check it before sending.
                    </p>
                  )}
                  {toClean && !toMismatch && !toUnknown && (
                    <p className="fine">Reads as a {netLabel(network)} address.</p>
                  )}
                </label>

                <label className="field send-amount">
                  <span className="field-label eyebrow">Amount (ZEC)</span>
                  <input
                    className="input send-amount-input"
                    type="number"
                    min="0"
                    step="0.00000001"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00000000"
                    disabled={busy || notSynced}
                    aria-invalid={amountInvalidShown || undefined}
                  />
                  {balanceZat === null ? (
                    <p className="notice notice--caution" role="note">
                      <span className="notice-title">Sync first</span>
                      This vault hasn’t been synced, so its spendable balance is unknown. Sync it on
                      the vault home, then come back to send.
                    </p>
                  ) : (
                    <p className="fine send-balance">
                      Spendable: <span className="data">{formatZec(balanceZat)} ZEC</span>
                      {amountTooBig && <span className="send-over"> — more than the balance</span>}
                    </p>
                  )}
                </label>

                {phase === 'error' && message && (
                  <div className="notice notice--grave" role="alert">
                    <p className="notice-title">Could not send</p>
                    <p>{message}</p>
                  </div>
                )}

                <div className="release-actions">
                  {!busy ? (
                    <>
                      <button type="submit" className="btn btn--primary" disabled={!canSend}>
                        Send payment
                      </button>
                      <p className="fine release-hint">
                        Your guardians see this payment in their app, review the address and amount,
                        and co-sign it. This is a real spend — it can take a minute or two.
                      </p>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm release-sim"
                        onClick={() => void send('auto')}
                        disabled={!canSend}
                      >
                        Simulate (no live guardians)
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn--primary" disabled>
                      Sending the payment…
                    </button>
                  )}
                </div>
              </>
            ) : (
              txid && (
                <div className="outcome send-outcome">
                  <p className="eyebrow">Broadcast</p>
                  <p className="outcome-grave">
                    The payment is on its way — {threshold} of {n} guardians co-signed one shielded
                    spend.
                  </p>
                  <div className="send-txid">
                    <span className="field-label eyebrow">Transaction id</span>
                    <code className="sig send-txid-val">{txid}</code>
                    <div className="send-txid-actions">
                      <CopyButton className="btn btn--sm" text={txid} label="transaction id">
                        Copy txid
                      </CopyButton>
                      <a
                        className="btn btn--sm send-explorer"
                        href={explorerTxUrl(network, txid)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on explorer →
                      </a>
                    </div>
                  </div>
                  <p className="notice notice--caution" role="note">
                    <span className="notice-title">Balance is stale</span>
                    This vault’s balance no longer reflects the spend. Sync it again on the vault
                    home to see the new balance.
                  </p>
                  <div className="release-actions">
                    <button type="button" className="btn" onClick={reset}>
                      Send another
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => navigate(`#/vault/${id}`)}
                    >
                      ← Back to the vault
                    </button>
                  </div>
                </div>
              )
            )}
          </form>
        </div>
      </div>
    </Shell>
  )
}
