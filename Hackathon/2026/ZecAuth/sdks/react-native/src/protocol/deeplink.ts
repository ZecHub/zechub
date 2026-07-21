/**
 * `zecauth://` deep-link + QR payload handling.
 *
 * Deep link shapes (PROTOCOL.md §4.2):
 *   zecauth://<host>?challenge=<percent-encoded-json>&callback=<callback-url>
 *   zecauth://<host>?req=<percent-encoded-fetch-url>           (short link)
 *
 * Transaction requests use `request=` (aliases: `tx`, `transaction`). The challenge /
 * request JSON may itself carry a `callback_url`, which takes precedence over the
 * `callback` query parameter. Raw JSON (e.g. scanned straight from a QR code without the
 * scheme wrapper) is also accepted.
 *
 * The short-link form keeps QR codes small: the link carries only a fetch URL, and the
 * wallet GETs it to retrieve `{ kind, payload, callback_url }` (see
 * `ZecAuthWallet.fetchRequest`).
 */
import { detectPayload } from "./messages.js";
import type { PayloadKind, ZecAuthDeepLink } from "./types.js";

export const ZECAUTH_SCHEME = "zecauth://";

function parseQuery(query: string): Map<string, string> {
  const params = new Map<string, string>();
  if (!query) return params;
  for (const pair of query.split("&")) {
    if (!pair) continue;
    const eq = pair.indexOf("=");
    const rawKey = eq === -1 ? pair : pair.slice(0, eq);
    const rawVal = eq === -1 ? "" : pair.slice(eq + 1);
    try {
      params.set(decodeURIComponent(rawKey), decodeURIComponent(rawVal));
    } catch {
      params.set(rawKey, rawVal);
    }
  }
  return params;
}

function callbackFromPayload(payload: string): string | undefined {
  try {
    const json = JSON.parse(payload) as Record<string, unknown>;
    const cb = json.callback_url ?? (json as Record<string, unknown>).callbackUrl;
    return typeof cb === "string" ? cb : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Parse a `zecauth://` deep link, or a raw JSON payload, into a structured link.
 * Returns `null` if the input is neither a recognizable deep link nor JSON payload.
 */
export function parseDeepLink(input: string): ZecAuthDeepLink | null {
  const trimmed = input.trim();

  // Raw JSON payload (no scheme) — common when scanning a QR code directly.
  if (trimmed.startsWith("{")) {
    const kind = detectPayload(trimmed);
    if (!kind) return null;
    return { kind, payload: trimmed, callbackUrl: callbackFromPayload(trimmed) };
  }

  if (!trimmed.toLowerCase().startsWith(ZECAUTH_SCHEME)) return null;

  const rest = trimmed.slice(ZECAUTH_SCHEME.length);
  const qIndex = rest.indexOf("?");
  const host = qIndex === -1 ? rest : rest.slice(0, qIndex);
  const query = qIndex === -1 ? "" : rest.slice(qIndex + 1);
  const params = parseQuery(query);

  const challenge = params.get("challenge");
  const request =
    params.get("request") ?? params.get("tx") ?? params.get("transaction");
  const callbackParam = params.get("callback");

  // Short link: the payload lives behind a fetch URL, not in the link itself.
  const requestUrl = params.get("req");
  if (requestUrl !== undefined && challenge === undefined && request === undefined) {
    return { kind: null, payload: "", requestUrl, host: host || undefined };
  }

  let kind: PayloadKind = null;
  let payload: string | undefined;
  if (challenge !== undefined) {
    kind = "auth";
    payload = challenge;
  } else if (request !== undefined) {
    kind = "transaction";
    payload = request;
  }

  if (kind === null || payload === undefined) {
    return { kind: null, payload: "", host: host || undefined };
  }

  // Confirm/refine the kind from the payload itself when possible.
  const detected = detectPayload(payload);
  if (detected) kind = detected;

  return {
    kind,
    payload,
    callbackUrl: callbackFromPayload(payload) ?? callbackParam,
    host: host || undefined,
  };
}

/**
 * Build a `zecauth://` deep link for a challenge/request JSON payload — useful for tests,
 * dApp tooling, or wallet-to-wallet hand-off.
 */
export function buildDeepLink(
  host: string,
  payloadJson: string,
  kind: "auth" | "transaction" = "auth",
  callbackUrl?: string,
): string {
  const key = kind === "auth" ? "challenge" : "request";
  let link = `${ZECAUTH_SCHEME}${host}?${key}=${encodeURIComponent(payloadJson)}`;
  if (callbackUrl) link += `&callback=${encodeURIComponent(callbackUrl)}`;
  return link;
}
