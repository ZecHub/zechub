import type {
  ZecAuthWalletConfig,
  ParsedChallenge,
  ParsedTransaction,
  SignedResponse,
} from "./types.js";

/**
 * ZecAuth Wallet SDK.
 *
 * Add ZecAuth support to your wallet in ~10 lines:
 *
 * ```typescript
 * const wallet = new ZecAuthWallet({
 *   network: "mainnet",
 *   pubkey: authPubkeyHex,
 *   sign: (msg) => myKeyManager.signWithAuthKey(msg),
 * });
 *
 * // When user scans a ZecAuth QR code:
 * const challenge = wallet.parseChallenge(qrData);
 * // Show: "myapp.com wants you to sign in with your Zcash wallet."
 * // User taps Approve:
 * const response = await wallet.approveAuth(challenge);
 * await wallet.submit(response, callbackUrl);
 * ```
 */
export class ZecAuthWallet {
  private config: ZecAuthWalletConfig;

  constructor(config: ZecAuthWalletConfig) {
    this.config = config;
  }

  /** Get the wallet's ZecAuth public key (identity). */
  getPublicKey(): string {
    return this.config.pubkey;
  }

  // ─── Auth challenges ───

  /**
   * Parse a ZecAuth challenge from QR code data or a JSON string.
   * Returns a structured object the wallet UI can display.
   */
  parseChallenge(data: string): ParsedChallenge {
    let json: any;
    try {
      json = JSON.parse(data);
    } catch {
      throw new ZecAuthWalletError("Invalid challenge: not valid JSON");
    }

    const required = ["domain", "uri", "version", "chain", "nonce", "issued_at", "expiration_time"];
    for (const field of required) {
      if (!(field in json)) {
        throw new ZecAuthWalletError(`Invalid challenge: missing "${field}"`);
      }
    }

    if (json.version !== 1) {
      throw new ZecAuthWalletError(`Unsupported protocol version: ${json.version}`);
    }

    const expectedChain = `zcash:${this.config.network}`;
    if (json.chain !== expectedChain) {
      throw new ZecAuthWalletError(`Chain mismatch: expected ${expectedChain}, got ${json.chain}`);
    }

    // Build the canonical signing message (same format as PROTOCOL.md §3.1)
    let signingMessage = `${json.domain} wants you to sign in with your Zcash wallet.\n\n`;
    signingMessage += `URI: ${json.uri}\n`;
    signingMessage += `Version: ${json.version}\n`;
    signingMessage += `Chain: ${json.chain}\n`;
    signingMessage += `Nonce: ${json.nonce}\n`;
    signingMessage += `Issued At: ${json.issued_at}\n`;
    signingMessage += `Expiration Time: ${json.expiration_time}`;
    if (json.statement) {
      signingMessage += `\nStatement: ${json.statement}`;
    }

    return {
      raw: data,
      domain: json.domain,
      uri: json.uri,
      chain: json.chain,
      nonce: json.nonce,
      expirationTime: json.expiration_time,
      statement: json.statement,
      signingMessage,
    };
  }

  /**
   * Sign an auth challenge (user approved).
   *
   * If the wallet supports per-domain key derivation (config.signForDomain),
   * a domain-scoped keypair is used — different pubkey per dApp, no cross-dApp
   * correlation possible. Falls back to the global key if not provided.
   */
  async approveAuth(challenge: ParsedChallenge): Promise<SignedResponse> {
    const msgBytes = new TextEncoder().encode(challenge.signingMessage);

    if (this.config.signForDomain) {
      const result = await this.config.signForDomain(challenge.domain, msgBytes);
      return { pubkey: result.pubkey, signature: bytesToHex(result.signature), message: challenge.signingMessage };
    }

    const sigBytes = await this.config.sign(msgBytes);
    return {
      pubkey: this.config.pubkey,
      signature: bytesToHex(sigBytes),
      message: challenge.signingMessage,
    };
  }

  // ─── Transaction requests ───

  /**
   * Parse a transaction request from QR code data or a JSON string.
   * Returns a structured object the wallet UI can display.
   */
  parseTransaction(data: string): ParsedTransaction {
    let json: any;
    try {
      json = JSON.parse(data);
    } catch {
      throw new ZecAuthWalletError("Invalid transaction request: not valid JSON");
    }

    const required = ["domain", "request_id", "recipient", "amount", "chain", "issued_at", "expiration_time"];
    for (const field of required) {
      if (!(field in json)) {
        throw new ZecAuthWalletError(`Invalid transaction request: missing "${field}"`);
      }
    }

    const expectedChain = `zcash:${this.config.network}`;
    if (json.chain !== expectedChain) {
      throw new ZecAuthWalletError(`Chain mismatch: expected ${expectedChain}, got ${json.chain}`);
    }

    // Build the canonical signing message
    let signingMessage = `${json.domain} requests a transaction from your Zcash wallet.\n\n`;
    signingMessage += `Recipient: ${json.recipient}\n`;
    signingMessage += `Amount: ${json.amount} ZEC\n`;
    signingMessage += `Chain: ${json.chain}\n`;
    signingMessage += `Request ID: ${json.request_id}\n`;
    signingMessage += `Issued At: ${json.issued_at}\n`;
    signingMessage += `Expiration Time: ${json.expiration_time}`;
    if (json.memo) {
      signingMessage += `\nMemo: ${json.memo}`;
    }
    if (json.description) {
      signingMessage += `\nDescription: ${json.description}`;
    }

    return {
      raw: data,
      domain: json.domain,
      recipient: json.recipient,
      amount: json.amount,
      memo: json.memo,
      description: json.description,
      chain: json.chain,
      requestId: json.request_id,
      expirationTime: json.expiration_time,
      signingMessage,
    };
  }

  /**
   * Sign a transaction approval (user approved the payment).
   */
  async approveTransaction(tx: ParsedTransaction): Promise<SignedResponse> {
    const msgBytes = new TextEncoder().encode(tx.signingMessage);
    const sigBytes = await this.config.sign(msgBytes);

    return {
      pubkey: this.config.pubkey,
      status: "approved",
      signature: bytesToHex(sigBytes),
      message: tx.signingMessage,
    };
  }

  /**
   * Sign a transaction denial (user rejected the payment).
   */
  async denyTransaction(tx: ParsedTransaction): Promise<SignedResponse> {
    const msgBytes = new TextEncoder().encode(tx.signingMessage);
    const sigBytes = await this.config.sign(msgBytes);

    return {
      pubkey: this.config.pubkey,
      status: "denied",
      signature: bytesToHex(sigBytes),
      message: tx.signingMessage,
    };
  }

  // ─── Submission ───

  /**
   * Submit a signed response to the dApp's callback URL.
   */
  async submit(response: SignedResponse, callbackUrl: string): Promise<unknown> {
    const res = await fetch(callbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new ZecAuthWalletError(`Submission failed (${res.status}): ${body}`);
    }

    return res.json();
  }

  // ─── Utilities ───

  /**
   * Detect whether a QR code / scanned string is a ZecAuth payload.
   * Returns "auth", "transaction", or null.
   */
  detect(data: string): "auth" | "transaction" | null {
    try {
      const json = JSON.parse(data);
      if (json.nonce && json.version) return "auth";
      if (json.request_id && json.recipient) return "transaction";
      return null;
    } catch {
      return null;
    }
  }
}

export class ZecAuthWalletError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZecAuthWalletError";
  }
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
