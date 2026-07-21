/**
 * Canonical message construction + payload parsing.
 *
 * The strings produced here are the exact bytes the wallet signs and sends back as the
 * response `message`. They round-trip through `zecauth-core`'s `FromStr` parsers, so the
 * dApp server re-parses and verifies the signature over these exact bytes. Field order
 * and labels match `ChallengeMessage`/`TransactionRequest`'s `Display` impls.
 */
import type {
  ParsedChallenge,
  ParsedTransaction,
  RequestedScopes,
} from "./types.js";
import { describeCapabilities } from "./capabilities.js";

export class ZecAuthParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZecAuthParseError";
  }
}

function parseJson(data: string, what: string): Record<string, unknown> {
  let json: unknown;
  try {
    json = JSON.parse(data);
  } catch {
    throw new ZecAuthParseError(`Invalid ${what}: not valid JSON`);
  }
  if (typeof json !== "object" || json === null) {
    throw new ZecAuthParseError(`Invalid ${what}: expected an object`);
  }
  return json as Record<string, unknown>;
}

function str(obj: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string") return v;
    if (typeof v === "number") return String(v);
  }
  return undefined;
}

function require(
  value: string | undefined,
  field: string,
  what: string,
): string {
  if (value === undefined || value === "") {
    throw new ZecAuthParseError(`Invalid ${what}: missing "${field}"`);
  }
  return value;
}

function isExpired(iso: string): boolean {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? Date.now() > t : false;
}

/** Build the canonical sign-in message text (matches `ChallengeMessage::Display`). */
export function buildChallengeMessage(c: {
  domain: string;
  uri: string;
  version: number | string;
  chain: string;
  nonce: string;
  issuedAt: string;
  expirationTime: string;
  statement?: string;
  resources?: string[];
}): string {
  let m = `${c.domain} wants you to sign in with your Zcash wallet.\n\n`;
  m += `URI: ${c.uri}\n`;
  m += `Version: ${c.version}\n`;
  m += `Chain: ${c.chain}\n`;
  m += `Nonce: ${c.nonce}\n`;
  m += `Issued At: ${c.issuedAt}\n`;
  m += `Expiration Time: ${c.expirationTime}`;
  if (c.statement) m += `\nStatement: ${c.statement}`;
  if (c.resources && c.resources.length > 0) {
    m += `\nResources:`;
    for (const r of c.resources) m += `\n- ${r}`;
  }
  return m;
}

/** Build the canonical transaction message text (matches `TransactionRequest::Display`). */
export function buildTransactionMessage(t: {
  domain: string;
  recipient: string;
  amount: string;
  chain: string;
  requestId: string;
  issuedAt: string;
  expirationTime: string;
  memo?: string;
  description?: string;
}): string {
  let m = `${t.domain} requests a transaction from your Zcash wallet.\n\n`;
  m += `Recipient: ${t.recipient}\n`;
  m += `Amount: ${t.amount} ZEC\n`;
  m += `Chain: ${t.chain}\n`;
  m += `Request ID: ${t.requestId}\n`;
  m += `Issued At: ${t.issuedAt}\n`;
  m += `Expiration Time: ${t.expirationTime}`;
  if (t.memo) m += `\nMemo: ${t.memo}`;
  if (t.description) m += `\nDescription: ${t.description}`;
  return m;
}

/** Parse a sign-in challenge from QR/deep-link JSON. */
export function parseChallenge(data: string, expectedChain?: string): ParsedChallenge {
  const json = parseJson(data, "challenge");

  const domain = require(str(json, "domain"), "domain", "challenge");
  const uri = require(str(json, "uri"), "uri", "challenge");
  const versionStr = require(str(json, "version"), "version", "challenge");
  const version = Number(versionStr);
  const chain = require(str(json, "chain"), "chain", "challenge");
  const nonce = require(str(json, "nonce"), "nonce", "challenge");
  const issuedAt = require(str(json, "issued_at", "issuedAt"), "issued_at", "challenge");
  const expirationTime = require(
    str(json, "expiration_time", "expirationTime"),
    "expiration_time",
    "challenge",
  );
  const statement = str(json, "statement");
  const callbackUrl = str(json, "callback_url", "callbackUrl");
  const resources = Array.isArray(json.resources)
    ? (json.resources as unknown[]).filter((r): r is string => typeof r === "string")
    : undefined;
  const scopes = (json.scopes as RequestedScopes | undefined) ?? undefined;

  if (version !== 1) {
    throw new ZecAuthParseError(`Unsupported protocol version: ${versionStr}`);
  }
  if (expectedChain && chain !== expectedChain) {
    throw new ZecAuthParseError(
      `Chain mismatch: expected ${expectedChain}, got ${chain}`,
    );
  }

  const signingMessage = buildChallengeMessage({
    domain,
    uri,
    version,
    chain,
    nonce,
    issuedAt,
    expirationTime,
    statement,
    resources,
  });

  return {
    raw: data,
    domain,
    uri,
    version,
    chain,
    nonce,
    issuedAt,
    expirationTime,
    statement,
    resources,
    scopes,
    capabilities: describeCapabilities(scopes),
    callbackUrl,
    signingMessage,
    expired: isExpired(expirationTime),
  };
}

/** Parse a transaction-approval request from QR/deep-link JSON. */
export function parseTransaction(data: string, expectedChain?: string): ParsedTransaction {
  const json = parseJson(data, "transaction request");

  const domain = require(str(json, "domain"), "domain", "transaction request");
  const recipient = require(str(json, "recipient"), "recipient", "transaction request");
  const amount = require(str(json, "amount"), "amount", "transaction request");
  const chain = require(str(json, "chain"), "chain", "transaction request");
  const requestId = require(
    str(json, "request_id", "requestId"),
    "request_id",
    "transaction request",
  );
  const issuedAt = require(
    str(json, "issued_at", "issuedAt"),
    "issued_at",
    "transaction request",
  );
  const expirationTime = require(
    str(json, "expiration_time", "expirationTime"),
    "expiration_time",
    "transaction request",
  );
  const memo = str(json, "memo");
  const description = str(json, "description");
  const callbackUrl = str(json, "callback_url", "callbackUrl");

  if (expectedChain && chain !== expectedChain) {
    throw new ZecAuthParseError(
      `Chain mismatch: expected ${expectedChain}, got ${chain}`,
    );
  }

  const signingMessage = buildTransactionMessage({
    domain,
    recipient,
    amount,
    chain,
    requestId,
    issuedAt,
    expirationTime,
    memo,
    description,
  });

  return {
    raw: data,
    domain,
    recipient,
    amount,
    memo,
    description,
    chain,
    requestId,
    issuedAt,
    expirationTime,
    callbackUrl,
    signingMessage,
    expired: isExpired(expirationTime),
  };
}

/** Heuristically classify a scanned/opened payload. */
export function detectPayload(data: string): "auth" | "transaction" | null {
  try {
    const json = JSON.parse(data) as Record<string, unknown>;
    if ("nonce" in json && "version" in json) return "auth";
    if (("request_id" in json || "requestId" in json) && "recipient" in json) {
      return "transaction";
    }
    return null;
  } catch {
    return null;
  }
}
