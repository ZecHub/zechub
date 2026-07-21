// Enrollment-link builder for the owner side of Steward.
//
// The `#enroll=<base64url(JSON({coordinator, vaultId, guardianId, share}))>` fragment
// format is unchanged, and the guardian side reads it with the SAME `parseEnrollLink`
// encoder (`src/guardian/lib/enroll.ts`), where `share` is that guardian's *bare*
// `SecretShare` object (the `secret_share` value from the seed's `shares_json`). Now that
// the guardian side lives in this same app, a link this screen emits opens the guardian
// section HERE (at `#enroll=…`). We still mirror the tiny pure encoder rather than import
// across the owner/guardian boundary, so the two halves stay byte-compatible.

/** Where the guardian side is served. In the unified app that is THIS origin (the
 *  `#enroll=…` link opens the guardian section here). Overridable via `VITE_GUARDIAN_URL`
 *  for a split deployment where the guardian app is hosted separately. */
export const GUARDIAN_BASE_URL: string =
  (import.meta.env.VITE_GUARDIAN_URL as string | undefined)?.replace(/\/+$/, '') ??
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5175')

/** One guardian's entry in the demo seed's `shares_json`
 *  (`[{ guardian_id, secret_share }, …]`). */
export interface GuardianShare {
  guardian_id: string
  /** The bare `SecretShare` object (opaque FROST type; passed through untouched). */
  secret_share: unknown
}

// --- base64url of UTF-8 JSON — identical to the guardian's toB64Url --------------

function toB64Url(s: string): string {
  const bytes = new TextEncoder().encode(s)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Build a guardian's `#enroll=…` link carrying `{ coordinator, vaultId, guardianId,
 *  share }`. `share` is the guardian's bare `SecretShare` object. Mirrors the
 *  guardian's `buildEnrollLink` exactly (same payload order, same encoder). */
export function buildEnrollLink(
  origin: string,
  d: { coordinator: string; vaultId: string; guardianId: string; share: unknown },
): string {
  const payload = JSON.stringify({
    coordinator: d.coordinator,
    vaultId: d.vaultId,
    guardianId: d.guardianId,
    share: d.share,
  })
  return `${origin.replace(/\/$/, '')}/#enroll=${toB64Url(payload)}`
}

/** What each row of the "Distribute guardian shares" step needs. */
export interface EnrollmentRow {
  guardianId: string
  /** The copyable `#enroll=…` link for this guardian. */
  link: string
  /** The `{ guardian_id, secret_share }` wrapper, pretty-printed — the fallback the
   *  owner can paste into the guardian app's Enroll screen (it auto-fills the id). */
  pasteJson: string
}

/** Build one enrollment row per guardian from a vault's seed shares. `coordinator`
 *  is left blank so the guardian app uses its own origin's proxy to the coordinator
 *  (the demo path — see the guardian Enroll screen's "leave blank for the demo"). */
export function enrollmentRows(
  vaultId: string,
  shares: GuardianShare[],
  origin: string = GUARDIAN_BASE_URL,
): EnrollmentRow[] {
  return shares.map((s) => ({
    guardianId: s.guardian_id,
    link: buildEnrollLink(origin, {
      coordinator: '',
      vaultId,
      guardianId: s.guardian_id,
      share: s.secret_share,
    }),
    pasteJson: JSON.stringify(
      { guardian_id: s.guardian_id, secret_share: s.secret_share },
      null,
      2,
    ),
  }))
}
