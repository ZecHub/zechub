/**
 * `ZecAuthRelay` — the wallet-side live connection to a ZecAuth server.
 *
 * After a wallet signs in to a dApp, it holds a {@link ZecAuthSession} (the server host as
 * `domain`, and the domain-scoped `pubkey` it presented). The relay keeps a persistent
 * WebSocket open per session, subscribed by that per-domain pubkey, so the server can
 * **push transaction requests straight to the connected wallet** — no QR scan, no polling.
 *
 * This is the transport that makes "request payment from the connected wallet" work: the
 * dApp creates a request, the server routes it to the wallet's relay socket, and the wallet
 * pops the approval screen automatically.
 *
 * ```ts
 * const relay = new ZecAuthRelay({
 *   onRequest: (req) => {
 *     if (req.kind === "transaction") showApproval(req.payload, req.callbackUrl);
 *   },
 * });
 * // Reconcile open sockets to the current session list whenever it changes:
 * relay.sync(sessions.map((s) => ({ domain: s.domain, pubkey: s.pubkey })));
 * ```
 *
 * The server endpoint is `GET ws(s)://<domain>/wallet/ws/<pubkey>`.
 */
import { parseDeepLink } from "./deeplink.js";
import type { ZecAuthDeepLink } from "./types.js";

export type RelayStatus = "connecting" | "open" | "closed";

/** The minimum a wallet session needs to receive pushed requests. */
export interface RelaySessionRef {
  /** Server host the session was established with, e.g. "localhost:3000" or "10.0.0.5:3000". */
  domain: string;
  /** The domain-scoped public key (hex) presented to this dApp. */
  pubkey: string;
}

export interface ZecAuthRelayOptions {
  /** Called for every request the server pushes to this wallet (already parsed). */
  onRequest: (request: ZecAuthDeepLink, raw: string, session: RelaySessionRef) => void;
  /** Optional per-session connection status updates. */
  onStatus?: (status: RelayStatus, session: RelaySessionRef) => void;
  /** Use `wss://` instead of `ws://` (default `false` — demo/LAN servers are plain ws). */
  secure?: boolean;
  /** Auto-reconnect backoff in ms (default 3000). Set `0` to disable reconnection. */
  reconnectMs?: number;
  /** WebSocket constructor. Defaults to the global `WebSocket` (present in React Native). */
  WebSocketImpl?: WebSocketCtor;
  /** Override how the socket URL is derived from a session. */
  urlFor?: (session: RelaySessionRef) => string;
}

/** Minimal structural type so the SDK doesn't depend on the DOM lib. */
export interface WebSocketLike {
  close(code?: number, reason?: string): void;
  onopen: ((ev: unknown) => void) | null;
  onmessage: ((ev: { data: unknown }) => void) | null;
  onerror: ((ev: unknown) => void) | null;
  onclose: ((ev: unknown) => void) | null;
}
export type WebSocketCtor = new (url: string) => WebSocketLike;

interface Conn {
  ws?: WebSocketLike;
  closedByUs: boolean;
  timer?: ReturnType<typeof setTimeout>;
}

export class ZecAuthRelay {
  private readonly opts: ZecAuthRelayOptions;
  /** Live connections keyed by session pubkey. */
  private readonly conns = new Map<string, Conn>();

  constructor(opts: ZecAuthRelayOptions) {
    this.opts = opts;
  }

  /** Number of sessions with an open or pending socket. */
  get size(): number {
    return this.conns.size;
  }

  private url(session: RelaySessionRef): string {
    if (this.opts.urlFor) return this.opts.urlFor(session);
    const scheme = this.opts.secure ? "wss" : "ws";
    return `${scheme}://${session.domain}/wallet/ws/${encodeURIComponent(session.pubkey)}`;
  }

  /**
   * Reconcile the set of open connections to exactly match `sessions`: opens sockets for
   * new sessions, closes sockets for sessions that went away. Call this whenever the
   * wallet's session list changes.
   */
  sync(sessions: RelaySessionRef[]): void {
    const wanted = new Map(sessions.map((s) => [s.pubkey, s] as const));
    for (const pubkey of [...this.conns.keys()]) {
      if (!wanted.has(pubkey)) this.unsubscribe(pubkey);
    }
    for (const session of sessions) {
      if (!this.conns.has(session.pubkey)) this.subscribe(session);
    }
  }

  /** Open (and keep open) a socket for a single session. Idempotent. */
  subscribe(session: RelaySessionRef): void {
    if (this.conns.has(session.pubkey)) return;
    const conn: Conn = { closedByUs: false };
    this.conns.set(session.pubkey, conn);
    this.open(session, conn);
  }

  private open(session: RelaySessionRef, conn: Conn): void {
    const WS = this.opts.WebSocketImpl ?? (globalThis as { WebSocket?: WebSocketCtor }).WebSocket;
    if (!WS) return; // no WebSocket available in this runtime
    this.opts.onStatus?.("connecting", session);

    let ws: WebSocketLike;
    try {
      ws = new WS(this.url(session));
    } catch {
      this.scheduleReconnect(session, conn);
      return;
    }
    conn.ws = ws;

    ws.onopen = () => this.opts.onStatus?.("open", session);
    ws.onmessage = (ev) => {
      const raw = typeof ev.data === "string" ? ev.data : String(ev.data);
      if (!raw) return;
      const link = parseDeepLink(raw);
      // Server control frames (e.g. {"error":"..."}) parse to kind === null — ignore them.
      if (link?.kind) this.opts.onRequest(link, raw, session);
    };
    ws.onerror = () => {
      /* surfaced via onclose, which schedules the reconnect */
    };
    ws.onclose = () => {
      conn.ws = undefined;
      this.opts.onStatus?.("closed", session);
      if (!conn.closedByUs) this.scheduleReconnect(session, conn);
    };
  }

  private scheduleReconnect(session: RelaySessionRef, conn: Conn): void {
    const delay = this.opts.reconnectMs ?? 3000;
    if (delay <= 0 || conn.closedByUs) return;
    conn.timer = setTimeout(() => {
      if (!conn.closedByUs) this.open(session, conn);
    }, delay);
  }

  /** Close and forget the socket for a given session pubkey. */
  unsubscribe(pubkey: string): void {
    const conn = this.conns.get(pubkey);
    if (!conn) return;
    conn.closedByUs = true;
    if (conn.timer) clearTimeout(conn.timer);
    try {
      conn.ws?.close();
    } catch {
      /* ignore */
    }
    this.conns.delete(pubkey);
  }

  /** Close every connection. Call on logout / unmount. */
  close(): void {
    for (const pubkey of [...this.conns.keys()]) this.unsubscribe(pubkey);
  }
}

/**
 * Tell the ZecAuth server the wallet is ending a session. The server revokes it and notifies
 * the dApp over its session-status socket, so "Disconnect" in the wallet reflects in the dApp.
 * Best-effort — callers should ignore network errors (the local session is removed regardless).
 *
 * ```ts
 * await disconnectSession({ domain: session.domain, pubkey: session.pubkey });
 * ```
 */
export async function disconnectSession(
  session: RelaySessionRef,
  opts: { secure?: boolean; fetchImpl?: typeof fetch } = {},
): Promise<void> {
  const scheme = opts.secure ? "https" : "http";
  const url = `${scheme}://${session.domain}/wallet/disconnect`;
  const doFetch = opts.fetchImpl ?? (globalThis as { fetch?: typeof fetch }).fetch;
  if (!doFetch) return;
  await doFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pubkey: session.pubkey, domain: session.domain }),
  });
}
