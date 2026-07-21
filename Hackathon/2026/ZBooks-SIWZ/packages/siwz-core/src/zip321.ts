import { parseAddress } from "./address.js";
import { SiwzError } from "./errors.js";
import type { Network } from "./types.js";

/**
 * ZIP 321 Payment Request URI format (https://zips.z.cash/zip-0321).
 * `buildZip321` is single-recipient; `buildZip321Multi` emits the indexed
 * (`address.1`, `address.2`, ...) multi-payment form used for batch payouts.
 */

export interface ZIP321Request {
  /** Recipient address (transparent, Sapling, or unified). */
  address: string;
  /** Amount in ZEC as a decimal string (not zatoshi), e.g. "0.00001337". */
  amount?: string;
  /** UTF-8 memo. Base64url-encoded on the wire. Max 512 bytes per ZIP 321. */
  memo?: string;
  /** Short label shown by the wallet. */
  label?: string;
  /** Free-text message shown by the wallet. */
  message?: string;
}

const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();

function base64urlEncode(bytes: Uint8Array): string {
  // RFC 4648 §5, no padding.
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  const b64 = typeof btoa === "function" ? btoa(bin) : Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? 0 : 4 - (s.length % 4);
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  if (typeof atob === "function") {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  return new Uint8Array(Buffer.from(b64, "base64"));
}

/** True for addresses that can receive an encrypted memo (Sapling/Orchard/Unified). */
export function isShieldedAddress(address: string): boolean {
  try {
    const t = parseAddress(address).type;
    return t === "sapling" || t === "orchard" || t === "unified";
  } catch {
    return false;
  }
}

// Multi-recipient ZIP 321 (one tx, many payments): payment 0 is unindexed, the
// rest use the `.N` paramindex. Throws on a memo to a transparent recipient.
export function buildZip321Multi(payments: ZIP321Request[]): string {
  if (payments.length === 0) {
    throw new SiwzError("INVALID_MESSAGE", "ZIP 321: at least one payment required");
  }
  if (payments.length === 1) return buildZip321(payments[0]!);
  if (payments.length > 9999) {
    throw new SiwzError("INVALID_MESSAGE", "ZIP 321: at most 9999 payments per URI");
  }

  const params = new URLSearchParams();
  payments.forEach((req, i) => {
    if (!req.address) {
      throw new SiwzError("INVALID_ADDRESS", `ZIP 321: payment ${i} has no address`);
    }
    let parsed;
    try {
      parsed = parseAddress(req.address);
    } catch (err) {
      throw new SiwzError("INVALID_ADDRESS", `ZIP 321: payment ${i}: ${(err as Error).message}`);
    }
    const sfx = i === 0 ? "" : `.${i}`;
    params.set(`address${sfx}`, req.address);
    if (req.amount !== undefined) params.set(`amount${sfx}`, normaliseAmount(req.amount));
    if (req.memo !== undefined) {
      const shielded = parsed.type === "sapling" || parsed.type === "orchard" || parsed.type === "unified";
      if (!shielded) {
        throw new SiwzError(
          "INVALID_MESSAGE",
          `ZIP 321: payment ${i}: memo is only valid for shielded recipients`,
        );
      }
      const memoBytes = TEXT_ENCODER.encode(req.memo);
      if (memoBytes.length > 512) {
        throw new SiwzError("INVALID_MESSAGE", `ZIP 321: payment ${i}: memo > 512 bytes`);
      }
      params.set(`memo${sfx}`, base64urlEncode(memoBytes));
    }
    if (req.label !== undefined) params.set(`label${sfx}`, req.label);
    if (req.message !== undefined) params.set(`message${sfx}`, req.message);
  });

  // Empty path: payment 0's address rides in the query string. Valid ZIP 321.
  return `zcash:?${params.toString()}`;
}

/** Build a ZIP 321 URI. Throws SiwzError on invalid input. */
export function buildZip321(req: ZIP321Request): string {
  if (!req.address) throw new SiwzError("INVALID_ADDRESS", "ZIP 321: address required");
  try {
    parseAddress(req.address);
  } catch (err) {
    throw new SiwzError("INVALID_ADDRESS", `ZIP 321: ${(err as Error).message}`);
  }

  const params = new URLSearchParams();
  if (req.amount !== undefined) {
    const amountStr = normaliseAmount(req.amount);
    params.set("amount", amountStr);
  }
  if (req.memo !== undefined) {
    const memoBytes = TEXT_ENCODER.encode(req.memo);
    if (memoBytes.length > 512) {
      throw new SiwzError("INVALID_MESSAGE", `ZIP 321: memo must be ≤ 512 bytes (got ${memoBytes.length})`);
    }
    params.set("memo", base64urlEncode(memoBytes));
  }
  if (req.label !== undefined) params.set("label", req.label);
  if (req.message !== undefined) params.set("message", req.message);

  const qs = params.toString();
  return qs ? `zcash:${req.address}?${qs}` : `zcash:${req.address}`;
}

/** Parse a ZIP 321 URI. Unknown query params are preserved on `.unknown`. */
export function parseZip321(uri: string): ZIP321Request & { unknown: Record<string, string> } {
  if (!uri.startsWith("zcash:")) {
    throw new SiwzError("INVALID_MESSAGE", "ZIP 321: URI must start with 'zcash:'");
  }
  const body = uri.slice("zcash:".length);
  const qIdx = body.indexOf("?");
  const address = qIdx === -1 ? body : body.slice(0, qIdx);
  const qs = qIdx === -1 ? "" : body.slice(qIdx + 1);
  parseAddress(address);

  const params = new URLSearchParams(qs);
  const out: ZIP321Request & { unknown: Record<string, string> } = {
    address,
    unknown: {},
  };
  for (const [k, v] of params.entries()) {
    switch (k) {
      case "amount":
        out.amount = normaliseAmount(v);
        break;
      case "memo":
        try {
          out.memo = TEXT_DECODER.decode(base64urlDecode(v));
        } catch {
          throw new SiwzError("INVALID_MESSAGE", `ZIP 321: invalid base64url memo`);
        }
        break;
      case "label":
        out.label = v;
        break;
      case "message":
        out.message = v;
        break;
      default:
        out.unknown[k] = v;
    }
  }
  return out;
}

const AMOUNT_RE = /^(?:0|[1-9]\d*)(?:\.\d{1,8})?$/;

function normaliseAmount(raw: string | number): string {
  let s = typeof raw === "number" ? raw.toFixed(8) : String(raw).trim();
  if (s.includes(".")) {
    s = s.replace(/0+$/, "");
    if (s.endsWith(".")) s = s.slice(0, -1);
  }
  if (!AMOUNT_RE.test(s)) {
    throw new SiwzError("INVALID_MESSAGE", `ZIP 321: invalid amount "${raw}" (must be non-negative decimal, ≤ 8 frac digits)`);
  }
  return s;
}

/** 1 ZEC = 10^8 zatoshi. */
export function zecToZatoshi(zec: string): bigint {
  const [whole, frac = ""] = zec.split(".");
  const fracPadded = (frac + "00000000").slice(0, 8);
  return BigInt(whole ?? "0") * 100_000_000n + BigInt(fracPadded);
}

/** Convert zatoshi back to a normalised ZEC decimal string. */
export function zatoshiToZec(zatoshi: bigint | number): string {
  const z = typeof zatoshi === "bigint" ? zatoshi : BigInt(zatoshi);
  const whole = z / 100_000_000n;
  const frac = z % 100_000_000n;
  if (frac === 0n) return whole.toString();
  const fracStr = frac.toString().padStart(8, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}`;
}

/** Throws NETWORK_MISMATCH if the address is not on the given network. */
export function assertAddressNetwork(address: string, network: Network): void {
  const parsed = parseAddress(address);
  if (parsed.network !== network) {
    throw new SiwzError("NETWORK_MISMATCH", `Address is on ${parsed.network} but expected ${network}`);
  }
}
