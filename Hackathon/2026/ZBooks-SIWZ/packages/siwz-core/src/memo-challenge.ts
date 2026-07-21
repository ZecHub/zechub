import { parseAddress } from "./address.js";
import { buildZip321, zecToZatoshi } from "./zip321.js";
import { SiwzError } from "./errors.js";
import type { Network } from "./types.js";

const MEMO_PREFIX = "SIWZ:";

function formatMemo(nonce: string): string {
  return `${MEMO_PREFIX}${nonce}`;
}

function extractNonce(memo: string): string | null {
  if (!memo.startsWith(MEMO_PREFIX)) return null;
  return memo.slice(MEMO_PREFIX.length);
}

export type MemoChallengeMode = "transparent-amount" | "shielded-memo";

function inferMode(serviceAddress: string): MemoChallengeMode {
  const parsed = parseAddress(serviceAddress);
  return parsed.type === "p2pkh" || parsed.type === "p2sh" ? "transparent-amount" : "shielded-memo";
}

/**
 * SIWZ memo-challenge: prove address control by sending a tiny ZIP 321 payment
 * rather than signing a message (which most Zcash wallets don't expose).
 * Two modes: transparent-amount (nonce in least-significant zatoshi) and
 * shielded-memo (nonce in the encrypted memo field).
 */

export interface IssueMemoChallengeOpts {
  /** HMAC secret used to sign the stateless challenge token. */
  secret: string;
  /** Service address the proof tx must be sent to. Mode is inferred from its type. */
  serviceAddress: string;
  network: Network;
  /** Force a specific mode. Defaults to auto-detection from the address type. */
  mode?: MemoChallengeMode;
  /** Base amount in ZEC. A 3-digit zatoshi nonce is added on top. Default 0.000001. */
  baseAmountZec?: string;
  /** Challenge TTL in seconds. Default 600. */
  ttlSeconds?: number;
  /** Identity bound to the resulting session. Defaults to a random "anon:…" id. */
  identity?: string;
  /** Optional free-text shown by the wallet on the payment screen. */
  message?: string;
  /** Optional short label shown by the wallet. */
  label?: string;
}

export interface MemoChallenge {
  mode: MemoChallengeMode;
  /** ZIP 321 URI to render as QR or `zcash:` deep link. */
  uri: string;
  /** Amount in ZEC the user must send. Unique per-challenge in transparent-amount mode; fixed dust in shielded-memo mode. */
  amountZec: string;
  amountZatoshi: string;
  /** Memo the user must include (shielded-memo mode only). */
  memo?: string;
  serviceAddress: string;
  /** Stateless HMAC-signed token to round-trip back to verifyMemoChallenge. */
  token: string;
  expiresAt: string;
}

export interface VerifyMemoChallengeOpts {
  secret: string;
  /** Token issued by issueMemoChallenge. */
  token: string;
  /** Required for transparent-amount mode. */
  observedAmountZatoshi?: bigint | string;
  /** Required for shielded-memo mode. */
  observedMemo?: string;
  /** Recipient address observed on-chain. Must match the token's service address. */
  observedRecipient: string;
  now?: Date;
}

export type MemoVerifyErrorCode =
  | "MALFORMED_TOKEN"
  | "BAD_SIGNATURE"
  | "EXPIRED"
  | "AMOUNT_MISMATCH"
  | "MEMO_MISMATCH"
  | "MISSING_OBSERVATION"
  | "RECIPIENT_MISMATCH";

export interface VerifyMemoChallengeResult {
  ok: boolean;
  identity?: string;
  mode?: MemoChallengeMode;
  error?: MemoVerifyErrorCode;
  errorMessage?: string;
}

interface ChallengePayload {
  v: 1;
  /** "ta" = transparent-amount, "sm" = shielded-memo. */
  m: "ta" | "sm";
  /** Service address. */
  to: string;
  /** Expected amount in zatoshi. In shielded-memo mode this is fixed dust; the memo is the binding artifact. */
  z: string;
  /** Expected memo body after "SIWZ:" prefix (shielded-memo mode). */
  n?: string;
  id: string;
  /** ms-since-epoch expiry. */
  exp: number;
}

