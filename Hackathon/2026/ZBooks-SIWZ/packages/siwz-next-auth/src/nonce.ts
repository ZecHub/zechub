import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Stateless HMAC-signed nonce tokens for SIWZ.
 * Format: base64url(nonce) "." base64url(expiryMs) "." base64url(hmac).
 */
export interface NonceTokenOptions {
  /** Symmetric secret. ≥ 16 chars (32+ recommended). Typically reuse NEXTAUTH_SECRET. */
  secret: string;
  /** Lifetime in seconds. Default: 600 (10 min). */
  ttlSeconds?: number;
}

function requireSecret(secret: string, where: string): void {
  if (!secret || secret.length < 16) {
    throw new Error(`${where}: secret must be ≥ 16 characters`);
  }
}

const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomNonce(): string {
  const bytes = randomBytes(12);
  let out = "";
  for (let i = 0; i < bytes.length; i++) out += ALPHA[bytes[i]! % ALPHA.length];
  return out;
}

function b64url(s: Buffer | string): string {
  const b = typeof s === "string" ? Buffer.from(s) : s;
  return b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? 0 : 4 - (s.length % 4);
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad), "base64");
}

function sign(secret: string, payload: string): string {
  return b64url(createHmac("sha256", secret).update(payload).digest());
}

export interface IssuedNonce {
  /** The opaque nonce to embed in the SIWZ message. */
  nonce: string;
  /** The signed token to round-trip back from the client. */
  token: string;
  /** When this nonce expires. */
  expiresAt: Date;
}

export function issueNonce(opts: NonceTokenOptions): IssuedNonce {
  requireSecret(opts.secret, "issueNonce");
  const ttl = (opts.ttlSeconds ?? 600) * 1000;
  const nonce = randomNonce();
  const expiresAtMs = Date.now() + ttl;
  const payload = `${b64url(nonce)}.${b64url(String(expiresAtMs))}`;
  const sig = sign(opts.secret, payload);
  return {
    nonce,
    token: `${payload}.${sig}`,
    expiresAt: new Date(expiresAtMs),
  };
}

export interface VerifyNonceResult {
  ok: boolean;
  nonce?: string;
  error?: "MALFORMED" | "BAD_SIGNATURE" | "EXPIRED";
}

export function verifyNonceToken(token: string, opts: NonceTokenOptions): VerifyNonceResult {
  requireSecret(opts.secret, "verifyNonceToken");
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, error: "MALFORMED" };
  const [nonceB64, expB64, sig] = parts as [string, string, string];
  const expected = sign(opts.secret, `${nonceB64}.${expB64}`);
  if (sig.length !== expected.length) return { ok: false, error: "BAD_SIGNATURE" };
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return { ok: false, error: "BAD_SIGNATURE" };
  }
  const expiresAtMs = Number(b64urlDecode(expB64).toString());
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) {
    return { ok: false, error: "EXPIRED" };
  }
  return { ok: true, nonce: b64urlDecode(nonceB64).toString() };
}
