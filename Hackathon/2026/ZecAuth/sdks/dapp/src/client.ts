import type {
  ZecAuthConfig,
  ZecAuthSession,
  TransactionParams,
  TransactionResult,
  ChallengeData,
  AuthVerifyResponse,
  TxRequestData,
  TxApprovalResponse,
} from "./types.js";
import {
  type Capability,
  type CapabilityInfo,
  type RequestedScopes,
  type Disclosures,
  capabilitiesToScopes,
  describeCapabilities,
} from "./capabilities.js";

const TOKEN_KEY = "zecauth_token";

/**
 * ZecAuth dApp SDK.
 *
 * Add "Sign in with Zcash" to your app in 3 lines:
 *
 * ```typescript
 * const zecauth = new ZecAuth({
 *   domain: "myapp.com",
 *   server: "/auth",
 *   capabilities: ["signin", "sign-transaction"], // what your app wants to do
 * });
 * const session = await zecauth.connect();
 * console.log(session.pubkey); // user's identity
 * ```
 */
export class ZecAuth {
  private config: Required<ZecAuthConfig>;
  private session: ZecAuthSession | null = null;

  constructor(config: ZecAuthConfig) {
    const capabilities: Capability[] = config.capabilities?.length ? config.capabilities : ["signin"];
    // `signin` is always part of a connection — fold it in so `getCapabilities()` is honest.
    const withSignin = capabilities.includes("signin")
      ? capabilities
      : (["signin", ...capabilities] as Capability[]);
    this.config = {
      domain: config.domain,
      server: config.server.replace(/\/$/, ""),
      network: config.network ?? "mainnet",
      challengeTtl: config.challengeTtl ?? 300,
      capabilities: withSignin,
      maxAmount: config.maxAmount ?? "",
    };
  }

  /** The protocol scopes this dApp requests, derived from its declared capabilities. */
  private requestedScopes(): RequestedScopes {
    return capabilitiesToScopes(
      this.config.capabilities,
      this.config.maxAmount ? { maxAmount: this.config.maxAmount } : {},
    );
  }

  /** The capabilities this dApp declared (with human-readable labels/descriptions). */
  getCapabilities(): CapabilityInfo[] {
    return describeCapabilities(this.config.capabilities);
  }

  /** Whether this dApp declared a given capability. */
  can(capability: Capability): boolean {
    return this.config.capabilities.includes(capability);
  }

  // ─── Authentication ───