/** Issue a memo-challenge. Returns a stateless HMAC-signed token plus the wallet-facing ZIP 321 payment request. */
export async function issueMemoChallenge(opts: IssueMemoChallengeOpts): Promise<MemoChallenge> {
  if (!opts.secret || opts.secret.length < 16) {
    throw new SiwzError("INVALID_MESSAGE", "issueMemoChallenge: secret must be ≥ 16 characters");
  }
  const mode: MemoChallengeMode = opts.mode ?? inferMode(opts.serviceAddress);

  const ttl = (opts.ttlSeconds ?? 600) * 1000;
  const expiresAtMs = Date.now() + ttl;
  const identity = opts.identity ?? `anon:${secureRandomU32().toString(16).padStart(8, "0")}${secureRandomU32().toString(16).padStart(8, "0")}`;

  if (mode === "transparent-amount") {
    const base = zecToZatoshi(opts.baseAmountZec ?? "0.000001");
    const nonceZatoshi = BigInt(secureRandomU32() % 1_000);
    const totalZatoshi = base + nonceZatoshi;
    const amountZec = formatZatoshi(totalZatoshi);

    const payload: ChallengePayload = {
      v: 1,
      m: "ta",
      to: opts.serviceAddress,
      z: totalZatoshi.toString(),
      id: identity,
      exp: expiresAtMs,
    };
    const token = await signPayload(opts.secret, payload);

    const uri = buildZip321({
      address: opts.serviceAddress,
      amount: amountZec,
      label: opts.label ?? "SIWZ sign-in",
      message: opts.message ?? "Send to authenticate. The amount is unique to this sign-in attempt.",
    });

    return {
      mode,
      uri,
      amountZec,
      amountZatoshi: totalZatoshi.toString(),
      serviceAddress: opts.serviceAddress,
      token,
      expiresAt: new Date(expiresAtMs).toISOString(),
    };
  }

  const dust = zecToZatoshi(opts.baseAmountZec ?? "0.000001");
  // 12 alphanumeric chars = ~70 bits of entropy.
  const nonce = randomAlphanumeric(12);
  const memo = formatMemo(nonce);

  const payload: ChallengePayload = {
    v: 1,
    m: "sm",
    to: opts.serviceAddress,
    z: dust.toString(),
    n: nonce,
    id: identity,
    exp: expiresAtMs,
  };
  const token = await signPayload(opts.secret, payload);

  const uri = buildZip321({
    address: opts.serviceAddress,
    amount: formatZatoshi(dust),
    memo,
    label: opts.label ?? "SIWZ sign-in",
    message: opts.message ?? "Send to authenticate. The memo proves this sign-in is yours.",
  });

  return {
    mode,
    uri,
    amountZec: formatZatoshi(dust),
    amountZatoshi: dust.toString(),
    memo,
    serviceAddress: opts.serviceAddress,
    token,
    expiresAt: new Date(expiresAtMs).toISOString(),
  };
}

async function signPayload(secret: string, payload: ChallengePayload): Promise<string> {
  const payloadB64 = base64urlEncodeStr(JSON.stringify(payload));
  const sig = await hmacB64(secret, payloadB64);
  return `${payloadB64}.${sig}`;
}

const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function randomAlphanumeric(len: number): string {
  const buf = new Uint8Array(len);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(buf);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { randomFillSync } = require("node:crypto");
    randomFillSync(buf);
  }
  let out = "";
  for (let i = 0; i < len; i++) out += ALPHA[buf[i]! % ALPHA.length];
  return out;
}

