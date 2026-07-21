/** Configuration for the wallet-side SDK. */
export interface ZecAuthWalletConfig {
  /** Network — "mainnet" or "testnet". */
  network: "mainnet" | "testnet";

  /**
   * Signing function — the wallet provides this.
   * Takes a message (UTF-8 bytes) and returns a 64-byte RedPallas signature.
   *
   * This is the bridge between the SDK and your wallet's key management.
   * The SDK never touches spending keys — only this auth-specific signer.
   */
  sign: (message: Uint8Array) => Promise<Uint8Array>;

  /**
   * The wallet's ZecAuth public key (hex, 64 chars / 32 bytes).
   * Derived from the wallet seed at ZIP-32 path m/616'/coin_type'/account'.
   */
  pubkey: string;

  /**
   * Optional: per-domain signing function for privacy-preserving key isolation.
   *
   * When provided, ZecAuth derives a different keypair for each domain so that
   * myapp.com and shop.com see different pubkeys — no cross-dApp correlation.
   *
   * The wallet implements this by including the domain in its ZIP-32 derivation
   * context: `"ZcashZecauthAuth:<domain>"` instead of `"ZcashZecauthAuth"`.
   *
   * Returns both the domain-scoped pubkey and the signature so the correct
   * pubkey is included in the response.
   */
  signForDomain?: (domain: string, message: Uint8Array) => Promise<{ pubkey: string; signature: Uint8Array }>;
}

/** A parsed auth challenge from a dApp. */
export interface ParsedChallenge {
  /** Raw JSON string (what was in the QR code). */
  raw: string;

  /** The requesting dApp's domain. */
  domain: string;

  /** URI being accessed. */
  uri: string;

  /** Chain (e.g., "zcash:mainnet"). */
  chain: string;

  /** Nonce. */
  nonce: string;

  /** Expiration time (ISO 8601). */
  expirationTime: string;

  /** Optional statement to show the user. */
  statement?: string;

  /** The canonical message that will be signed. */
  signingMessage: string;

  /** The callback URL to POST the response to (if provided in the URI). */
  callbackUrl?: string;
}

/** A parsed transaction request from a dApp. */
export interface ParsedTransaction {
  /** Raw JSON string. */
  raw: string;

  /** The requesting dApp's domain. */
  domain: string;

  /** Recipient Zcash address. */
  recipient: string;

  /** Amount in ZEC. */
  amount: string;

  /** Optional memo. */
  memo?: string;

  /** Description of the payment. */
  description?: string;

  /** Chain (e.g., "zcash:mainnet"). */
  chain: string;

  /** Request ID. */
  requestId: string;

  /** Expiration time (ISO 8601). */
  expirationTime: string;

  /** The canonical message that will be signed. */
  signingMessage: string;
}

/** A signed response ready to submit to the dApp. */
export interface SignedResponse {
  pubkey: string;
  signature: string;
  message: string;
  [key: string]: unknown;
}
