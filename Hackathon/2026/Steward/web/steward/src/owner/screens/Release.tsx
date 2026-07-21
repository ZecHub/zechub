import { useEffect, useRef, useState } from 'react'

import { ApiError, api } from '../api/client'
import type { CeremonyPurpose, Network } from '../api/types'
import { QuorumSeal } from '../../shared/QuorumSeal'
import { Shell, StateChip } from '../../shared/Shell'
import { navigate, useRootAmbient, useVault } from '../lib/hooks'
import { demoRandomizerHex, demoSighashHex } from '../lib/demo'
import { vitals } from '../lib/vitals'

/** `signing` = auto simulate (theatrical); `waiting` = relay, driven by real
 *  `/pending` approvals. The grave terminals map to the coordinator's statuses:
 *  refused → 403 gate, timeout → 408, unmet → 422. */
type Phase =
  | 'idle'
  | 'signing'
  | 'waiting'
  | 'authorized'
  | 'refused'
  | 'timeout'
  | 'unmet'
  | 'error'

interface Ceremony {
  purpose: CeremonyPurpose
  title: string
  verb: string
  blurb: string
  gated: boolean
}
const CEREMONIES: Ceremony[] = [
  {
    purpose: 'InheritanceRelease',
    title: 'Inheritance release',
    verb: 'Release to heir',
    blurb: 'Your heartbeats have lapsed. A quorum of guardians releases the vault to your heir. Allowed only once the dead-man’s-switch has tripped.',
    gated: true,
  },
  {
    purpose: 'SocialRecoverySweep',
    title: 'Recovery sweep',
    verb: 'Sweep to new address',
    blurb: 'You lost a device. A quorum of guardians sweeps the vault to a fresh address you control. Owner-authorized — allowed while the vault is still Active.',
    gated: false,
  },
]

/** Best-effort explorer link for a broadcast txid (mirrors Send.tsx). */
function explorerTxUrl(network: Network, txid: string): string {
  const host = network === 'main' ? 'mainnet' : 'testnet'
  return `https://${host}.zcashexplorer.app/transactions/${txid}`
}

