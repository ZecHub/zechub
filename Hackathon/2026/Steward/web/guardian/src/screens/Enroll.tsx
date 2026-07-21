import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { Shell } from '../components/Shell'
import { parseBackup } from '../lib/backup'
import { normalizeShare } from '../lib/enroll'
import type { EnrollDraft } from '../lib/enroll'
import { useRootAmbient } from '../lib/hooks'
import { saveEnrollment } from '../lib/storage'
import type { Enrollment } from '../lib/storage'
import { sealShare } from '../lib/wasm'

const MIN_PASSPHRASE = 8

export function Enroll({
  draft,
  onEnrolled,
}: {
  draft: Partial<EnrollDraft> | null
  onEnrolled: (e: Enrollment) => void
}) {
  useRootAmbient('active')

  const [coordinator, setCoordinator] = useState(draft?.coordinator ?? '')
  const [vaultId, setVaultId] = useState(draft?.vaultId ?? '')
  const [guardianId, setGuardianId] = useState(draft?.guardianId ?? '')
  const [share, setShare] = useState(draft?.shareJson ?? '')
  const [passphrase, setPassphrase] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fromLink = Boolean(draft)

  // Restore path: read a previously exported backup file. The blob inside is already
  // sealed, so we validate its shape and store it as-is — no re-sealing, no decryption —
  // then hand off to Unlock, where the passphrase is still required.
  async function importBackup(ev: ChangeEvent<HTMLInputElement>) {
    setImportError(null)
    const file = ev.target.files?.[0]
    ev.target.value = '' // allow re-picking the same file after an error
    if (!file) return
    try {
      const text = await file.text()
      const enrollment = parseBackup(text)
      saveEnrollment(enrollment)
      onEnrolled(enrollment)
    } catch (err) {
      setImportError(
        err instanceof Error ? err.message : "That file isn't a Steward guardian backup.",
      )
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!vaultId.trim()) {
      setError('Enter the vault id your owner gave you.')
      return
    }

    // Normalize the pasted share to just this guardian's SecretShare JSON, and adopt
    // any guardian id it carries if the field is blank.
    let shareJson: string
    let resolvedGuardianId = guardianId.trim()
    try {
      const r = normalizeShare(share, resolvedGuardianId)
      shareJson = r.shareJson
      if (!resolvedGuardianId && r.guardianId) resolvedGuardianId = r.guardianId
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      return
    }
    if (!resolvedGuardianId) {
      setError('Enter your guardian id (your relay name, e.g. amara).')
      return
    }
    if (passphrase.length < MIN_PASSPHRASE) {
      setError(`Choose a passphrase of at least ${MIN_PASSPHRASE} characters.`)
      return
    }
    if (passphrase !== confirm) {
      setError('The two passphrases do not match.')
      return
    }

    setBusy(true)
    try {
      // seal_share runs argon2id — deliberately slow (a second or two).
      const sealedBlob = await sealShare(shareJson, passphrase)
      const enrollment: Enrollment = {
        coordinator: coordinator.trim(),
        vaultId: vaultId.trim(),
        guardianId: resolvedGuardianId,
        sealedBlob,
        enrolledAt: Date.now(),
      }
      saveEnrollment(enrollment)
      onEnrolled(enrollment)
    } catch (err) {
      setBusy(false)
      setError(
        err instanceof Error
          ? `Could not seal the share: ${err.message}`
          : 'Could not seal the share.',
      )
    }
  }

  return (
    <Shell>
      <form className="enroll" onSubmit={submit}>
        <header className="enroll-head">
          <p className="eyebrow">Become a guardian</p>
          <h1 className="enroll-title">Take up your share.</h1>
          <p className="lede">
            You have been trusted to help steward a vault. Load the share your owner gave you and
            set a passphrase to seal it on this device. The share is encrypted at rest and{' '}
            <strong>never leaves this browser</strong> — not even to sign.
          </p>
          {fromLink && (
            <p className="fine enroll-fromlink">Prefilled from your enrollment link. Check it, then set a passphrase.</p>
          )}
        </header>

        <section className="panel field-group enroll-import">
          <div className="field-head">
            <p className="eyebrow">Restore a backup</p>
            <p className="field-hint">
              Enrolled before and saved a backup? Load it to return straight to unlock — it stays
              encrypted, so you'll still need your passphrase.
            </p>
          </div>
          <div className="enroll-import-row">
            <input
              ref={fileRef}
              className="visually-hidden"
              type="file"
              accept="application/json,.json"
              onChange={importBackup}
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              className="btn btn--sm"
              type="button"
              onClick={() => fileRef.current?.click()}
            >
              Import a backup file
            </button>
          </div>
          {importError && (
            <p className="notice notice--grave" role="alert">
              {importError}
            </p>
          )}
        </section>

        <p className="enroll-or eyebrow" aria-hidden="true">
          <span>or take up a new share</span>
        </p>

        <section className="panel field-group">
          <div className="field-head">
            <p className="eyebrow">The vault</p>
            <p className="field-hint">Where this guardian reports for duty.</p>
          </div>
          <label className="field">
            <span className="field-label eyebrow">Coordinator</span>
            <input
              className="input input--mono"
              value={coordinator}
              onChange={(e) => setCoordinator(e.target.value)}
              placeholder="leave blank for the demo (same origin)"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="field-hint">Blank uses this page's origin (the dev server proxies to the coordinator).</span>
          </label>
          <div className="field-row">
            <label className="field">
              <span className="field-label eyebrow">Vault id</span>
              <input
                className="input input--mono"
                value={vaultId}
                onChange={(e) => setVaultId(e.target.value)}
                placeholder="vault-1"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <label className="field">
              <span className="field-label eyebrow">Your guardian id</span>
              <input
                className="input input--mono"
                value={guardianId}
                onChange={(e) => setGuardianId(e.target.value)}
                placeholder="amara"
                autoComplete="off"
                spellCheck={false}
              />
            </label>
          </div>
        </section>

        <section className="panel field-group">
          <div className="field-head">
            <p className="eyebrow">Your share</p>
            <p className="field-hint">
              Paste the JSON your owner handed you — your single entry, or the whole list (we take
              only yours).
            </p>
          </div>
          <label className="field">
            <span className="field-label eyebrow">Secret share</span>
            <textarea
              className="input input--mono textarea"
              value={share}
              onChange={(e) => setShare(e.target.value)}
              placeholder='{"guardian_id":"amara","secret_share":{ … }}'
              rows={5}
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        </section>

        <section className="panel field-group">
          <div className="field-head">
            <p className="eyebrow">Seal it</p>
            <p className="field-hint">This passphrase encrypts the share on this device. There is no recovery — remember it.</p>
          </div>
          <div className="field-row">
            <label className="field">
              <span className="field-label eyebrow">Passphrase</span>
              <input
                className="input"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="a strong passphrase"
                autoComplete="new-password"
              />
            </label>
            <label className="field">
              <span className="field-label eyebrow">Confirm</span>
              <input
                className="input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="again"
                autoComplete="new-password"
              />
            </label>
          </div>
        </section>

        {error && (
          <p className="notice notice--grave" role="alert">
            {error}
          </p>
        )}

        <div className="enroll-actions">
          <button className="btn btn--primary" type="submit" disabled={busy}>
            {busy ? 'Sealing your share…' : 'Seal & enroll'}
          </button>
          <p className="fine">
            Sealing derives a key with argon2id (a second or two) and encrypts your share with
            XChaCha20-Poly1305. Only the sealed blob is stored.
          </p>
        </div>
      </form>
    </Shell>
  )
}
