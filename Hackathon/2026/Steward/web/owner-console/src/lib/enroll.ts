// Enrollment-link builder for the owner console.
//
// This MUST match web/guardian/src/lib/enroll.ts byte-for-byte: the guardian app
// reads a `#enroll=<base64url(JSON({coordinator, vaultId, guardianId, share}))>`
// fragment via its `parseEnrollLink`, where `share` is that guardian's *bare*
// `SecretShare` object (the `secret_share` value from the seed's `shares_json`).
// The encoding here (toB64Url + payload shape) is a copy of the guardian's, so a link
// this console emits decodes cleanly there. Do not import across apps — the guardian
// is a separate Vite package; we mirror the tiny pure encoder instead.

/** Where the guardian web app is served (its own dev origin). Configurable via
 *  `VITE_GUARDIAN_URL`; defaults to the guardian dev server's port
 *  (see web/guardian/vite.config.ts → 5176). */
export const GUARDIAN_BASE_URL: string =
  (import.meta.env.VITE_GUARDIAN_URL as string | undefined)?.replace(/\/+$/, '') ??
  'http://localhost:5176'

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