export function Release({ id }: { id: string }) {
  const { status, nowSecs } = useVault(id, 3000)
  const v = status ? vitals(status, nowSecs) : null
  useRootAmbient(v?.ambient ?? null)

  const [purpose, setPurpose] = useState<CeremonyPurpose>('InheritanceRelease')
  const [phase, setPhase] = useState<Phase>('idle')
  const [approvals, setApprovals] = useState(0)
  const [signature, setSignature] = useState<string | null>(null)
  // For an inheritance release, the outcome is a real broadcast txid (the vault swept to the
  // heir), not a demo signature. The demo-sighash ceremony still backs SocialRecoverySweep.
  const [txid, setTxid] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [dest, setDest] = useState('')
  const fillTimer = useRef<number | null>(null)
  const pollTimer = useRef<number | null>(null)

  const threshold = status?.threshold ?? 2
  const n = status?.guardians.length ?? 3
  const network: Network = status?.network ?? 'test'
  // A plain multisig vault has no inheritance release — offer only the owner-authorized
  // spend/move, framed as a multisig spend.
  const inheritance = status?.inheritance_enabled ?? true
  const ceremonies = inheritance
    ? CEREMONIES
    : CEREMONIES.filter((c) => c.purpose !== 'InheritanceRelease')
  const ceremony = CEREMONIES.find((c) => c.purpose === purpose) ?? CEREMONIES[0]

  function stopFill() {
    if (fillTimer.current !== null) {
      window.clearInterval(fillTimer.current)
      fillTimer.current = null
    }
  }
  function stopPoll() {
    if (pollTimer.current !== null) {
      window.clearInterval(pollTimer.current)
      pollTimer.current = null
    }
  }

  // Never leave a timer running if the screen unmounts mid-ceremony.
  useEffect(() => () => {
    stopFill()
    stopPoll()
  }, [])

  // A plain multisig vault has no inheritance release; fall back to the multisig spend once
  // the status loads (the default purpose is InheritanceRelease for inheritance vaults).
  useEffect(() => {
    if (!inheritance && purpose === 'InheritanceRelease') setPurpose('SocialRecoverySweep')
  }, [inheritance, purpose])

  function reset() {
    stopFill()
    stopPoll()
    setPhase('idle')
    setApprovals(0)
    setSignature(null)
    setTxid(null)
    setSessionId(null)
    setMessage(null)
  }

  /** Map a failed ceremony (either mode) to a grave terminal + copy. */
  function fail(e: unknown, keepApprovals = false) {
    stopFill()
    stopPoll()
    if (!keepApprovals) setApprovals(0)
    if (e instanceof ApiError && e.status === 403) {
      setPhase('refused')
      setMessage(
        'The vault is still Active — an inheritance release can only proceed after the owner’s heartbeats lapse.',
      )
    } else if (e instanceof ApiError && e.status === 408) {
      setPhase('timeout')
      setMessage(
        'Your guardians did not approve in time. Make sure each has enrolled and unlocked their app, then convene them again.',
      )
    } else if (e instanceof ApiError && e.status === 422) {
      setPhase('unmet')
      setMessage(
        `Quorum cannot be met — fewer than ${threshold} guardians are able to sign. Distribute the shares and try again.`,
      )
    } else {
      setPhase('error')
      setMessage(e instanceof Error ? e.message : String(e))
    }
  }

  // --- primary path: convene real guardians over the relay ----------------------
  async function convene() {
    stopFill()
    stopPoll()
    const sid = `${id}-relay-${Date.now().toString(36)}`
    setPhase('waiting')
    setApprovals(0)
    setSignature(null)
    setTxid(null)
    setSessionId(sid)
    setMessage(null)

    // Inheritance release: a REAL sweep to the heir → co-sign → broadcast → txid. Long
    // (~1–2 min); the release opens its own co-sign session (id ≠ sid), so drive the seal
    // theatrically rather than from /pending.
    if (purpose === 'InheritanceRelease') {
      fillTimer.current = window.setInterval(() => {
        setApprovals((a) => (a < threshold - 1 ? a + 1 : a))
      }, 900)
      try {
        const res = await api.release(id, { mode: 'relay' })
        stopFill()
        setApprovals(threshold)
        setTxid(res.txid)
        setPhase('authorized')
      } catch (e) {
        stopFill()
        fail(e, e instanceof ApiError && e.status === 408)
      }
      return
    }

    // Drive the seal from the REAL /pending approvals — poll the count of invited
    // guardians who have committed, and only ever raise the arcs (the session is
    // dropped from /pending the instant it resolves, so hold the last count then).
    const poll = async () => {
      try {
        const list = await api.pending(id)
        const mine = list.find((p) => p.session_id === sid)
        if (mine) setApprovals((a) => Math.max(a, Math.min(mine.approvals, threshold)))
      } catch {
        /* transient poll failure — keep the last count, the POST is the source of truth */
      }
    }
    void poll()
    pollTimer.current = window.setInterval(() => void poll(), 1500)

    try {
      const res = await api.session(id, {
        purpose,
        sighash_hex: demoSighashHex(),
        randomizer_hex: demoRandomizerHex(),
        session_id: sid,
        mode: 'relay',
      })
      stopPoll()
      setApprovals(threshold)
      setSignature(res.signature_hex)
      setSessionId(res.session_id)
      setPhase('authorized')
    } catch (e) {
      // On a relay timeout, keep whatever partial approvals we saw so the seal reads
      // "1 of 2 answered"; other failures reset the ring.
      fail(e, e instanceof ApiError && e.status === 408)
    }
  }

  // --- secondary path: simulate with the coordinator's demo shares (no live guardians)
  async function simulate() {
    stopFill()
    stopPoll()
    setPhase('signing')
    setApprovals(0)
    setSignature(null)
    setTxid(null)
    setSessionId(null)
    setMessage(null)

    // Fill the seal arc-by-arc as demo guardians "approve", stopping one short of the
    // threshold — the coordinator's real answer lights the last arc and closes it.
    fillTimer.current = window.setInterval(() => {
      setApprovals((a) => (a < threshold - 1 ? a + 1 : a))
    }, 460)

    try {
      if (purpose === 'InheritanceRelease') {
        // Real sweep to the heir via the demo guardian shares → broadcast → txid.
        const res = await api.release(id, { mode: 'auto' })
        stopFill()
        setApprovals(threshold)
        setTxid(res.txid)
        setPhase('authorized')
      } else {
        const res = await api.session(id, {
          purpose,
          sighash_hex: demoSighashHex(),
          randomizer_hex: demoRandomizerHex(),
          mode: 'auto',
          timeout_ms: 9000,
        })
        stopFill()
        setApprovals(threshold)
        setSignature(res.signature_hex)
        setSessionId(res.session_id)
        setPhase('authorized')
      }
    } catch (e) {
      fail(e)
    }
  }

  const closed = phase === 'authorized'
  const grave = phase === 'refused' || phase === 'timeout' || phase === 'unmet'
  const busy = phase === 'signing' || phase === 'waiting'

  const noticeTitle =
    phase === 'refused' ? 'Refused' : phase === 'timeout' ? 'No answer' : phase === 'unmet' ? 'Quorum not met' : 'Incomplete'

  // For a plain multisig vault the chip reads "Shared" (no life-state); an inheritance vault
  // shows its hearth ambient.
  const aside = !inheritance ? (
    <StateChip label="Shared" tone="active" />
  ) : v ? (
    <StateChip label={v.ambient} tone={v.ambient} />
  ) : undefined

  return (
    <Shell aside={aside}>
      <div className="release">
        <header className="release-head">
          <button className="btn btn--ghost btn--sm" onClick={() => navigate(`#/vault/${id}`)}>
            ← Back to the {inheritance ? 'instrument' : 'vault'}
          </button>
          <p className="eyebrow">The ceremony</p>
          <h1 className="release-title">{inheritance ? 'Convene the quorum.' : 'Move the funds.'}</h1>
          <p className="lede">
            {inheritance ? (
              <>
                A release gathers {threshold} of {n} guardians to co-sign one shielded spend. It is
                grave and it is final. Choose why the quorum convenes.
              </>
            ) : (
              <>
                A spend gathers {threshold} of {n} guardians to co-sign one shielded move. No one
                moves this vault alone — {threshold} of {n} must approve.
              </>
            )}
          </p>
        </header>

        <div className="release-body">
          {/* SIGNATURE 2 — the quorum seal */}
          <div className="seal-stage" data-phase={phase}>
            <QuorumSeal
              n={n}
              threshold={threshold}
              approvals={approvals}
              closed={closed}
              refused={grave}
            />
            <p className="seal-caption" data-phase={phase} role={busy ? 'status' : undefined} aria-live={busy ? 'polite' : undefined}>
              {phase === 'idle' && `${threshold} of ${n} guardians must sign`}
              {phase === 'signing' && 'Gathering approvals…'}
              {phase === 'waiting' && `Waiting for your guardians — ${approvals} of ${threshold} approved…`}
              {phase === 'authorized' && 'The seal is closed — authorized'}
              {phase === 'refused' && 'The seal will not close'}
              {phase === 'timeout' && 'The guardians did not answer in time'}
              {phase === 'unmet' && 'The quorum cannot be met'}
              {phase === 'error' && 'The ceremony did not complete'}
            </p>
          </div>

          <div className="release-controls">
            <fieldset className="purpose-set">
              <legend className="eyebrow">{inheritance ? 'Purpose' : 'What to do'}</legend>
              {ceremonies.map((c) => {
                const multisigSpend = !inheritance && c.purpose === 'SocialRecoverySweep'
                const title = multisigSpend ? 'Spend / move funds' : c.title
                const blurb = multisigSpend
                  ? `A quorum of ${threshold} of ${n} guardians co-signs one shielded move to an address you choose. No single person can move the vault.`
                  : c.blurb
                return (
                  <label className="purpose-opt" key={c.purpose} data-on={c.purpose === purpose}>
                    <input
                      type="radio"
                      name="purpose"
                      value={c.purpose}
                      checked={c.purpose === purpose}
                      onChange={() => {
                        setPurpose(c.purpose)
                        reset()
                      }}
                      disabled={busy}
                    />
                    <span className="purpose-title">{title}</span>
                    <span className="purpose-blurb">{blurb}</span>
                  </label>
                )
              })}
            </fieldset>

            {!inheritance && (
              <label className="field release-dest">
                <span className="field-label eyebrow">Destination address</span>
                <input
                  className="input input--mono"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder={status?.network === 'main' ? 'u1…' : 'utest1…'}
                  autoComplete="off"
                  spellCheck={false}
                  disabled={busy}
                />
                <span className="fine">
                  Where the quorum moves the funds. (Demo: the console signs a placeholder sighash,
                  so the destination is for framing — the t-of-n co-signing is real.)
                </span>
              </label>
            )}

            {v && (
              <p className="fine release-state">
                {inheritance ? (
                  <>
                    This vault is <strong data-state={v.ambient}>{v.ambient}</strong>.{' '}
                    {ceremony.gated
                      ? v.ambient === 'recoverable'
                        ? 'The switch has tripped — the release is permitted.'
                        : 'The switch has not tripped — an inheritance release will be refused.'
                      : 'Owner-authorized — this ceremony is permitted regardless of the switch.'}
                  </>
                ) : (
                  <>
                    Owner-authorized — a quorum of {threshold} of {n} guardians may move the funds
                    at any time. This vault has no dead-man’s-switch.
                  </>
                )}
              </p>
            )}

            <div className="release-actions">
              {phase === 'idle' && (
                <>
                  <button className="btn btn--primary" onClick={convene}>
                    Convene the guardians
                  </button>
                  <p className="fine release-hint">
                    Your guardians see this request in their app, review what they are signing, and
                    approve it. The seal fills as each one does.
                  </p>
                  <button className="btn btn--ghost btn--sm release-sim" onClick={simulate}>
                    Simulate (no live guardians)
                  </button>
                </>
              )}

              {busy && (
                <button className="btn btn--primary" disabled>
                  {phase === 'waiting' ? 'Convening the guardians…' : 'Convening…'}
                </button>
              )}

              {(phase === 'authorized' || grave || phase === 'error') && (
                <button className="btn" onClick={reset}>Begin again</button>
              )}
            </div>

            {(grave || phase === 'error') && message && (
              <div className="notice notice--grave" role="alert">
                <p className="notice-title">{noticeTitle}</p>
                <p>{message}</p>
              </div>
            )}

            {closed && txid && (
              <div className="outcome">
                <p className="eyebrow">Broadcast</p>
                <p className="outcome-grave">
                  The vault is released — swept to the heir on Zcash {network === 'main' ? 'mainnet' : 'testnet'}.
                </p>
                <code className="sig">{txid}</code>
                <div className="outcome-meta">
                  <a href={explorerTxUrl(network, txid)} target="_blank" rel="noreferrer" className="data">
                    View on explorer
                  </a>
                </div>
                <p className="fine">
                  The heir now controls these funds at their own shielded address. No spend key was
                  ever reconstructed — the guardian quorum co-signed one shielded move.
                </p>
              </div>
            )}

            {closed && signature && !txid && (
              <div className="outcome">
                <p className="eyebrow">Aggregated signature</p>
                <p className="outcome-grave">
                  {inheritance
                    ? 'The vault is swept. It now answers to your new address.'
                    : 'The spend is authorized. A quorum co-signed one shielded move.'}
                </p>
                <code className="sig">{signature}</code>
                <div className="outcome-meta">
                  <span className="fine">session</span>
                  <span className="data">{sessionId}</span>
                </div>
                <p className="fine">
                  A single 64-byte re-randomized RedPallas signature, verified against{' '}
                  <span className="data">rk = ak + [α]G</span> before release.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  )
}
