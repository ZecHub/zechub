import { useMemo, useRef, useState } from 'react'

import { makeClient } from '../api/client'
import type { CeremonyPurpose, PendingSession } from '../api/types'
import { CopyButton } from '../../shared/CopyButton'
import { QuorumSeal } from '../../shared/QuorumSeal'
import { Shell, StateChip } from '../../shared/Shell'
import { downloadBackup } from '../lib/backup'
import { runCoSign } from '../lib/cosign'
import type { CoSignStep } from '../lib/cosign'
import { usePending, useReleaseGate, useRootAmbient, useVaultStatus } from '../lib/hooks'
import type { ReleaseGate } from '../lib/hooks'
import type { Enrollment } from '../lib/storage'
import { ambientOf, formatCountdown, truncateMiddle } from '../lib/vitals'
import type { Guardian } from '../lib/wasm'

type Phase = 'cosigning' | 'sealed' | 'adjourned' | 'error'

interface Engaged {
  session: PendingSession
  phase: Phase
  step: CoSignStep
  error?: string
}

const PURPOSE_LABEL: Record<CeremonyPurpose, string> = {
  InheritanceRelease: 'Inheritance release',
  SocialRecoverySweep: 'Recovery sweep',
  NormalSpend: 'Payment',
}

/** The headline a guardian reads. For a payment (`NormalSpend`) we compose it from the amount +
 *  recipient the proposer attached — so the card says exactly what is being sent and to whom —
 *  falling back gracefully as either is missing. Every other purpose keeps the coordinator's own
 *  plain-words headline, unchanged. */
function headlineFor(session: PendingSession): string {
  const { purpose, display } = session
  if (purpose !== 'NormalSpend') return display.headline
  const to = display.recipient ? truncateMiddle(display.recipient, 10, 8) : null
  if (display.amount && to) return `Payment — send ${display.amount} to ${to}`
  if (display.amount) return `Payment — send ${display.amount}`
  if (to) return `Payment — send funds to ${to}`
  return display.headline
}

export function Watch({
  enrollment,
  guardian,
  onLock,
  onForget,
}: {
  enrollment: Enrollment
  guardian: Guardian
  onLock: () => void
  onForget: () => void
}) {
  const client = useMemo(() => makeClient(enrollment.coordinator), [enrollment.coordinator])
  const { status, nowSecs } = useVaultStatus(client, enrollment.vaultId)
  const { pending, error: pendingError, loaded } = usePending(client, enrollment.vaultId)

  const ambient = status ? ambientOf(status, nowSecs) : null
  useRootAmbient(ambient)

  const [handled, setHandled] = useState<Set<string>>(() => new Set())
  const [engaged, setEngaged] = useState<Engaged | null>(null)
  const cancelRef = useRef(false)

  const guardianId = enrollment.guardianId
  const mine = pending.filter((p) => p.invited.includes(guardianId))
  // A "preparing" placeholder (EMPTY sighash) is the owner's heads-up that a payment is being
  // built — informational, NOT yet signable. Only a session with a real sighash is approvable;
  // a placeholder must never become the actionable `request` (co-signing it would target a
  // ceremony that does not exist yet). The real session replaces it the moment the build finishes.
  const request = mine.find(
    (p) =>
      p.display.sighash !== '' &&
      !handled.has(p.session_id) &&
      p.session_id !== engaged?.session.session_id,
  )
  const preparing =
    !request && !engaged ? mine.find((p) => p.display.sighash === '') : undefined
  const realCount = mine.filter((p) => p.display.sighash !== '').length

  // The guardian's INDEPENDENT release gate. For an InheritanceRelease it fetches the owner's
  // signed heartbeat bulletin, verifies the Ed25519 signature ITSELF, and computes is_lapsed on
  // its own clock — the release only arms if genuinely lapsed. It never trusts the coordinator's
  // `state`. (Owner-authorized purposes are not gated → always armed.)
  const gate = useReleaseGate(client, enrollment.vaultId, request ?? null, nowSecs)
  const engagedLive = engaged
    ? pending.find((p) => p.session_id === engaged.session.session_id)
    : undefined

  const focus = engaged?.session ?? request ?? null
  const n = status?.guardians.length ?? focus?.invited.length ?? 3
  const threshold = status?.threshold ?? Math.min(n, Math.max(1, n - 1))

  async function approve(session: PendingSession) {
    cancelRef.current = false
    setHandled((h) => new Set(h).add(session.session_id))
    setEngaged({ session, phase: 'cosigning', step: 'connecting' })
    const isThis = (e: Engaged | null) => e?.session.session_id === session.session_id
    try {
      const outcome = await runCoSign(
        client,
        session.session_id,
        guardianId,
        guardian,
        (step) => setEngaged((e) => (isThis(e) ? { ...(e as Engaged), step } : e)),
        () => cancelRef.current,
      )
      setEngaged((e) => (isThis(e) ? { ...(e as Engaged), phase: outcome, step: outcome } : e))
    } catch (err) {
      if (cancelRef.current) return
      setEngaged((e) =>
        isThis(e)
          ? { ...(e as Engaged), phase: 'error', error: err instanceof Error ? err.message : String(err) }
          : e,
      )
    }
  }

  function decline(session: PendingSession) {
    setHandled((h) => new Set(h).add(session.session_id))
    if (engaged?.session.session_id === session.session_id) {
      cancelRef.current = true
      setEngaged(null)
    }
  }

  function dismiss() {
    setEngaged(null)
  }

  const aside = ambient ? <StateChip label={ambient} tone={ambient} /> : undefined

  return (
    <Shell aside={aside}>
      <div className="watch">
        <IdentityBar
          enrollment={enrollment}
          vaultLabel={status?.label ?? null}
          onLock={onLock}
          onForget={onForget}
        />

        {pendingError && !focus && (
          <div className="panel notice notice--grave" role="alert">
            <p className="eyebrow">No signal</p>
            <p>{pendingError}</p>
          </div>
        )}

        {engaged ? (
          <CeremonyHero
            engaged={engaged}
            liveApprovals={engagedLive?.approvals}
            n={n}
            threshold={threshold}
            onDismiss={dismiss}
            onDecline={() => decline(engaged.session)}
          />
        ) : request ? (
          <ApprovalCard
            session={request}
            n={n}
            threshold={threshold}
            gate={gate}
            onApprove={() => {
              if (gate.armed) approve(request)
            }}
            onDecline={() => decline(request)}
          />
        ) : preparing ? (
          <IncomingPayment session={preparing} n={n} threshold={threshold} />
        ) : (
          <Watching loaded={loaded} error={pendingError} n={n} threshold={threshold} />
        )}

        {realCount > 1 && !engaged && request && (
          <p className="fine watch-more">
            {realCount - 1} more request{realCount - 1 === 1 ? '' : 's'} waiting after this one.
          </p>
        )}
      </div>
    </Shell>
  )
}

