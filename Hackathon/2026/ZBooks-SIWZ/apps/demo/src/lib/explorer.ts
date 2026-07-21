// Explorer abstraction for SIWZ memo-challenge verification and UFVK sync.
// Three backends share one interface: Blockchair (transparent only),
// ZcashRpcExplorer (zcashd/zaino), LightwalletExplorer (apps/lightwallet-rpc).
// Strict superset of @siwz/core's MemoExplorer contract.

import { ZcashRpcClient, decodeMemoHex, ZcashRpcError } from "./zcash-rpc";
import type { MemoExplorer } from "@siwz/core";

export interface TxOutput {
  address: string;
  amountZatoshi: bigint;
}

export interface TxDetails {
  txid: string;
  outputs: TxOutput[];
  blockHeight?: number;
  blockTime?: number;
}

export interface RecentOutput extends TxOutput {
  txid: string;
  blockTime?: number;
  blockHeight?: number;
}

// Decrypted shielded note; memo is UTF-8 (0xf6 padding stripped).
export interface RecentMemo {
  txid: string;
  memo: string;
  amountZatoshi: bigint;
  blockTime?: number;
  blockHeight?: number;
}

// Wire shape between lightwallet-rpc and ZBooks. Numeric fields are
// strings so JSON-safe bigints don't lose precision.
export interface UfvkTransaction {
  txid: string;
  direction: "in" | "out";
  amountZatoshi: string;
  memo: string | null;
  counterparty: string | null;
  blockHeight: number | null;
  timestamp: number | null;
  status: string;
  poolReceived: string | null;
}

export interface UfvkSyncResult {
  transactions: UfvkTransaction[];
  syncedToBlock: number | null;
  chainTip?: number | null;
  walletBirthday?: number | null;
  syncedAt: string;
}

// Treasury balance for the pre-flight check and the /payouts treasury panel.
// Strings keep zatoshi JSON-safe; spendable excludes unconfirmed change.
export interface UfvkBalance {
  totalZatoshi: string;
  spendableZatoshi: string;
  unconfirmedZatoshi: string;
  syncedAt: string;
}

export interface Explorer extends MemoExplorer {
  // Returns null on "not found", throws only on network/API errors.
  getTransaction(txid: string): Promise<TxDetails | null>;
  getRecentOutputsToAddress(address: string, limit?: number): Promise<RecentOutput[]>;
  // Requires the backend to hold the IVK (block explorers can't decrypt memos).
  getRecentMemosToAddress?(address: string, limit?: number): Promise<RecentMemo[]>;
  // Only LightwalletExplorer satisfies this today. `birthday` is consulted
  // on the wrapper's first sync for this UFVK.
  getTransactionsForUfvk?(ufvk: string, opts?: { birthday?: number }): Promise<UfvkSyncResult>;
  // Treasury spendable/total for payout pre-flight. Optional: backends that
  // can't compute it (block explorers) simply omit it.
  getBalanceForUfvk?(ufvk: string, opts?: { birthday?: number }): Promise<UfvkBalance>;
}

const BLOCKCHAIR_BASE = "https://api.blockchair.com/zcash";

export class BlockchairExplorer implements Explorer {
  constructor(private readonly apiKey?: string) {}

