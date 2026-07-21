// Enrollment helpers: normalize a pasted share, and read/write the `#enroll=…` link
// the owner console can hand each guardian.

/** The fields an enrollment link / paste can carry. `share` is a guardian's own
 *  `SecretShare` JSON (the inner object `seal_share` expects). */
export interface EnrollDraft {
  coordinator: string
  vaultId: string
  guardianId: string
  /** The guardian's `SecretShare` as a JSON string, ready for `seal_share`. */
  shareJson: string
}

// --- base64url of UTF-8, so a link survives copy/paste ---------------------------

function toB64Url(s: string): string {
  const bytes = new TextEncoder().encode(s)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64Url(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

/** Build a `#enroll=…` link carrying `{ coordinator, vaultId, guardianId, share }`.
 *  `share` is the SecretShare object. (The owner console can use this to hand out a
 *  per-guardian link.) */
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

/** Parse a `#enroll=…` hash into a draft, or `null` if it is not an enroll link. */
export function parseEnrollLink(hash: string): Partial<EnrollDraft> | null {
  const m = hash.match(/[#&]enroll=([^&]+)/)
  if (!m) return null
  try {
    const obj = JSON.parse(fromB64Url(m[1])) as Record<string, unknown>
    const shareJson =
      obj.share === undefined ? '' : normalizeShare(JSON.stringify(obj.share), String(obj.guardianId ?? '')).shareJson
    return {
      coordinator: typeof obj.coordinator === 'string' ? obj.coordinator : '',
      vaultId: typeof obj.vaultId === 'string' ? obj.vaultId : '',
      guardianId: typeof obj.guardianId === 'string' ? obj.guardianId : '',
      shareJson,
    }
  } catch {
    return null
  }
}

/** Normalize whatever a guardian pastes into just their `SecretShare` JSON.
 *
 *  Accepts, in order of preference:
 *   - the whole `shares_json` array `[{ guardian_id, secret_share }, …]` → picks the
 *     entry whose `guardian_id` matches `guardianId` (or the sole entry);
 *   - a single wrapper `{ guardian_id, secret_share }`;
 *   - a bare `SecretShare` object (already the inner form).
 *
 *  Returns the inner `SecretShare` JSON plus any `guardian_id` it discovered (so the
 *  Enroll form can auto-fill the relay id). Throws a plain message on bad input. */
export function normalizeShare(
  pasted: string,
  guardianId: string,
): { shareJson: string; guardianId?: string } {
  const trimmed = pasted.trim()
  if (!trimmed) throw new Error('Paste the share JSON your owner gave you.')

  let parsed: unknown
  try {
    parsed = JSON.parse(trimmed)
  } catch {
    throw new Error('That is not valid JSON. Paste the share exactly as you received it.')
  }

  const pickFromWrapper = (w: Record<string, unknown>) => ({
    shareJson: JSON.stringify(w.secret_share),
    guardianId: typeof w.guardian_id === 'string' ? w.guardian_id : undefined,
  })

  // Array = the full shares_json.
  if (Array.isArray(parsed)) {
    const wrappers = parsed as Array<Record<string, unknown>>
    if (wrappers.length === 0) throw new Error('The shares list is empty.')
    const want = guardianId.trim().toLowerCase()
    const chosen =
      wrappers.find((w) => String(w.guardian_id ?? '').toLowerCase() === want) ??
      (wrappers.length === 1 ? wrappers[0] : undefined)
    if (!chosen) {
      const ids = wrappers.map((w) => String(w.guardian_id ?? '?')).join(', ')
      throw new Error(`Enter your guardian id first — the paste lists: ${ids}.`)
    }
    return pickFromWrapper(chosen)
  }

  // Object: either a { guardian_id, secret_share } wrapper or a bare SecretShare.
  if (parsed && typeof parsed === 'object') {
    const obj = parsed as Record<string, unknown>
    if ('secret_share' in obj) return pickFromWrapper(obj)
    // Bare SecretShare — leave it as-is (seal_share validates it).
    return { shareJson: trimmed }
  }

  throw new Error('Unrecognized share format. Paste the JSON your owner gave you.')
}
