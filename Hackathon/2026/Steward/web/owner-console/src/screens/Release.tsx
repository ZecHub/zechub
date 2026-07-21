import { useEffect, useRef, useState } from 'react'

import { ApiError, api } from '../api/client'
import type { CeremonyPurpose } from '../api/types'
import { QuorumSeal } from '../components/QuorumSeal'
import { Shell, StateChip } from '../components/Shell'
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

export function Release({ id }: { id: string }) {
  const { status, nowSecs } = useVault(id, 3000)
  const v = status ? vitals(status, nowSecs) : null
  useRootAmbient(v?.ambient ?? null)

  const [purpose, setPurpose] = useState<CeremonyPurpose>('InheritanceRelease')
  const [phase, setPhase] = useState<Phase>('idle')
  const [approvals, setApprovals] = useState(0)
  const [signature, setSignature] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const fillTimer = useRef<number | null>(null)
  const pollTimer = useRef<number | null>(null)

  const threshold = status?.threshold ?? 2
  const n = status?.guardians.length ?? 3
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

  function reset() {
    stopFill()
    stopPoll()
    setPhase('idle')
    setApprovals(0)
    setSignature(null)
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
    setSessionId(sid)
    setMessage(null)

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
    setSessionId(null)
    setMessage(null)

    // Fill the seal arc-by-arc as demo guardians "approve", stopping one short of the
    // threshold — the coordinator's real answer lights the last arc and closes it.
    fillTimer.current = window.setInterval(() => {
      setApprovals((a) => (a < threshold - 1 ? a + 1 : a))
    }, 460)

    try {
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
    } catch (e) {
      fail(e)
    }
  }

  const closed = phase === 'authorized'
  const grave = phase === 'refused' || phase === 'timeout' || phase === 'unmet'
  const busy = phase === 'signing' || phase === 'waiting'

  const noticeTitle =
    phase === 'refused' ? 'Refused' : phase === 'timeout' ? 'No answer' : phase === 'unmet' ? 'Quorum not met' : 'Incomplete'

  return (
    <Shell aside={v ? <StateChip label={v.ambient} tone={v.ambient} /> : undefined}>
      <div className="release">
        <header className="release-head">
          <button className="btn btn--ghost btn--sm" onClick={() => navigate(`#/vault/${id}`)}>
            ← Back to the instrument
          </button>
          <p className="eyebrow">The ceremony</p>
          <h1 className="release-title">Convene the quorum.</h1>
          <p className="lede">
            A release gathers {threshold} of {n} guardians to co-sign one shielded spend. It is
            grave and it is final. Choose why the quorum convenes.
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
              <legend className="eyebrow">Purpose</legend>
              {CEREMONIES.map((c) => (
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
                  <span className="purpose-title">{c.title}</span>
                  <span className="purpose-blurb">{c.blurb}</span>
                </label>
              ))}
            </fieldset>

            {v && (
              <p className="fine release-state">
                This vault is <strong data-state={v.ambient}>{v.ambient}</strong>.{' '}
                {ceremony.gated
                  ? v.ambient === 'recoverable'
                    ? 'The switch has tripped — the release is permitted.'
                    : 'The switch has not tripped — an inheritance release will be refused.'
                  : 'Owner-authorized — this ceremony is permitted regardless of the switch.'}
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

            {closed && signature && (
              <div className="outcome">
                <p className="eyebrow">Aggregated signature</p>
                <p className="outcome-grave">
                  {purpose === 'InheritanceRelease'
                    ? 'The vault is released. The heir may now claim it.'
                    : 'The vault is swept. It now answers to your new address.'}
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