  async getTransaction(txid: string): Promise<TxDetails | null> {
    if (!/^[0-9a-fA-F]{64}$/.test(txid)) return null;
    const url = new URL(`${BLOCKCHAIR_BASE}/dashboards/transaction/${txid}`);
    if (this.apiKey) url.searchParams.set("key", this.apiKey);
    const res = await fetch(url.toString(), {
      headers: { accept: "application/json" },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new ExplorerError(`Blockchair returned ${res.status}: ${await res.text()}`);
    const json = (await res.json()) as BlockchairResponse;
    const tx = json?.data?.[txid];
    if (!tx) return null;
    return {
      txid,
      outputs: (tx.outputs ?? []).map((o) => ({
        address: o.recipient,
        amountZatoshi: BigInt(o.value),
      })),
      blockHeight: tx.transaction?.block_id ?? undefined,
      blockTime: tx.transaction?.time
        ? new Date(tx.transaction.time + "Z").getTime()
        : undefined,
    };
  }

  async getRecentOutputsToAddress(address: string, limit = 50): Promise<RecentOutput[]> {
    const url = new URL(`${BLOCKCHAIR_BASE}/outputs`);
    url.searchParams.set("q", `recipient(${address})`);
    url.searchParams.set("limit", String(limit));
    if (this.apiKey) url.searchParams.set("key", this.apiKey);
    const res = await fetch(url.toString(), { headers: { accept: "application/json" } });
    if (!res.ok) throw new ExplorerError(`Blockchair outputs query returned ${res.status}`);
    const json = (await res.json()) as BlockchairOutputsResponse;
    return (json.data ?? []).map((row) => ({
      address: row.recipient,
      amountZatoshi: BigInt(row.value),
      txid: row.transaction_hash,
      blockHeight: row.block_id ?? undefined,
      blockTime: row.time ? new Date(row.time + "Z").getTime() : undefined,
    }));
  }
}

interface BlockchairResponse {
  data?: Record<
    string,
    {
      transaction?: { block_id?: number; time?: string };
      outputs?: { recipient: string; value: string | number }[];
    }
  >;
}

interface BlockchairOutputsResponse {
  data?: {
    transaction_hash: string;
    recipient: string;
    value: string | number;
    block_id?: number;
    time?: string;
  }[];
}

export class ExplorerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExplorerError";
  }
}

export class MockExplorer implements Explorer {
  // Tagged so callers can detect a mock across Next.js HMR (where `instanceof` is unreliable).
  readonly __mock = true as const;

  constructor(
    private readonly fixtures: Record<string, TxDetails> = {},
    private readonly memos: RecentMemo[] = [],
  ) {}

  add(tx: TxDetails): void {
    this.fixtures[tx.txid] = tx;
  }

  addMemo(m: RecentMemo): void {
    this.memos.push(m);
  }

  async getTransaction(txid: string): Promise<TxDetails | null> {
    return this.fixtures[txid] ?? null;
  }

  async getRecentOutputsToAddress(address: string, limit = 50): Promise<RecentOutput[]> {
    const rows: RecentOutput[] = [];
    for (const tx of Object.values(this.fixtures)) {
      for (const o of tx.outputs) {
        if (o.address === address) {
          rows.push({
            address: o.address,
            amountZatoshi: o.amountZatoshi,
            txid: tx.txid,
            blockHeight: tx.blockHeight,
            blockTime: tx.blockTime,
          });
        }
      }
    }
    return rows.slice(-limit).reverse();
  }

  async getRecentMemosToAddress(_address: string, limit = 50): Promise<RecentMemo[]> {
    return this.memos.slice(-limit).reverse();
  }

  // Synthetic treasury balance so the demo's payout pre-flight has something
  // to show. ~3.2 ZEC total, ~2.85 spendable (the rest "unconfirmed change").
  async getBalanceForUfvk(_ufvk: string): Promise<UfvkBalance> {
    return {
      totalZatoshi: "320000000",
      spendableZatoshi: "285000000",
      unconfirmedZatoshi: "35000000",
      syncedAt: new Date().toISOString(),
    };
  }
}

export function isMockExplorer(e: Explorer): e is MockExplorer {
  return Boolean((e as { __mock?: boolean }).__mock);
}

// Daemon-backed explorer for zcashd / zaino / zallet.
export class ZcashRpcExplorer implements Explorer {
  constructor(private readonly rpc: ZcashRpcClient) {}

  describe(): string {
    return this.rpc.describe();
  }

  async getTransaction(txid: string): Promise<TxDetails | null> {
    try {
      const raw = await this.rpc.call<RpcGetRawTransaction>("getrawtransaction", [txid, 1]);
      if (!raw || !raw.vout) return null;
      return {
        txid,
        outputs: raw.vout.map((v) => ({
          address: v.scriptPubKey?.addresses?.[0] ?? "",
          amountZatoshi: BigInt(Math.round((v.value ?? 0) * 1e8)),
        })).filter((o) => o.address),
        blockHeight: raw.height ?? undefined,
        blockTime: raw.time ? raw.time * 1000 : undefined,
      };
    } catch (err) {
      if (err instanceof ZcashRpcError && err.code === "rpc") return null;
      throw err;
    }
  }

