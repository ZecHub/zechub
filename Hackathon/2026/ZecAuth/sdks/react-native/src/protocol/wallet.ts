/**
 * `ZecAuthWallet` — the wallet-side integration surface.
 *
 * Unlike a delegating SDK, this performs the real RedPallas signing: given a wallet seed
 * it derives auth keys (domain-scoped by default for unlinkable per-dApp identities),
 * signs challenges/transaction requests, and submits responses to the dApp callback.
 *
 * ```ts
 * const wallet = new ZecAuthWallet({ seed, network: "mainnet" });
 * const challenge = wallet.parseChallenge(scannedQrData);
 * const response = await wallet.approveAuth(challenge);     // user tapped Approve
 * await wallet.submit(response, challenge.callbackUrl!);
 * ```
 */
import { bytesToHex } from "@noble/curves/abstract/utils";
import {
  type AuthKeyPair,
  type Network,
  deriveAuthKeyPair,
  signWithKeyPair,
} from "../crypto/keys.js";
import { verify as redpallasVerify } from "../crypto/redpallas.js";
import { parseDeepLink } from "./deeplink.js";
import {
  detectPayload,
  parseChallenge,
  parseTransaction,
} from "./messages.js";
import { randomBytes as defaultRandomBytes } from "./random.js";
import type {
  Disclosures,
  ParsedChallenge,
  ParsedTransaction,
  ResolvedRequest,
  SignedAuthResponse,
  SignedTransactionResponse,
  ZecAuthDeepLink,
} from "./types.js";

export interface ZecAuthWalletOptions {
  /** Wallet seed bytes (typically the 64-byte BIP-39 seed). */
  seed: Uint8Array;
  /** "mainnet" | "testnet". */
  network: Network;
  /** Account index (default 0). */
  account?: number;
  /**
   * Use domain-scoped identities (different pubkey per dApp, no cross-dApp correlation).
   * Default `true` — recommended for privacy. Set `false` for a single global identity.
   */
  domainScoped?: boolean;
  /** Secure RNG override. Defaults to the source installed via `setRandomSource`. */
  randomBytes?: (length: number) => Uint8Array;
}

export class ZecAuthWalletError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ZecAuthWalletError";
    this.status = status;
  }
}

const utf8 = (s: string): Uint8Array => new TextEncoder().encode(s);

export class ZecAuthWallet {
  private readonly seed: Uint8Array;
  readonly network: Network;
  readonly account: number;
  readonly domainScoped: boolean;
  private readonly rand: (length: number) => Uint8Array;
  /** Cache of derived keypairs keyed by domain ("" = global). */
  private readonly keyCache = new Map<string, AuthKeyPair>();

  constructor(options: ZecAuthWalletOptions) {
    if (options.seed.length < 32) {
      throw new ZecAuthWalletError("seed must be at least 32 bytes");
    }
    this.seed = options.seed;
    this.network = options.network;
    this.account = options.account ?? 0;
    this.domainScoped = options.domainScoped ?? true;
    this.rand = options.randomBytes ?? defaultRandomBytes;
  }

  /** CAIP-2 chain id this wallet authenticates on. */
  get chain(): string {
    return `zcash:${this.network}`;
  }

  /** The wallet's global ZecAuth identity (hex public key). */
  identity(): string {
    return this.keyFor(undefined).pubkeyHex;
  }

  /** The domain-scoped identity for a specific dApp. */
  pubkeyForDomain(domain: string): string {
    return this.keyFor(domain).pubkeyHex;
  }

  private keyFor(domain: string | undefined): AuthKeyPair {
    const useDomain = this.domainScoped ? domain : undefined;
    const cacheKey = useDomain ?? "";
    let kp = this.keyCache.get(cacheKey);
    if (!kp) {
      kp = deriveAuthKeyPair(this.seed, this.network, this.account, useDomain);
      this.keyCache.set(cacheKey, kp);
    }
    return kp;
  }

  // ── Parsing ──────────────────────────────────────────────────────────────

  /** Parse a sign-in challenge (validates protocol version + chain). */
  parseChallenge(data: string): ParsedChallenge {
    return parseChallenge(data, this.chain);
  }

  /** Parse a transaction-approval request. */
  parseTransaction(data: string): ParsedTransaction {
    return parseTransaction(data, this.chain);
  }

  /** Parse a `zecauth://` deep link or raw JSON payload. */
  parseLink(input: string): ZecAuthDeepLink | null {
    return parseDeepLink(input);
  }

  /** Classify a scanned/opened payload: "auth" | "transaction" | null. */
  detect(data: string): "auth" | "transaction" | null {
    return detectPayload(data);
  }

