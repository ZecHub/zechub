// Cross-runtime explorer helpers for memo-challenge sign-in.
// Pure fetch; no Node-only deps.

export interface RecentOutput {
  txid: string;
  address: string;
  amountZatoshi: bigint;
  blockHeight?: number;
  blockTime?: number;
}

export interface RecentMemo {
  txid: string;
  memo: string;
  amountZatoshi: bigint;
  blockHeight?: number;
  blockTime?: number;
}

export interface MemoExplorer {
  /** Transparent outputs paid to `address`. Required for transparent-amount sign-in. */
  getRecentOutputsToAddress?(address: string, limit?: number): Promise<RecentOutput[]>;
  /** Decrypted shielded notes; requires an IVK-holding backend. */
  getRecentMemosToAddress?(address: string, limit?: number): Promise<RecentMemo[]>;
}

export class ExplorerError extends Error {
  readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ExplorerError";
    this.status = status;
  }
}

export interface BlockchairExplorerOptions {
  /** Optional Blockchair API key. Raises the public rate limit. */
  apiKey?: string;
  /** Override the API base URL. Default: https://api.blockchair.com/zcash */
  baseUrl?: string;
  /** Dependency-injection slot for tests and custom runtimes. Default: globalThis.fetch */
  fetch?: typeof fetch;
}

interface BlockchairOutputsResponse {
  data?: Array<{
    transaction_hash: string;
    recipient: string;
    value: number | string;
    block_id?: number | null;
    time?: string | null;
  }>;
}

/** Blockchair-backed transparent-output explorer. Public chain only;
 *  no shielded memos. */
export class BlockchairExplorer implements MemoExplorer {
  private readonly apiKey?: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(opts: BlockchairExplorerOptions = {}) {
    this.apiKey = opts.apiKey;
    this.baseUrl = (opts.baseUrl ?? "https://api.blockchair.com/zcash").replace(/\/$/, "");
    const f = opts.fetch ?? (typeof fetch === "function" ? fetch : undefined);
    if (!f) throw new ExplorerError("No global fetch() available; pass opts.fetch.");
    this.fetchImpl = f;
  }

  async getRecentOutputsToAddress(address: string, limit = 50): Promise<RecentOutput[]> {
    const url = new URL(`${this.baseUrl}/outputs`);
    url.searchParams.set("q", `recipient(${address})`);
    url.searchParams.set("limit", String(Math.min(Math.max(1, limit), 100)));
    if (this.apiKey) url.searchParams.set("key", this.apiKey);

    const res = await this.fetchImpl(url.toString(), {
      headers: { accept: "application/json" },
    });
    if (!res.ok) {
      throw new ExplorerError(`Blockchair outputs query returned ${res.status}`, res.status);
    }
    const json = (await res.json()) as BlockchairOutputsResponse;
    return (json.data ?? []).map((row) => ({
      txid: row.transaction_hash,
      address: row.recipient,
      amountZatoshi: BigInt(row.value),
      blockHeight: row.block_id ?? undefined,
      blockTime: row.time ? new Date(`${row.time}Z`).getTime() : undefined,
    }));
  }
}

export interface ThreeXplExplorerOptions {
  /** Optional 3xpl API token. Without one, falls back to sandbox-api.3xpl.com
   *  (anonymous, rate-limited, no uptime SLA). */
  apiKey?: string;
  /** Override the API base URL. */
  baseUrl?: string;
  fetch?: typeof fetch;
}

interface ThreeXplEventsResponse {
  data?: {
    events?: {
      "zcash-main"?: Array<{
        block: number;
        transaction: string;
        time: string;
        effect: string;
        failed: boolean;
      }>;
    };
  };
}

/** 3xpl-backed transparent-output explorer. Anonymous sandbox by default. */
export class ThreeXplExplorer implements MemoExplorer {
  private readonly apiKey?: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(opts: ThreeXplExplorerOptions = {}) {
    this.apiKey = opts.apiKey;
    const defaultBase = opts.apiKey ? "https://api.3xpl.com" : "https://sandbox-api.3xpl.com";
    this.baseUrl = (opts.baseUrl ?? defaultBase).replace(/\/$/, "");
    const f = opts.fetch ?? (typeof fetch === "function" ? fetch : undefined);
    if (!f) throw new ExplorerError("No global fetch() available; pass opts.fetch.");
    this.fetchImpl = f;
  }

  async getRecentOutputsToAddress(address: string, limit = 10): Promise<RecentOutput[]> {
    // 3xpl restricts `limit` to one of {1, 10, 100, 1000}.
    const safeLimit = limit <= 1 ? 1 : limit <= 10 ? 10 : limit <= 100 ? 100 : 1000;
    const url = new URL(`${this.baseUrl}/zcash/address/${encodeURIComponent(address)}`);
    url.searchParams.set("data", "events");
    url.searchParams.set("from", "zcash-main");
    url.searchParams.set("limit", String(safeLimit));
    if (this.apiKey) url.searchParams.set("token", this.apiKey);

    const res = await this.fetchImpl(url.toString(), {
      headers: { accept: "application/json" },
    });
    if (!res.ok) {
      throw new ExplorerError(`3xpl returned ${res.status}`, res.status);
    }
    const json = (await res.json()) as ThreeXplEventsResponse;
    const events = json.data?.events?.["zcash-main"] ?? [];
    // Keep incoming, confirmed events only. Effect is a signed-string zatoshi.
    return events
      .filter((e) => !e.failed && e.effect.startsWith("+"))
      .map((e) => ({
        txid: e.transaction,
        address,
        amountZatoshi: BigInt(e.effect.slice(1)),
        blockHeight: e.block,
        blockTime: Date.parse(e.time),
      }));
  }
}

/** Tries explorers in order; falls back to the next on any thrown error.
 *  Use to chain a free public explorer with a private one for reliability. */
export class MultiExplorer implements MemoExplorer {
  constructor(private readonly explorers: MemoExplorer[]) {
    if (!explorers.length) {
      throw new ExplorerError("MultiExplorer needs at least one explorer.");
    }
  }

  getRecentOutputsToAddress(address: string, limit?: number): Promise<RecentOutput[]> {
    return this.tryEach("getRecentOutputsToAddress", (e) =>
      e.getRecentOutputsToAddress?.(address, limit),
    );
  }

  getRecentMemosToAddress(address: string, limit?: number): Promise<RecentMemo[]> {
    return this.tryEach("getRecentMemosToAddress", (e) =>
      e.getRecentMemosToAddress?.(address, limit),
    );
  }

  private async tryEach<T>(
    method: string,
    call: (e: MemoExplorer) => Promise<T> | undefined,
  ): Promise<T> {
    const errors: string[] = [];
    for (const explorer of this.explorers) {
      const pending = call(explorer);
      if (pending == null) continue;
      try {
        return await pending;
      } catch (err) {
        errors.push((err as Error).message);
      }
    }
    throw new ExplorerError(
      errors.length
        ? `All explorers failed at ${method}: ${errors.join("; ")}`
        : `No explorer implements ${method}`,
    );
  }
}
