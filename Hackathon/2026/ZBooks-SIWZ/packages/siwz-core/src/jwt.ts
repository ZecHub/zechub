import { SiwzError } from "./errors.js";

const HEADER = { alg: "HS256", typ: "JWT" } as const;
const HEADER_B64URL = base64UrlEncode(new TextEncoder().encode(JSON.stringify(HEADER)));

/**
 * Standard SIWZ JWT claims. Use any extra fields you like beyond these.
 */
export interface SiwzJwtClaims {
  /** Zcash address that signed in. The canonical user id. */
  sub: string;
  /** Issued-at, epoch seconds. Auto-filled if omitted. */
  iat?: number;
  /** Expiry, epoch seconds. Auto-filled from ttlSeconds if omitted. */
  exp?: number;
  /** Token id. Random hex auto-filled if omitted. */
  jti?: string;
  /** Issuer. Your app's name or URL. Optional but recommended. */
  iss?: string;
  /** Audience. The downstream backend that will verify this token. */
  aud?: string | string[];
  /** Which SIWZ flow produced the token. */
  flow?: "memo" | "signmessage" | "snap";
  /** Network the sub address belongs to. */
  network?: "mainnet" | "testnet" | "regtest";
  /** Any extra claims your app needs. */
  [key: string]: unknown;
}

export interface IssueSiwzJwtOpts {
  /** HMAC-SHA256 signing secret. >= 16 chars. */
  secret: string;
  /** Seconds until expiry. Default 3600 (1h). 0 disables auto-exp. */
  ttlSeconds?: number;
}

export interface VerifySiwzJwtOpts {
  /** HMAC-SHA256 secret used to issue the token. */
  secret: string;
  /** If set, token's `aud` claim must include this string. */
  audience?: string;
  /** If set, token's `iss` claim must match this string. */
  issuer?: string;
  /** Tolerated clock skew on iat/exp checks, in seconds. Default 30. */
  clockSkewSeconds?: number;
}

/**
 * Sign a SIWZ JWT (HS256). Returns a compact-form `<header>.<payload>.<sig>`
 * string. Works in Node, browsers, edge runtimes, Bun and Deno.
 */
export async function issueSiwzJwt(claims: SiwzJwtClaims, opts: IssueSiwzJwtOpts): Promise<string> {
  if (!opts.secret || opts.secret.length < 16) {
    throw new SiwzError("JWT_INVALID", "JWT secret must be >= 16 chars");
  }
  if (!claims.sub) {
    throw new SiwzError("JWT_INVALID", "sub claim is required");
  }
  const now = Math.floor(Date.now() / 1000);
  const ttl = opts.ttlSeconds ?? 3600;
  const body: SiwzJwtClaims = {
    ...claims,
    sub: claims.sub,
    iat: claims.iat ?? now,
    jti: claims.jti ?? randomHex(16),
  };
  if (ttl > 0 && body.exp === undefined) body.exp = now + ttl;

  const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(body)));
  const signingInput = `${HEADER_B64URL}.${payloadB64}`;
  const sig = await hmacSha256B64url(opts.secret, signingInput);
  return `${signingInput}.${sig}`;
}

/**
 * Verify a SIWZ JWT and return its claims. Throws `SiwzError` on any
 * tampering, expiry, or audience/issuer mismatch.
 */
export async function verifySiwzJwt(
  token: string,
  opts: VerifySiwzJwtOpts,
): Promise<SiwzJwtClaims> {
  if (!opts.secret || opts.secret.length < 16) {
    throw new SiwzError("JWT_INVALID", "JWT secret must be >= 16 chars");
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new SiwzError("JWT_INVALID", "Malformed JWT");
  }
  const [headerB64, payloadB64, sigB64] = parts as [string, string, string];

  const header = safeJsonDecode(headerB64);
  if (header?.alg !== "HS256" || header?.typ !== "JWT") {
    throw new SiwzError("JWT_INVALID", "Unsupported JWT header");
  }

  const expected = await hmacSha256B64url(opts.secret, `${headerB64}.${payloadB64}`);
  if (!constantTimeEq(expected, sigB64)) {
    throw new SiwzError("INVALID_SIGNATURE", "JWT signature mismatch");
  }

  const claims = safeJsonDecode(payloadB64) as SiwzJwtClaims | null;
  if (!claims || typeof claims.sub !== "string" || !claims.sub) {
    throw new SiwzError("JWT_INVALID", "Missing sub claim");
  }

  const skew = opts.clockSkewSeconds ?? 30;
  const now = Math.floor(Date.now() / 1000);
  if (typeof claims.exp === "number" && now > claims.exp + skew) {
    throw new SiwzError("EXPIRED", "JWT expired");
  }
  if (typeof claims.iat === "number" && claims.iat > now + skew) {
    throw new SiwzError("NOT_YET_VALID", "JWT iat in the future");
  }
  if (opts.issuer && claims.iss !== opts.issuer) {
    throw new SiwzError("JWT_ISSUER_MISMATCH", `JWT issuer mismatch: ${String(claims.iss)}`);
  }
  if (opts.audience) {
    const aud = claims.aud;
    const ok = Array.isArray(aud) ? aud.includes(opts.audience) : aud === opts.audience;
    if (!ok) {
      throw new SiwzError("JWT_AUDIENCE_MISMATCH", `JWT audience does not include ${opts.audience}`);
    }
  }

  return claims;
}

// ---- helpers ----------------------------------------------------------------

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  const b64 =
    typeof btoa === "function" ? btoa(bin) : Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecodeToString(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4);
  if (typeof atob === "function") {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(b64, "base64").toString("utf8");
}

function safeJsonDecode(b64url: string): Record<string, unknown> | null {
  try {
    return JSON.parse(base64UrlDecodeToString(b64url)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function hmacSha256B64url(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  if (typeof globalThis.crypto?.subtle?.importKey === "function") {
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(payload));
    return base64UrlEncode(new Uint8Array(sig));
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createHmac } = require("node:crypto");
  const b64 = createHmac("sha256", secret).update(payload).digest("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function constantTimeEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function randomHex(byteLen: number): string {
  const bytes = new Uint8Array(byteLen);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { randomBytes } = require("node:crypto");
    bytes.set(randomBytes(byteLen));
  }
  let out = "";
  for (let i = 0; i < byteLen; i++) out += bytes[i]!.toString(16).padStart(2, "0");
  return out;
}