  async getRecentOutputsToAddress(address: string, limit = 50): Promise<RecentOutput[]> {
    const rows = await this.rpc.call<RpcListReceivedByAddress[]>(
      "z_listreceivedbyaddress",
      [address, 0],
    ).catch(() => null);
    if (rows && Array.isArray(rows)) {
      return rows.slice(-limit).reverse().map((r) => ({
        address,
        amountZatoshi: BigInt(Math.round((r.amount ?? 0) * 1e8)),
        txid: r.txid,
        blockHeight: r.blockheight ?? r.height ?? undefined,
      }));
    }
    return [];
  }

  async getRecentMemosToAddress(address: string, limit = 50): Promise<RecentMemo[]> {
    let rows: RpcListReceivedByAddress[];
    try {
      rows = await this.rpc.call<RpcListReceivedByAddress[]>(
        "z_listreceivedbyaddress",
        [address, 0],
      );
    } catch (err) {
      if (err instanceof ZcashRpcError && err.code === "method-not-found") {
        throw new ZcashRpcError(
          "method-not-found",
          `Your Zcash daemon doesn't support z_listreceivedbyaddress. SIWZ shielded sign-in needs a wallet RPC that decrypts memos for incoming notes (zcashd >=5.0, or the zallet/zaino equivalent).`,
        );
      }
      throw err;
    }
    return rows
      .slice(-limit)
      .reverse()
      .map((r): RecentMemo | null => {
        const memo = decodeMemoHex(r.memo ?? "");
        if (memo == null) return null;
        return {
          txid: r.txid,
          memo,
          amountZatoshi: BigInt(Math.round((r.amount ?? 0) * 1e8)),
          blockHeight: r.blockheight ?? r.height ?? undefined,
        };
      })
      .filter((m): m is RecentMemo => m !== null);
  }
}

interface RpcGetRawTransaction {
  vout?: { value?: number; scriptPubKey?: { addresses?: string[] } }[];
  height?: number;
  time?: number;
}

interface RpcListReceivedByAddress {
  txid: string;
  amount?: number;
  memo?: string; // hex, padded with 0xf6 to 512 bytes
  blockheight?: number;
  height?: number;
}

// In DEMO mode, prime the singleton mock with a synthetic fixture and return its txid.
export function primeDemoFixture(
  expected: { serviceAddress: string; amountZatoshi: bigint },
  randomTxid: () => string,
): string | null {
  if (process.env.SIWZ_DEMO !== "1") return null;
  const e = getDefaultExplorer();
  if (!isMockExplorer(e)) return null;
  const txid = randomTxid();
  e.add({
    txid,
    outputs: [{ address: expected.serviceAddress, amountZatoshi: expected.amountZatoshi }],
    blockHeight: 2_900_000 + Math.floor(Math.random() * 1000),
    blockTime: Date.now(),
  });
  return txid;
}

export function primeDemoMemoFixture(
  expected: { memo: string; amountZatoshi: bigint },
  randomTxid: () => string,
): string | null {
  if (process.env.SIWZ_DEMO !== "1") return null;
  const e = getDefaultExplorer();
  if (!isMockExplorer(e)) return null;
  const txid = randomTxid();
  e.addMemo({
    txid,
    memo: expected.memo,
    amountZatoshi: expected.amountZatoshi,
    blockHeight: 2_900_000 + Math.floor(Math.random() * 1000),
    blockTime: Date.now(),
  });
  return txid;
}

// Cached on globalThis so each Next.js HMR-reloaded route sees the same singleton.
const GLOBAL_KEY = Symbol.for("@siwz/zbooks/explorer");
type GlobalCache = { [k: symbol]: Explorer | undefined };
const cache = globalThis as unknown as GlobalCache;

