// A guardian's enrollment, persisted locally. The stored blob is already sealed
// (argon2id → XChaCha20-Poly1305), so the plaintext share is never at rest — but the
// blob is still guardian-secret, so it lives only in this browser's localStorage,
// keyed per origin. Unlock (argon2id) happens in memory, once per session.

const KEY = 'steward.guardian.enrollment.v1'

export interface Enrollment {
  /** The coordinator origin. `''` = same-origin (dev proxy). */
  coordinator: string
  /** The vault this guardian stewards. */
  vaultId: string
  /** This guardian's relay id (== the id invited in `/pending`, e.g. `amara`). */
  guardianId: string
  /** The sealed keystore blob (JSON string from `seal_share`). */
  sealedBlob: string
  /** When this device was enrolled (unix ms). */
  enrolledAt: number
}

export function loadEnrollment(): Enrollment | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const e = JSON.parse(raw) as Enrollment
    if (typeof e.vaultId !== 'string' || typeof e.sealedBlob !== 'string') return null
    return e
  } catch {
    return null
  }
}

export function saveEnrollment(e: Enrollment): void {
  localStorage.setItem(KEY, JSON.stringify(e))
}

export function clearEnrollment(): void {
  localStorage.removeItem(KEY)
}