function IdentityBar({
  enrollment,
  vaultLabel,
  onLock,
  onForget,
}: {
  enrollment: Enrollment
  vaultLabel: string | null
  onLock: () => void
  onForget: () => void
}) {
  // The coordinator falls the vault's label back to its id when the owner named none, so only
  // surface a name (and demote the id to a secondary line) when it genuinely differs.
  const named = vaultLabel !== null && vaultLabel !== enrollment.vaultId
  return (
    <div className="idbar panel watch-idbar">
      <div className="idbar-item">
        <span className="eyebrow">Guardian</span>
        <span className="data">{enrollment.guardianId}</span>
      </div>
      <div className="idbar-item">
        <span className="eyebrow">Vault</span>
        {named ? (
          <>
            <span className="idbar-name">{vaultLabel}</span>
            <span className="data idbar-subid" title={enrollment.vaultId}>
              {enrollment.vaultId}
            </span>
          </>
        ) : (
          <span className="data">{enrollment.vaultId}</span>
        )}
      </div>
      <div className="idbar-actions">
        <button className="btn btn--ghost btn--sm" onClick={onLock}>
          Lock
        </button>
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => downloadBackup(enrollment)}
          title="Downloads your encrypted share. It still needs your passphrase to use — keep it somewhere you won't lose."
        >
          Export backup
        </button>
        <button className="btn btn--ghost btn--sm" onClick={onForget}>
          Forget
        </button>
      </div>
    </div>
  )
}

/** The details of what a guardian is being asked to authorize — shared by the approval
 *  card and the co-sign hero. "See what you are signing." */
function RequestDetails({ session }: { session: PendingSession }) {
  const { display, purpose } = session
  return (
    <>
      <dl className="req-details">
        <div className="req-row">
          <dt className="eyebrow">Purpose</dt>
          <dd>{PURPOSE_LABEL[purpose]}</dd>
        </div>
        {display.heir && (
          <div className="req-row">
            <dt className="eyebrow">Heir</dt>
            <dd className="data" title={display.heir}>
              {truncateMiddle(display.heir, 14, 10)}
            </dd>
          </div>
        )}
        {display.recipient && (
          <div className="req-row">
            <dt className="eyebrow">Recipient</dt>
            <dd className="req-recipient">
              <span className="data" title={display.recipient}>
                {truncateMiddle(display.recipient, 14, 10)}
              </span>
              <CopyButton
                text={display.recipient}
                label="recipient address"
                className="btn btn--ghost btn--sm"
              />
            </dd>
          </div>
        )}
        {display.amount && (
          <div className="req-row">
            <dt className="eyebrow">Amount</dt>
            <dd className="data req-amount">{display.amount}</dd>
          </div>
        )}
        <div className="req-row">
          <dt className="eyebrow">Signing</dt>
          <dd className="data req-sighash" title={display.sighash}>
            {truncateMiddle(display.sighash, 12, 10)}
          </dd>
        </div>
        <div className="req-row">
          <dt className="eyebrow">Session</dt>
          <dd className="data">{session.session_id}</dd>
        </div>
      </dl>
      {display.recipient && (
        <p className="fine req-note">
          The recipient and amount are shown as the proposer entered them; what you
          cryptographically sign is the sighash above. Co-sign only if this is the payment you
          mean to authorize.
        </p>
      )}
    </>
  )
}

