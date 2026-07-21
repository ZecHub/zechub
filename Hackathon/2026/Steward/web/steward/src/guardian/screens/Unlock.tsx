import { useState } from 'react'
import type { FormEvent } from 'react'

import { Shell } from '../../shared/Shell'
import { downloadBackup } from '../lib/backup'
import { useRootAmbient } from '../lib/hooks'
import type { Enrollment } from '../lib/storage'
import { openGuardian } from '../lib/wasm'
import type { Guardian } from '../lib/wasm'

export function Unlock({
  enrollment,
  onUnlocked,
  onForget,
}: {
  enrollment: Enrollment
  onUnlocked: (g: Guardian) => void
  onForget: () => void
}) {
  useRootAmbient('active')

  const [passphrase, setPassphrase] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!passphrase) return
    setError(null)
    setBusy(true)
    try {
      // argon2id is deliberately slow (~seconds) — done once, here, not per poll.
      const guardian = await openGuardian(enrollment.sealedBlob, passphrase)
      onUnlocked(guardian)
    } catch (err) {
      setBusy(false)
      setPassphrase('')
      setError(
        err instanceof Error && /passphrase|corrupt/i.test(err.message)
          ? 'That passphrase did not open the keystore. Try again.'
          : err instanceof Error
            ? err.message
            : 'Could not unlock.',
      )
    }
  }

  return (
    <Shell>
      <div className="unlock">
        <header className="unlock-head">
          <p className="eyebrow">Guardian on watch</p>
          <h1 className="unlock-title">Unlock your share.</h1>
          <p className="lede">
            Your share is sealed on this device. Unlock it to stand watch — you will be shown any
            request the vault asks you to co-sign, and nothing signs without you.
          </p>
        </header>

        <form className="panel unlock-card" onSubmit={submit}>
          <dl className="idbar">
            <div className="idbar-item">
              <dt className="eyebrow">Vault</dt>
              <dd className="data">{enrollment.vaultId}</dd>
            </div>
            <div className="idbar-item">
              <dt className="eyebrow">Guardian</dt>
              <dd className="data">{enrollment.guardianId}</dd>
            </div>
            <div className="idbar-item">
              <dt className="eyebrow">Coordinator</dt>
              <dd className="data">{enrollment.coordinator || 'this origin'}</dd>
            </div>
          </dl>

          <label className="field">
            <span className="field-label eyebrow">Passphrase</span>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <input
              className="input"
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="your passphrase"
              autoComplete="current-password"
              autoFocus
              disabled={busy}
            />
          </label>

          {error && (
            <p className="notice notice--grave" role="alert">
              {error}
            </p>
          )}

          <div className="unlock-actions">
            <button className="btn btn--primary" type="submit" disabled={busy || !passphrase}>
              {busy ? 'Unlocking…' : 'Unlock & stand watch'}
            </button>
            {busy && <p className="fine">Deriving your key with argon2id — this takes a moment.</p>}
          </div>
        </form>

        <section className="unlock-backup panel">
          <div className="field-head">
            <p className="eyebrow">Keep it safe</p>
            <p className="field-hint">
              Your share lives only in this browser. Export a backup so clearing this site or
              switching devices doesn't lose it.
            </p>
          </div>
          <button className="btn btn--sm" type="button" onClick={() => downloadBackup(enrollment)}>
            Export backup
          </button>
          <p className="fine">
            This backup is encrypted — it still needs your passphrase to use. Keep it somewhere you
            won't lose.
          </p>
        </section>

        <button className="btn btn--ghost btn--sm unlock-forget" onClick={onForget}>
          Forget this guardian on this device
        </button>
      </div>
    </Shell>
  )
}