export async function verifyMemoChallenge(opts: VerifyMemoChallengeOpts): Promise<VerifyMemoChallengeResult> {
  const parts = opts.token.split(".");
  if (parts.length !== 2) return failure("MALFORMED_TOKEN", "token must be 'payload.signature'");
  const [payloadB64, sig] = parts as [string, string];

  const expectedSig = await hmacB64(opts.secret, payloadB64);
  if (!constantTimeEq(sig, expectedSig)) return failure("BAD_SIGNATURE", "HMAC mismatch");

  let payload: ChallengePayload;
  try {
    payload = JSON.parse(base64urlDecodeStr(payloadB64)) as ChallengePayload;
  } catch {
    return failure("MALFORMED_TOKEN", "payload is not valid base64url JSON");
  }
  if (payload.v !== 1) return failure("MALFORMED_TOKEN", `unsupported version ${payload.v}`);

  const now = (opts.now ?? new Date()).getTime();
  if (payload.exp <= now) return failure("EXPIRED", `challenge expired at ${new Date(payload.exp).toISOString()}`);

  if (payload.to !== opts.observedRecipient) {
    return failure(
      "RECIPIENT_MISMATCH",
      `expected tx to ${payload.to} but observed payment to ${opts.observedRecipient}`,
    );
  }

  const mode: MemoChallengeMode = payload.m === "sm" ? "shielded-memo" : "transparent-amount";

  if (mode === "transparent-amount") {
    if (opts.observedAmountZatoshi == null) {
      return failure("MISSING_OBSERVATION", "transparent-amount mode requires observedAmountZatoshi");
    }
    const observed = typeof opts.observedAmountZatoshi === "string"
      ? BigInt(opts.observedAmountZatoshi)
      : opts.observedAmountZatoshi;
    if (payload.z !== observed.toString()) {
      return failure(
        "AMOUNT_MISMATCH",
        `expected amount ${payload.z} zatoshi but observed ${observed.toString()}`,
      );
    }
    return { ok: true, identity: payload.id, mode };
  }

  if (!opts.observedMemo) {
    return failure("MISSING_OBSERVATION", "shielded-memo mode requires observedMemo");
  }
  const observedNonce = extractNonce(opts.observedMemo);
  if (!observedNonce) {
    return failure("MEMO_MISMATCH", `observed memo does not start with "${MEMO_PREFIX}"`);
  }
  if (observedNonce !== payload.n) {
    return failure(
      "MEMO_MISMATCH",
      `expected nonce "${payload.n}" but observed "${observedNonce}"`,
    );
  }
  return { ok: true, identity: payload.id, mode };
}

function failure(error: NonNullable<VerifyMemoChallengeResult["error"]>, message: string): VerifyMemoChallengeResult {
  return { ok: false, error, errorMessage: message };
}

/** Returns the address-type-appropriate mode for a given service address. */
export function inferMemoChallengeMode(serviceAddress: string): MemoChallengeMode {
  return inferMode(serviceAddress);
}

function formatZatoshi(z: bigint): string {
  const whole = z / 100_000_000n;
  const frac = z % 100_000_000n;
  if (frac === 0n) return whole.toString();
  const fracStr = frac.toString().padStart(8, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}`;
}

function secureRandomU32(): number {
  const buf = new Uint8Array(4);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(buf);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { randomFillSync } = require("node:crypto");
    randomFillSync(buf);
  }
  return new DataView(buf.buffer).getUint32(0, false);
}

function base64urlEncodeStr(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  const b64 = typeof btoa === "function" ? btoa(bin) : Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecodeStr(s: string): string {
  const pad = s.length % 4 === 0 ? 0 : 4 - (s.length % 4);
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  if (typeof atob === "function") {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(b64, "base64").toString("utf8");
}

async function hmacB64(secret: string, payload: string): Promise<string> {
  if (typeof globalThis.crypto?.subtle?.importKey === "function") {
    const enc = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(payload));
    const bytes = new Uint8Array(sig);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
    const b64 = typeof btoa === "function" ? btoa(bin) : Buffer.from(bin, "binary").toString("base64");
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
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