  /**
   * Generate a new auth challenge with this dApp's capabilities embedded.
   *
   * Fetches a challenge from your server, then embeds the declared capabilities (as protocol
   * `scopes`) into the QR-ready JSON so the wallet can show the user what your app intends to
   * do. Capabilities are transport metadata — they are *not* part of the signed message, so
   * embedding them never affects signature verification.
   *
   * Use this if you want to build your own UI. For the default flow, use `connect()`.
   */
  async createChallenge(): Promise<ChallengeData> {
    // Tell the server which capabilities we want. The server is authoritative — it validates
    // them against its allow-list and embeds the approved scopes into the challenge it returns.
    const params = new URLSearchParams();
    if (this.config.capabilities.length) params.set("capabilities", this.config.capabilities.join(","));
    if (this.config.maxAmount) params.set("max_amount", this.config.maxAmount);
    const qs = params.toString();

    const res = await fetch(`${this.config.server}/challenge${qs ? `?${qs}` : ""}`);
    if (!res.ok) {
      let message = "Failed to create challenge";
      try {
        const body = (await res.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        /* non-JSON error body */
      }
      throw new ZecAuthError(message, res.status);
    }
    const data = (await res.json()) as Record<string, unknown>;

    let challengeObj: Record<string, unknown> = {};
    try {
      challengeObj = JSON.parse(String(data.challenge_json ?? "{}"));
    } catch {
      challengeObj = (data.challenge as Record<string, unknown>) ?? {};
    }
    // The server embeds the authoritative scopes. Fall back to client-side injection only if
    // it didn't (an older server without capability support), so the wallet still sees them.
    if (!challengeObj.scopes) challengeObj.scopes = this.requestedScopes();
    const scopes = challengeObj.scopes as RequestedScopes;
    const challenge_json = JSON.stringify(challengeObj);

    return {
      challenge: (data.challenge as Record<string, unknown>) ?? challengeObj,
      challenge_json,
      uri: String(challengeObj.uri ?? data.uri ?? ""),
      capabilities: this.getCapabilities(),
      scopes,
      callback_url: typeof data.callback_url === "string" ? data.callback_url : undefined,
      ws_url: typeof data.ws_url === "string" ? data.ws_url : undefined,
      request_url: typeof data.request_url === "string" ? data.request_url : undefined,
    };
  }

  /**
   * Verify a signed auth response from a wallet.
   * Returns a session on success.
   */
  async verify(payload: {
    pubkey: string;
    signature: string;
    message: string;
    /** Capability ids the user approved in their wallet (relayed alongside the response). */
    granted?: string[];
    /** Capability ids the user rejected. */
    denied?: string[];
    /** Capability disclosures the wallet attached (relayed alongside the signed response). */
    disclosures?: Disclosures;
  }): Promise<ZecAuthSession> {
    const res = await fetch(`${this.config.server}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // The signed triple is verified server-side; `granted` tells the server which capabilities
      // the user actually approved so it binds only those. Disclosures are client-relayed metadata.
      body: JSON.stringify({
        pubkey: payload.pubkey,
        signature: payload.signature,
        message: payload.message,
        granted: payload.granted,
      }),
    });

    const data: AuthVerifyResponse = await res.json();
    if (!res.ok) throw new ZecAuthError((data as any).error ?? "Verification failed", res.status);

    this.session = {
      pubkey: data.pubkey,
      token: data.token,
      domain: data.domain,
      chain: data.chain,
      // Authoritative from the server (the user's granted set); fall back to declared if absent.
      capabilities: (data.capabilities as Capability[]) ?? this.config.capabilities,
      denied: (payload.denied as Capability[]) ?? [],
      disclosures: payload.disclosures,
    };

    localStorage.setItem(TOKEN_KEY, data.token);
    return this.session;
  }

  /**
   * High-level connect: generate challenge → wait for wallet response → verify.
   *
   * This is the main method dApp developers call. It:
   * 1. Fetches a challenge from your server
   * 2. Calls the `onChallenge` callback so you can display the QR / deep link
   * 3. Waits for you to call the returned `submitResponse()` with the wallet's signed JSON
   * 4. Verifies and returns the session
   *
   * ```typescript
   * const session = await zecauth.connect({
   *   onChallenge: (challenge) => {
   *     showQRCode(challenge.challenge_json);
   *   },
   *   onResponse: () => getResponseFromUser(), // returns the pasted JSON
   * });
   * ```
   */
  async connect(handlers: {
    onChallenge: (challenge: ChallengeData) => void;
    onResponse: () => Promise<{
      pubkey: string;
      signature: string;
      message: string;
      granted?: string[];
      denied?: string[];
      disclosures?: Disclosures;
    }>;
  }): Promise<ZecAuthSession> {
    const challenge = await this.createChallenge();
    handlers.onChallenge(challenge);
    const response = await handlers.onResponse();
    return this.verify(response);
  }

  // ─── Session management ───

  /** Get the current session, or null if not connected. */
  getSession(): ZecAuthSession | null {
    return this.session;
  }

  /** Check if the user is currently authenticated. */
  isConnected(): boolean {
    return this.session !== null;
  }

  /** Restore a session from a stored token. Returns null if invalid/expired. */
  async restoreSession(): Promise<ZecAuthSession | null> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const res = await fetch(`${this.config.server}/session?token=${encodeURIComponent(token)}`);
      if (!res.ok) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
      const data = await res.json();
      this.session = {
        pubkey: data.pubkey,
        token,
        domain: data.domain,
        chain: data.chain,
        capabilities: (data.capabilities as Capability[]) ?? this.config.capabilities,
        denied: [], // not persisted across restore; the token only carries the granted set
      };
      return this.session;
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  }

  /** Disconnect — clear the session and token. */
  disconnect(): void {
    this.session = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Watch for the **wallet** ending this session in real time (the wallet calls its SDK's
   * disconnect → server → here). Call your logout handler in `onDisconnect`. Returns an
   * unsubscribe function.
   *
   * ```typescript
   * const stop = zecauth.watchSession({ onDisconnect: () => showLogin() });
   * ```
   */
  watchSession(handlers: { onDisconnect: () => void }): () => void {
    const pubkey = this.session?.pubkey;
    if (!pubkey) return () => {};
    let ws: WebSocket | null = null;
    let closed = false;
    try {
      ws = new WebSocket(`${this.wsOrigin()}/session/ws/${encodeURIComponent(pubkey)}`);
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "disconnected" && !closed) {
            closed = true;
            handlers.onDisconnect();
          }
        } catch {
          /* ignore */
        }
      };
    } catch {
      /* ignore — best effort */
    }
    return () => {
      closed = true;
      if (ws) {
        ws.onmessage = null;
        ws.close();
      }
    };
  }

  /** Derive the ws(s):// origin for relay sockets from the configured server (or the page). */
  private wsOrigin(): string {
    try {
      const u = new URL(this.config.server);
      return `${u.protocol === "https:" ? "wss" : "ws"}://${u.host}`;
    } catch {
      const loc = (globalThis as { location?: Location }).location;
      const scheme = loc && loc.protocol === "https:" ? "wss" : "ws";
      return `${scheme}://${loc?.host ?? "localhost"}`;
    }
  }

  // ─── Transaction requests ───

  /**
   * Request a transaction from the connected wallet.
   *
   * The request is pushed to the wallet over its relay socket (keyed by the session's
   * domain-scoped pubkey) — the approval screen pops automatically, no QR scan. Wait for
   * the result on the returned `ws_url` (or poll `callback_url`).
   *
   * ```typescript
   * const txRequest = await zecauth.createTransactionRequest({
   *   recipient: "u1abc...",
   *   amount: "0.5",
   *   description: "Monthly subscription",
   * });
   * ```
   */
  async createTransactionRequest(params: TransactionParams): Promise<TxRequestData> {
    if (!this.can("sign-transaction")) {
      throw new ZecAuthError(
        'Cannot request a transaction: declare the "sign-transaction" capability in your ' +
          'ZecAuth config (e.g. new ZecAuth({ ..., capabilities: ["signin", "sign-transaction"] })).',
      );
    }
    const token = this.session?.token
      ?? (typeof localStorage !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);
    const res = await fetch(`${this.config.server.replace("/auth", "")}/tx/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...params, token: token ?? undefined }),
    });

    const data = await res.json();
    if (!res.ok) throw new ZecAuthError((data as any).error ?? "Failed to create tx request", res.status);
    return data;
  }

  /**
   * Submit a signed transaction approval from the wallet.
   */
  async submitTransactionApproval(payload: {
    pubkey: string;
    status: string;
    signature: string;
    message: string;
    txid?: string;
  }): Promise<TransactionResult> {
    const res = await fetch(`${this.config.server.replace("/auth", "")}/tx/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: TxApprovalResponse = await res.json();
    if (!res.ok) throw new ZecAuthError((data as any).error ?? "Approval verification failed", res.status);

    return {
      status: data.status as "approved" | "denied",
      requestId: data.request_id,
      recipient: data.recipient,
      amount: data.amount,
      txid: data.txid,
      pubkey: data.pubkey,
    };
  }

  /**
   * High-level transaction request: create request → wait for wallet → verify.
   *
   * ```typescript
   * const result = await zecauth.requestTransaction(
   *   { recipient: "u1abc...", amount: "0.5" },
   *   {
   *     onRequest: (req) => showQRCode(req.request_json),
   *     onResponse: () => getApprovalFromUser(),
   *   }
   * );
   * if (result.status === "approved") { // payment approved }
   * ```
   */
  async requestTransaction(
    params: TransactionParams,
    handlers: {
      onRequest: (request: TxRequestData) => void;
      onResponse: () => Promise<{ pubkey: string; status: string; signature: string; message: string; txid?: string }>;
    }
  ): Promise<TransactionResult> {
    const txRequest = await this.createTransactionRequest(params);
    handlers.onRequest(txRequest);
    const approval = await handlers.onResponse();
    return this.submitTransactionApproval(approval);
  }
}

/** ZecAuth error with HTTP status. */
export class ZecAuthError extends Error {
  status: number;
  constructor(message: string, status: number = 0) {
    super(message);
    this.name = "ZecAuthError";
    this.status = status;
  }
}
