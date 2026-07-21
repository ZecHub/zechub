// Encrypted-share backup: export the local Enrollment to a file, and import one back.
//
// The Enrollment's `sealedBlob` is *already* encrypted (argon2id → XChaCha20-Poly1305),
// so writing it to a file is safe — the file is useless without the passphrase, which is
// never stored and never exported. Import is a pure restore: we validate the shape and
// hand the sealed blob straight back to storage. No re-sealing, no decryption.

import type { Enrollment } from './storage'

/** The grave, in-voice message for anything that is not a real backup. */
const NOT_A_BACKUP = "That file isn't a Steward guardian backup."

/** Make an id safe to drop into a filename: keep word chars, `.`, `-`, `_`; fold the
 *  rest to `-`; trim stray separators. Falls back to `unknown` if nothing survives. */
export function sanitizeId(id: string): string {
  const cleaned = id.trim().replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
  return cleaned || 'unknown'
}

/** `steward-guardian-<vaultId>-<guardianId>.json`, ids sanitized. */
export function backupFilename(e: Pick<Enrollment, 'vaultId' | 'guardianId'>): string {
  return `steward-guardian-${sanitizeId(e.vaultId)}-${sanitizeId(e.guardianId)}.json`
}

/** True iff `sealedBlob` parses as the sealed-blob shape `{ v, kdf, salt, nonce, ct }`
 *  (the JSON `seal_share` emits). We check structure only — never decrypt. */
export function isSealedBlob(sealedBlob: string): boolean {
  let b: unknown
  try {
    b = JSON.parse(sealedBlob)
  } catch {
    return false
  }
  if (!b || typeof b !== 'object' || Array.isArray(b)) return false
  const o = b as Record<string, unknown>
  return (
    typeof o.v === 'number' &&
    typeof o.kdf === 'string' &&
    typeof o.salt === 'string' &&
    typeof o.nonce === 'string' &&
    typeof o.ct === 'string'
  )
}

/** Serialize an Enrollment to its backup file: the exact `{ coordinator, vaultId,
 *  guardianId, sealedBlob, enrolledAt }` — nothing decrypted, no passphrase. Pretty so a
 *  human can eyeball it. Round-trips: `parseBackup(exportBackup(e).json)` equals `e`. */
export function exportBackup(e: Enrollment): { filename: string; json: string } {
  const backup: Enrollment = {
    coordinator: e.coordinator,
    vaultId: e.vaultId,
    guardianId: e.guardianId,
    sealedBlob: e.sealedBlob,
    enrolledAt: e.enrolledAt,
  }
  return { filename: backupFilename(e), json: JSON.stringify(backup, null, 2) }
}

/** Parse + validate a backup file's text into an Enrollment, or throw a grave, in-voice
 *  Error. A real backup is a JSON object carrying a `vaultId` and a `sealedBlob` of the
 *  sealed-blob shape; anything else is rejected. Never re-seals, never decrypts. */
export function parseBackup(text: string): Enrollment {
  let obj: unknown
  try {
    obj = JSON.parse(text)
  } catch {
    throw new Error(NOT_A_BACKUP)
  }
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error(NOT_A_BACKUP)
  }
  const e = obj as Record<string, unknown>
  const hasVault = typeof e.vaultId === 'string' && e.vaultId.trim() !== ''
  const hasBlob = typeof e.sealedBlob === 'string' && e.sealedBlob.trim() !== ''
  if (!hasVault || !hasBlob) throw new Error(NOT_A_BACKUP)
  if (!isSealedBlob(e.sealedBlob as string)) {
    throw new Error(
      "That file looks like a backup, but its sealed share is missing or damaged — it can't be restored.",
    )
  }
  return {
    coordinator: typeof e.coordinator === 'string' ? e.coordinator : '',
    vaultId: e.vaultId as string,
    guardianId: typeof e.guardianId === 'string' ? e.guardianId : '',
    sealedBlob: e.sealedBlob as string,
    enrolledAt: typeof e.enrolledAt === 'number' ? e.enrolledAt : Date.now(),
  }
}

/** Trigger a browser download of the Enrollment's encrypted backup file. No libs: a
 *  Blob + object URL, clicked and revoked. Only the already-sealed blob leaves the app. */
export function downloadBackup(e: Enrollment): void {
  const { filename, json } = exportBackup(e)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Revoke on the next tick so the download has claimed the URL first.
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