  /**
   * Resolve a short link (`zecauth://<host>?req=<url>`): fetch the request URL and return
   * the full payload. The server responds `{ kind, payload, callback_url }`; the payload is
   * re-classified locally so a misbehaving server can't smuggle one kind as another.
   */
  async fetchRequest(requestUrl: string): Promise<ResolvedRequest> {
    let res: Response;
    try {
      res = await fetch(requestUrl, { headers: { Accept: "application/json" } });
    } catch (e) {
      throw new ZecAuthWalletError(
        `Could not reach the request URL: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new ZecAuthWalletError(
        res.status === 410
          ? "This request has expired — generate a new QR code."
          : `Request fetch failed (${res.status}): ${body}`,
        res.status,
      );
    }
    const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    const payload = typeof data?.payload === "string" ? data.payload : undefined;
    if (!payload) {
      throw new ZecAuthWalletError("Request URL returned no payload");
    }
    // Trust the payload, not the server's `kind` label.
    const kind = detectPayload(payload);
    if (!kind) {
      throw new ZecAuthWalletError("Request URL returned an unrecognized payload");
    }
    const callbackUrl =
      typeof data?.callback_url === "string" ? data.callback_url : undefined;
    return { kind, payload, callbackUrl };
  }

  // ── Signing ──────────────────────────────────────────────────────────────

  /**
   * Sign a sign-in challenge (the user approved).
   *
   * `options.granted` is the set of capability ids the user ticked (defaults to every
   * requested capability). `signin` is always granted. The response reports `granted`/`denied`
   * so the dApp can decide whether to proceed. Pass `options.disclosures` to share capability
   * data; the SDK keeps only disclosures whose capability was both *requested* and *granted* —
   * so a rejected capability never leaks data.
   */
  async approveAuth(
    challenge: ParsedChallenge,
    options?: { granted?: string[]; disclosures?: Disclosures },
  ): Promise<SignedAuthResponse> {
    const requestedIds = challenge.capabilities.map((c) => c.id);
    // signin is implicit; default to granting everything requested when no choice is given.
    const grantedSet = new Set<string>(["signin", ...(options?.granted ?? requestedIds)]);
    const granted = requestedIds.filter((id) => grantedSet.has(id));
    const denied = requestedIds.filter((id) => !grantedSet.has(id));

    const kp = this.keyFor(challenge.domain);
    const signature = signWithKeyPair(kp, utf8(challenge.signingMessage), this.rand(80));
    const response: SignedAuthResponse = {
      pubkey: kp.pubkeyHex,
      signature: bytesToHex(signature),
      message: challenge.signingMessage,
      account: this.account,
      granted,
      denied,
    };
    const disclosures = filterDisclosures(challenge, options?.disclosures, grantedSet);
    if (disclosures) response.disclosures = disclosures;
    return response;
  }

  /** Sign a transaction approval (the user approved the payment). */
  async approveTransaction(
    tx: ParsedTransaction,
    txid?: string,
  ): Promise<SignedTransactionResponse> {
    return this.signTransaction(tx, "approved", txid);
  }

  /** Sign a transaction denial (the user rejected the payment). */
  async denyTransaction(tx: ParsedTransaction): Promise<SignedTransactionResponse> {
    return this.signTransaction(tx, "denied");
  }

  private signTransaction(
    tx: ParsedTransaction,
    status: "approved" | "denied",
    txid?: string,
  ): SignedTransactionResponse {
    const kp = this.keyFor(tx.domain);
    const signature = signWithKeyPair(kp, utf8(tx.signingMessage), this.rand(80));
    const response: SignedTransactionResponse = {
      pubkey: kp.pubkeyHex,
      status,
      signature: bytesToHex(signature),
      message: tx.signingMessage,
    };
    if (txid) response.txid = txid;
    return response;
  }

  /** Verify a signature locally (e.g. to self-check before submitting). */
  verify(pubkeyHex: string, message: string, signatureHex: string): boolean {
    try {
      return redpallasVerify(hexToBytes(pubkeyHex), utf8(message), hexToBytes(signatureHex));
    } catch {
      return false;
    }
  }

  // ── Submission ─────────────────────────────────────────────────────────────

  /** POST a signed response to the dApp's callback URL. */
  async submit(
    response: SignedAuthResponse | SignedTransactionResponse,
    callbackUrl: string,
  ): Promise<unknown> {
    const res = await fetch(callbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new ZecAuthWalletError(
        `Submission failed (${res.status}): ${body}`,
        res.status,
      );
    }
    return res.json().catch(() => ({}));
  }
}

/**
 * Keep only the disclosures whose capability was both requested by the dApp AND granted by
 * the user. Privacy guard: a wallet can't over-share, and a rejected capability leaks nothing.
 */
function filterDisclosures(
  challenge: ParsedChallenge,
  disclosures: Disclosures | undefined,
  grantedSet: Set<string>,
): Disclosures | undefined {
  if (!disclosures) return undefined;
  // Allowed = requested ∩ granted.
  const allowed = new Set(
    challenge.capabilities.map((c) => c.id).filter((id) => grantedSet.has(id)),
  );
  const out: Disclosures = {};
  if (disclosures.address && allowed.has("view-address")) out.address = disclosures.address;
  if (disclosures.balance && allowed.has("view-balance")) out.balance = disclosures.balance;
  if (disclosures.incomingPayments && allowed.has("view-incoming")) {
    out.incomingPayments = disclosures.incomingPayments;
  }
  if (disclosures.transactions && allowed.has("view-history")) {
    out.transactions = disclosures.transactions;
  }
  if (disclosures.viewingKey && allowed.has("view-full")) out.viewingKey = disclosures.viewingKey;
  return Object.keys(out).length > 0 ? out : undefined;
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (clean.length % 2 !== 0) throw new Error("invalid hex length");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}