function ApprovalCard({
  session,
  n,
  threshold,
  gate,
  onApprove,
  onDecline,
}: {
  session: PendingSession
  n: number
  threshold: number
  gate: ReleaseGate
  onApprove: () => void
  onDecline: () => void
}) {
  return (
    <section className="approval">
      <div className="seal-stage">
        <QuorumSeal n={n} threshold={threshold} approvals={session.approvals} closed={false} />
        <p className="seal-caption">
          {threshold} of {n} guardians must sign
        </p>
      </div>

      <div className="approval-body">
        <p className="eyebrow">A request awaits you</p>
        <h1 className="approval-headline">{headlineFor(session)}.</h1>
        <p className="lede">
          You are one of {n} guardians. Read what is asked, then decide. If you approve, your device
          co-signs — your share never leaves it.
        </p>

        <RequestDetails session={session} />

        {gate.gated && <ReleaseGatePanel gate={gate} />}

        <div className="approval-actions">
          <button className="btn btn--primary" onClick={onApprove} disabled={!gate.armed}>
            Approve &amp; co-sign
          </button>
          <button className="btn" onClick={onDecline}>
            Decline
          </button>
        </div>
        <p className="fine">
          {gate.gated && !gate.armed
            ? 'You cannot co-sign a release your own check does not confirm — the button unlocks only once the owner’s signed heartbeat has lapsed.'
            : 'Declining stops here; the vault may still be authorized by other guardians reaching quorum.'}
        </p>
      </div>
    </section>
  )
}

/** The guardian's own proof-of-life verdict for an InheritanceRelease — surfaced so a guardian
 *  sees WHY it can (or cannot yet) act, verified from the owner's signature, not the server. */
function ReleaseGatePanel({ gate }: { gate: ReleaseGate }) {
  const lastSeen =
    gate.lastSignedTime !== null ? new Date(gate.lastSignedTime * 1000).toLocaleString() : '—'

  if (gate.checking) {
    return (
      <div className="panel gate gate--checking" role="status">
        <p className="eyebrow">Proof of life</p>
        <p>Verifying the owner’s signed heartbeat on this device…</p>
      </div>
    )
  }

  if (gate.armed) {
    return (
      <div className="panel gate gate--armed">
        <p className="eyebrow">Proof of life — lapsed</p>
        <p>
          You verified the owner’s last signed heartbeat yourself (<span className="data">{lastSeen}</span>)
          and it has lapsed past its interval and grace. The release is permitted.
        </p>
        <p className="fine">
          Checked against the owner’s Ed25519 signature on this device — not the coordinator’s word.
        </p>
      </div>
    )
  }

  return (
    <div className="panel gate gate--held" role="note">
      <p className="eyebrow">Proof of life — {gate.verified ? 'current' : 'unverified'}</p>
      <p>{gate.reason}</p>
      {gate.verified && gate.lastSignedTime !== null && (
        <p className="fine">
          Owner’s last signed heartbeat: <span className="data">{lastSeen}</span>. Release would
          unlock in <span className="data">{formatCountdown(gate.secondsUntilLapse)}</span> if no
          further heartbeat arrives — verified against the owner’s signature, not the coordinator’s
          state.
        </p>
      )}
    </div>
  )
}

const STEP_LABELS = ['Committing', 'Signing', 'Sealed'] as const

function stepProgress(step: CoSignStep): number {
  switch (step) {
    case 'connecting':
      return 0
    case 'round1':
      return 1
    case 'round2':
      return 2
    case 'sealed':
    case 'adjourned':
      return 3
  }
}