export function getDefaultExplorer(): Explorer {
  const wantMock = process.env.SIWZ_DEMO === "1";
  const existing = cache[GLOBAL_KEY];
  // Re-check env each lookup so a singleton from before SIWZ_DEMO was set doesn't lock us in.
  if (existing && wantMock === isMockExplorer(existing)) return existing;
  const made: Explorer = wantMock
    ? new MockExplorer()
    : new BlockchairExplorer(process.env.BLOCKCHAIR_API_KEY);
  cache[GLOBAL_KEY] = made;
  return made;
}

// Priority: SIWZ_DEMO=1 → Mock, LIGHTWALLET_RPC_URL → wrapper, ZCASH_RPC_URL → daemon, null otherwise.
export function getShieldedExplorer(): Explorer | null {
  if (process.env.SIWZ_DEMO === "1") return getDefaultExplorer();
  const lwUrl = process.env.LIGHTWALLET_RPC_URL;
  const lwToken = process.env.LIGHTWALLET_RPC_TOKEN;
  if (lwUrl && lwToken) {
    return new LightwalletExplorer(lwUrl, lwToken);
  }
  const rpc = ZcashRpcClient.fromEnv();
  if (!rpc.isConfigured) return null;
  return new ZcashRpcExplorer(rpc);
}

// HTTP client for apps/lightwallet-rpc. See docs/siwz/shielded-deployment.md.
export class LightwalletExplorer implements Explorer {
  constructor(private readonly url: string, private readonly token: string) {}

  async getTransaction(_txid: string): Promise<TxDetails | null> {
    return null;
  }

  async getRecentOutputsToAddress(_address: string, _limit = 50): Promise<RecentOutput[]> {
    return [];
  }

  async getRecentMemosToAddress(address: string, limit = 50): Promise<RecentMemo[]> {
    const res = await fetch(`${this.url.replace(/\/$/, "")}/memos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ address, limit }),
    });
    if (!res.ok) {
      throw new ExplorerError(`lightwallet-rpc returned ${res.status}: ${await res.text().catch(() => "")}`);
    }
    const json = (await res.json()) as { memos?: { txid: string; memo: string; amountZatoshi: string; blockHeight?: number }[] };
    return (json.memos ?? []).map((m) => ({
      txid: m.txid,
      memo: m.memo,
      amountZatoshi: BigInt(m.amountZatoshi),
      blockHeight: m.blockHeight,
    }));
  }

  async getTransactionsForUfvk(
    ufvk: string,
    opts: { birthday?: number } = {},
  ): Promise<UfvkSyncResult> {
    // First sync can take a couple of minutes server-side.
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 6 * 60_000);
    try {
      const body: { ufvk: string; birthday?: number } = { ufvk };
      if (Number.isFinite(opts.birthday)) body.birthday = opts.birthday;
      const res = await fetch(`${this.url.replace(/\/$/, "")}/transactions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      if (!res.ok) {
        throw new ExplorerError(
          `lightwallet-rpc /transactions returned ${res.status}: ${await res.text().catch(() => "")}`,
        );
      }
      return (await res.json()) as UfvkSyncResult;
    } finally {
      clearTimeout(timeout);
    }
  }

  async getBalanceForUfvk(
    ufvk: string,
    opts: { birthday?: number } = {},
  ): Promise<UfvkBalance> {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 6 * 60_000);
    try {
      const body: { ufvk: string; birthday?: number } = { ufvk };
      if (Number.isFinite(opts.birthday)) body.birthday = opts.birthday;
      const res = await fetch(`${this.url.replace(/\/$/, "")}/balance`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      if (!res.ok) {
        throw new ExplorerError(
          `lightwallet-rpc /balance returned ${res.status}: ${await res.text().catch(() => "")}`,
        );
      }
      return (await res.json()) as UfvkBalance;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export function setExplorer(e: Explorer): () => void {
  const prev = cache[GLOBAL_KEY];
  cache[GLOBAL_KEY] = e;
  return () => {
    cache[GLOBAL_KEY] = prev;
  };
}
