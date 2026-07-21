import type { Capability, CapabilityInfo, RequestedScopes, Disclosures } from "./capabilities.js";

/** ZecAuth dApp SDK configuration. */
export interface ZecAuthConfig {
  /** Your dApp's domain (e.g., "myapp.com"). Used for domain binding in challenges. */
  domain: string;

  /** Base URL of your ZecAuth server endpoints (e.g., "/auth" or "https://api.myapp.com/auth"). */
  server: string;

  /** Network — "mainnet" or "testnet". Default: "mainnet". */
  network?: "mainnet" | "testnet";

  /** Challenge TTL in seconds. Default: 300 (5 minutes). */
  challengeTtl?: number;

  /**
   * The capabilities your app requests from the wallet. The wallet shows these to the user
   * on the connect screen so they know what your app intends to do before they sign in.
   *
   *   - `"signin"`           — prove wallet ownership (always included).
   *   - `"sign-transaction"` — request the user approve & sign transactions.
   *
   * Default: `["signin"]`. Declare `"sign-transaction"` to be allowed to call
   * `requestTransaction()`.
   */
  capabilities?: Capability[];

  /**
   * Optional cap (in ZEC) the wallet should enforce on each payment request. Only meaningful
   * when `"sign-transaction"` is among the declared capabilities.
   */
  maxAmount?: string;
}

/** The authenticated session after a successful connect. */
export interface ZecAuthSession {
  /** The user's ZecAuth public key (hex) — their identity. */
  pubkey: string;

  /** JWT session token. */
  token: string;

  /** The domain this session is bound to. */
  domain: string;

  /** The chain (e.g., "zcash:mainnet"). */
  chain: string;

  /** The capabilities the server granted this session (authoritative — the user's approved set). */
  capabilities: Capability[];

  /** The capabilities the dApp requested but the user rejected in their wallet. */
  denied: Capability[];

  /** Any capability disclosures the wallet attached when connecting (e.g. a shared address). */
  disclosures?: Disclosures;
}

/** Parameters for requesting a transaction. */
export interface TransactionParams {
  /** Recipient Zcash address (unified, sapling, or transparent). */
  recipient: string;

  /** Amount in ZEC (string to preserve precision). */
  amount: string;

  /** Optional memo to include in the transaction. */
  memo?: string;

  /** Human-readable description of the payment. */
  description?: string;
}

/** Result of a transaction request. */
export interface TransactionResult {
  /** "approved" or "denied". */
  status: "approved" | "denied";

  /** Request ID that was consumed. */
  requestId: string;

  /** Recipient address. */
  recipient: string;

  /** Amount in ZEC. */
  amount: string;

  /** Transaction ID (if the wallet broadcast the transaction). */
  txid?: string;

  /** The wallet's public key that signed the approval. */
  pubkey: string;
}

/** Challenge ready to present to the user (as a QR code or `zecauth://` deep link). */
export interface ChallengeData {
  challenge: Record<string, unknown>;
  /**
   * The challenge JSON to encode in the QR / deep link. The SDK has already embedded the
   * declared capabilities (as protocol `scopes`) into this payload.
   */
  challenge_json: string;
  uri: string;
  /** The capabilities embedded in this challenge — render them in your own UI if you like. */
  capabilities: CapabilityInfo[];
  /** The protocol scopes embedded in the challenge. */
  scopes: RequestedScopes;
  /** Callback URL the wallet POSTs the signed response to (if the server provided one). */
  callback_url?: string;
  /** WebSocket URL to await the wallet's response (if the server provided one). */
  ws_url?: string;
  /**
   * Short-link fetch URL (if the server provided one). Prefer encoding
   * `zecauth://<host>?req=<encoded request_url>` in the QR — the wallet fetches the full
   * challenge from this URL, keeping the QR small and reliably scannable.
   */
  request_url?: string;
}

/** Auth verification response (internal). */
export interface AuthVerifyResponse {
  authenticated: boolean;
  token: string;
  pubkey: string;
  domain: string;
  chain: string;
  capabilities?: Capability[];
}

/** A transaction request, ready to push to / display for the connected wallet. */
export interface TxRequestData {
  request: Record<string, unknown> & {
    request_id: string;
    recipient: string;
    amount: string;
    description?: string;
    expiration_time: string;
  };
  request_json: string;
  /** Callback URL the wallet POSTs its approval to (if the server provided one). */
  callback_url?: string;
  /** WebSocket URL to await the wallet's approval (if the server provided one). */
  ws_url?: string;
}

/** Transaction approval response (internal). */
export interface TxApprovalResponse {
  verified: boolean;
  status: string;
  request_id: string;
  recipient: string;
  amount: string;
  txid?: string;
  pubkey: string;
}