function CeremonyHero({
  engaged,
  liveApprovals,
  n,
  threshold,
  onDismiss,
  onDecline,
}: {
  engaged: Engaged
  liveApprovals: number | undefined
  n: number
  threshold: number
  onDismiss: () => void
  onDecline: () => void
}) {
  const { session, phase, step, error } = engaged
  const sealed = phase === 'sealed'
  const errored = phase === 'error'
  const approvals = sealed ? threshold : (liveApprovals ?? session.approvals)
  const p = stepProgress(step)

  const caption =
    phase === 'cosigning'
      ? step === 'connecting'
        ? 'Opening the ceremony…'
        : step === 'round1'
          ? 'Committing your nonce (round 1)…'
          : 'Signing your share (round 2)…'
      : sealed
        ? 'The seal is closed — you have co-signed'
        : phase === 'adjourned'
          ? 'Another quorum signed — your share was not needed'
          : 'The ceremony did not complete'

  return (
    <section className="approval" data-phase={phase}>
      <div className="seal-stage" data-phase={phase}>
        <QuorumSeal
          n={n}
          threshold={threshold}
          approvals={approvals}
          closed={sealed}
          refused={errored}
        />
        <p className="seal-caption" data-phase={phase}>
          {caption}
        </p>
      </div>

      <div className="approval-body">
        <p className="eyebrow">{PURPOSE_LABEL[session.purpose]}</p>
        <h1 className="approval-headline">{headlineFor(session)}.</h1>

        <RequestDetails session={session} />

        {phase === 'cosigning' && (
          <ol className="cosign-steps" aria-label="co-signing progress">
            {STEP_LABELS.map((label, i) => {
              const state = p > i + 1 ? 'done' : p === i + 1 ? 'active' : 'pending'
              return (
                <li key={label} className="cosign-step" data-state={state}>
                  <span className="cosign-dot" aria-hidden="true" />
                  <span className="cosign-label">{label}</span>
                </li>
              )
            })}
          </ol>
        )}

        {sealed && (
          <div className="outcome">
            <p className="outcome-grave">
              {session.purpose === 'InheritanceRelease'
                ? 'The vault is released to the heir.'
                : session.purpose === 'SocialRecoverySweep'
                  ? 'The vault is recovered to the new address.'
                  : 'The payment is authorized.'}
            </p>
            <p className="fine">
              Your device produced its re-randomized FROST share and the coordinator aggregated a
              single signature, verified against <span className="data">rk = ak + [α]G</span>.
            </p>
          </div>
        )}

        {phase === 'adjourned' && (
          <p className="fine">
            The coordinator gathered its {threshold} signatures from other guardians. Nothing was
            signed on your behalf, and your nonce was discarded.
          </p>
        )}

        {errored && (
          <div className="notice notice--grave" role="alert">
            <p className="notice-title">Incomplete</p>
            <p>{error}</p>
          </div>
        )}

        <div className="approval-actions">
          {phase === 'cosigning' ? (
            <button className="btn" onClick={onDecline}>
              Stop
            </button>
          ) : (
            <button className="btn btn--primary" onClick={onDismiss}>
              Back to watch
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function Watching({
  loaded,
  error,
  n,
  threshold,
}: {
  loaded: boolean
  error: string | null
  n: number
  threshold: number
}) {
  return (
    <section className="approval watching">
      <div className="seal-stage">
        <QuorumSeal n={n} threshold={threshold} approvals={0} closed={false} />
        <p className="seal-caption">standing watch</p>
      </div>
      <div className="approval-body">
        <p className="eyebrow">On watch</p>
        <h1 className="approval-headline">Nothing to sign, for now.</h1>
        <p className="lede">
          {!loaded && !error
            ? 'Reading the vault…'
            : 'You are standing watch. The moment the vault asks this quorum to release, recover, or spend, the request will appear here for your decision.'}
        </p>
      </div>
    </section>
  )
}

/** The owner just started a payment; the coordinator advertises this "preparing" placeholder while
 *  it builds the transaction, so a watching guardian sees the incoming payment immediately. It is
 *  NOT signable — the real approval card (with the transaction's sighash) replaces it the moment the
 *  build finishes, a few seconds later. */
function IncomingPayment({
  session,
  n,
  threshold,
}: {
  session: PendingSession
  n: number
  threshold: number
}) {
  const { recipient, amount } = session.display
  return (
    <section className="approval watching incoming">
      <div className="seal-stage" data-phase="waiting">
        <QuorumSeal n={n} threshold={threshold} approvals={0} closed={false} />
        <p className="seal-caption" role="status" aria-live="polite">
          preparing the transaction…
        </p>
      </div>
      <div className="approval-body">
        <p className="eyebrow">Payment incoming</p>
        <h1 className="approval-headline">A payment is being prepared{amount ? ` — ${amount}` : ''}.</h1>
        <p className="lede">
          The owner just started a payment
          {recipient ? (
            <>
              {' '}
              to <span className="data">{truncateMiddle(recipient, 12, 8)}</span>
            </>
          ) : null}
          . Stay on this screen — the approval will appear here the moment the transaction finishes
          building (a few seconds).
        </p>
      </div>
    </section>
  )
}
