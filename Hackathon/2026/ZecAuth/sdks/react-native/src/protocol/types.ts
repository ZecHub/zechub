/** Protocol-level types for the ZecAuth React Native SDK. */
import type { Network } from "../crypto/keys.js";
import type { ParsedCapability } from "./capabilities.js";

export type { Network };
export type { ParsedCapability, CapabilityId } from "./capabilities.js";

/** A permission scope a dApp may request (mirrors `zecauth-core::Scope`). */
export interface Scope {
  type:
    | "auth"
    | "request_payment"
    | "view_balance"
    | "view_history"
    | "view_incoming"
    | "view_full"
    | "view_address"
    | "custom";
  params?: { max_amount?: string; name?: string; description?: string };
}

/** Scopes requested by a dApp inside a challenge. */
export interface RequestedScopes {
  required?: Scope[];
  optional?: Scope[];
}

/** A parsed ZecAuth sign-in challenge, ready to display and sign. */
export interface ParsedChallenge {
  /** The raw payload the wallet received (JSON string). */
  raw: string;
  /** Requesting dApp domain (the wallet should sanity-check this). */
  domain: string;
  /** Resource URI being accessed. */
  uri: string;
  /** Protocol version (always 1). */
  version: number;
  /** CAIP-2 chain id, e.g. "zcash:mainnet". */
  chain: string;
  /** Single-use server nonce. */
  nonce: string;
  /** ISO-8601 issue time. */
  issuedAt: string;
  /** ISO-8601 expiry. */
  expirationTime: string;
  /** Optional human-readable statement. */
  statement?: string;
  /** Optional resource URIs granted by the session. */
  resources?: string[];
  /** Optional requested scopes (raw protocol form). */
  scopes?: RequestedScopes;
  /**
   * The capabilities the dApp is requesting, ready to display. Derived from `scopes`; always
   * includes `signin` (authentication is implicit in every connection).
   */
  capabilities: ParsedCapability[];
  /** Callback URL to POST the signed response to, if the dApp provided one. */
  callbackUrl?: string;
  /** Canonical UTF-8 text that gets signed (exactly what the user sees). */
  signingMessage: string;
  /** True once `expirationTime` is in the past. */
  expired: boolean;
}

/** A parsed transaction-approval request. */
export interface ParsedTransaction {
  raw: string;
  domain: string;
  recipient: string;
  /** Amount in ZEC (decimal string). */
  amount: string;
  memo?: string;
  description?: string;
  chain: string;
  requestId: string;
  issuedAt: string;
  expirationTime: string;
  callbackUrl?: string;
  signingMessage: string;
  expired: boolean;
}

/**
 * Capability disclosures the wallet shares with the dApp (only for capabilities the challenge
 * requested). These ride alongside the signed response; they are not part of the signed
 * message. Zcash-native: a Unified Address is privacy-preserving and safe to share.
 */
/** A point-in-time balance snapshot (ZEC decimal strings). */
export interface DisclosedBalance {
  /** Total balance across pools. */
  totalZec: string;
  /** Spendable now (confirmed). */
  spendableZec: string;
}

/** A disclosed transaction (point-in-time snapshot row). */
export interface DisclosedTx {
  txid: string;
  /** Amount in ZEC (decimal string, always positive — see `direction`). */
  amountZec: string;
  /** "in" = received, "out" = sent. */
  direction: "in" | "out";
  /** Block height it was mined at, if confirmed. */
  minedHeight?: number;
  /** Unix seconds, if known. */
  timestamp?: number;
  memo?: string;
}

/**
 * Data the wallet shares with the dApp — each field gated by a specific capability, so the
 * dApp gets exactly the exposure it asked for and nothing more. Disclosures ride alongside
 * the signed response (relayed to the dApp); they are not part of the signed message.
 */
export interface Disclosures {
  /** `view-address` — a receiving Unified Address (ZIP-316). Reveals nothing else. */
  address?: string;
  /** `view-balance` — a one-time balance snapshot. */
  balance?: DisclosedBalance;
  /** `view-incoming` — a one-time snapshot of received payments (for payment verification). */
  incomingPayments?: DisclosedTx[];
  /** `view-history` — a one-time snapshot of full transaction history (sent + received). */
  transactions?: DisclosedTx[];
  /**
   * `view-full` — a read-only Unified Full Viewing Key (`uview…`): an ongoing watch of balance
   * and full history, no spend authority. The most powerful view grant.
   */
  viewingKey?: string;
}

/** A signed sign-in response, ready to submit to the dApp. */
export interface SignedAuthResponse {
  /** Hex auth public key used to sign (domain-scoped by default). */
  pubkey: string;
  /** Hex RedPallas signature (128 hex chars). */
  signature: string;
  /** The canonical message that was signed. */
  message: string;
  /** Account index used. */
  account: number;
  /** Capability ids the user approved (always includes `signin`). */
  granted: string[];
  /** Capability ids the dApp requested but the user rejected. */
  denied: string[];
  /** Capability disclosures attached for this dApp (only for granted capabilities). */
  disclosures?: Disclosures;
}

/** A signed transaction approval/denial. */
export interface SignedTransactionResponse {
  pubkey: string;
  status: "approved" | "denied";
  signature: string;
  message: string;
  txid?: string;
}

/** The kind of payload a scanned/opened string represents. */
export type PayloadKind = "auth" | "transaction" | null;

/** A parsed `zecauth://` deep link. */
export interface ZecAuthDeepLink {
  kind: PayloadKind;
  /** The challenge or transaction JSON payload. */
  payload: string;
  /** Callback URL, if present in the link or payload. */
  callbackUrl?: string;
  /** Host portion of the deep link. */
  host?: string;
  /**
   * Short-link form (`?req=<url>`): the payload is NOT in the link — fetch it from this
   * URL (e.g. via `ZecAuthWallet.fetchRequest`). `kind` is null and `payload` empty until
   * the request is resolved.
   */
  requestUrl?: string;
}

/** A short-link request resolved by fetching its `requestUrl`. */
export interface ResolvedRequest {
  kind: Exclude<PayloadKind, null>;
  /** The challenge or transaction JSON payload. */
  payload: string;
  /** Callback URL the wallet should POST the signed response to. */
  callbackUrl?: string;
}
