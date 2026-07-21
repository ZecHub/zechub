import { useMemo, useState } from 'react'

import { CopyButton } from '../components/CopyButton'
import { Shell, StateChip } from '../components/Shell'
import { GUARDIAN_BASE_URL, enrollmentRows } from '../lib/enroll'
import { navigate, useRootAmbient, useVault } from '../lib/hooks'
import { loadSeed } from '../lib/vault-store'
import { vitals } from '../lib/vitals'

/**
 * The "Distribute guardian shares" step. Shown right after a vault is sealed, and
 * reopenable from the vault home. One row per guardian: a copyable enrollment link
 * (the guardian app decodes its `#enroll=…` into that guardian's share) and, behind
 * a reveal, the raw share JSON as a paste-in fallback. The shares live only in this
 * tab's session — the coordinator never stores them.
 */
export function GuardianLinks({ id }: { id: string }) {
  const { status, nowSecs } = useVault(id, 5000)
  const v = status ? vitals(status, nowSecs) : null
  useRootAmbient(v?.ambient ?? 'active')

  const seed = useMemo(() => loadSeed(id), [id])
  const rows = useMemo(
    () => (seed ? enrollmentRows(seed.vaultId, seed.shares) : []),
    [seed],
  )
  const threshold = status?.threshold
  const n = seed?.shares.length ?? status?.guardians.length

  return (
    <Shell aside={v ? <StateChip label={v.ambient} tone={v.ambient} /> : undefined}>
      <div className="guardians">
        <header className="guardians-head">
          <button className="btn btn--ghost btn--sm" onClick={() => navigate(`#/vault/${id}`)}>
            ← Back to the instrument
          </button>
          <p className="eyebrow">Distribute the shares</p>
          <h1 className="guardians-title">Hand each guardian their share.</h1>
          <p className="lede">
            Send each guardian their own link. They alone can unlock it — with a passphrase you
            never see and that never leaves their device. No single link, and nothing you hold, can
            release the vault{threshold && n ? <> ; only {threshold} of {n} guardians together can</> : null}.
          </p>
          <div className="guardians-id">
            <span className="eyebrow">Vault</span>
            <span className="data guardians-id-val">{id}</span>
          </div>
        </header>

        {!seed || rows.length === 0 ? (
          <div className="panel notice notice--grave" role="alert">
            <p className="notice-title">Shares not held here</p>
            <p>
              The guardian shares are shown once, when a vault is sealed, and are never stored on
              the coordinator. This tab no longer holds them — seal a new vault to distribute again.
            </p>
            <div className="guardians-empty-actions">
              <button className="btn" onClick={() => navigate('#/')}>Seal a new vault</button>
              <button className="btn btn--ghost" onClick={() => navigate(`#/vault/${id}`)}>
                Open the instrument
              </button>
            </div>
          </div>
        ) : (
          <>
            <ol className="enroll-rows">
              {rows.map((row, i) => (
                <GuardianRow key={row.guardianId} index={i + 1} guardianId={row.guardianId} link={row.link} pasteJson={row.pasteJson} />
              ))}
            </ol>

            <div className="panel guardians-note">
              <p className="eyebrow">How a guardian enrols</p>
              <p className="fine">
                The link opens the guardian app at <span className="data">{GUARDIAN_BASE_URL}</span>,
                prefilled with their share. They set a passphrase, which seals the share on their
                device with argon2id — the console never holds it. If a link is awkward to send, use
                the raw share instead: reveal it, and they paste it into the guardian app's Enrol
                screen.
              </p>
            </div>

            <div className="guardians-foot">
              <button className="btn btn--primary" onClick={() => navigate(`#/vault/${id}`)}>
                Continue to the instrument →
              </button>
              <span className="fine">
                You can reopen these links from the vault home for as long as this tab stays open.
              </span>
            </div>
          </>
        )}
      </div>
    </Shell>
  )
}

function GuardianRow({
  index,
  guardianId,
  link,
  pasteJson,
}: {
  index: number
  guardianId: string
  link: string
  pasteJson: string
}) {
  const [revealed, setRevealed] = useState(false)
  return (
    <li className="panel enroll-row">
      <div className="enroll-row-head">
        <span className="enroll-index data">{index}</span>
        <div className="enroll-who">
          <span className="eyebrow">Guardian</span>
          <span className="data enroll-guardian-id">{guardianId}</span>
        </div>
      </div>

      <div className="field enroll-link-field">
        <span className="field-label eyebrow">Enrollment link</span>
        <div className="enroll-link-row">
          <input className="input input--mono enroll-link-input" value={link} readOnly spellCheck={false} onFocus={(e) => e.currentTarget.select()} />
          <CopyButton text={link} label={`enrollment link for ${guardianId}`}>Copy link</CopyButton>
        </div>
      </div>

      <div className="enroll-reveal">
        <button
          type="button"
          className="btn btn--ghost btn--sm enroll-reveal-toggle"
          aria-expanded={revealed}
          onClick={() => setRevealed((r) => !r)}
        >
          {revealed ? '− Hide raw share' : '+ Reveal raw share (paste fallback)'}
        </button>
        {revealed && (
          <div className="enroll-raw">
            <p className="fine">
              For pasting into the guardian app's Enrol screen if the link can't be used.
            </p>
            <pre className="enroll-raw-json data">{pasteJson}</pre>
            <CopyButton text={pasteJson} label={`raw share for ${guardianId}`}>Copy share JSON</CopyButton>
          </div>
        )}
      </div>
    </li>
  )
}
