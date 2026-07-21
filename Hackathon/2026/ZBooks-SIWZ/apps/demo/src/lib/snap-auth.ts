import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { addKey, ensureMember, listKeys } from "./db";
import { inspectUfvk } from "./ufvk";

// Snap auth: the ChainSafe Zcash Snap has no signMessage, so we treat
// the user's permission grant (UFVK + seed fingerprint via MetaMask's
// approval prompt) as authentication. The HMAC envelope below stops a
// random script tag from POSTing arbitrary creds and getting a session.

const ALLOWED_FP = /^[0-9a-fA-F]{8,128}$/;

export interface SnapCredentials {
  fingerprint: string;
  ufvk: string;
}

export function signSnapEnvelope(creds: SnapCredentials, secret: string): string {
  return createHmac("sha256", secret)
    .update(`${creds.fingerprint}::${creds.ufvk}`)
    .digest("hex");
}

export function verifySnapEnvelope(creds: SnapCredentials, envelope: string, secret: string): boolean {
  const expected = signSnapEnvelope(creds, secret);
  if (envelope.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(envelope), Buffer.from(expected));
}

export function validateSnapCredentials(creds: SnapCredentials): { ok: true } | { ok: false; reason: string } {
  if (!ALLOWED_FP.test(creds.fingerprint)) {
    return { ok: false, reason: "Fingerprint must be hex (8–128 chars)" };
  }
  // Anonymous memo sessions ride this same envelope path with a synthetic ufvk; allow that.
  if (creds.ufvk.startsWith("anon:")) return { ok: true };
  const inspection = inspectUfvk(creds.ufvk);
  if (!inspection.valid) return { ok: false, reason: inspection.reason };
  return { ok: true };
}

// Prefer UFVK-hash as identity so the same wallet stays the same user across
// MetaMask reinstalls (UFVK is seed-derived, fingerprint can change).
// Falls back to snap:<fingerprint> when no real UFVK is present.
export function snapIdentityFor(fingerprint: string, ufvk?: string): string {
  if (ufvk && !ufvk.startsWith("anon:")) {
    return `anon:${createHash("sha256").update(ufvk).digest("hex").slice(0, 32)}`;
  }
  return `snap:${fingerprint.slice(0, 32)}`;
}

// Ensure team membership + auto-import the UFVK if it's real and new.
export async function onSnapAuthSuccess(
  creds: SnapCredentials,
  label?: string,
): Promise<{ identity: string }> {
  const identity = snapIdentityFor(creds.fingerprint, creds.ufvk);
  await ensureMember(identity);
  const ufvk = creds.ufvk?.trim() ?? "";
  if (ufvk && !ufvk.startsWith("anon:")) {
    const already = (await listKeys()).some((k) => k.ufvk.trim() === ufvk);
    if (!already) {
      // Unique-ish default so multiple snap imports do not collide on one name.
      const short = ufvk.length > 22 ? `${ufvk.slice(0, 12)}…${ufvk.slice(-6)}` : ufvk;
      await addKey({ owner: identity, label: label ?? `MetaMask wallet ${short}`, ufvk });
    }
  }
  return { identity };
}
