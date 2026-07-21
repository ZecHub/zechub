#!/usr/bin/env node
// HTTP wrapper around zingo-cli. Exposes POST /memos and POST /transactions
// behind bearer auth for SIWZ-using apps.
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createHash, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { ZCASH_BLOCKS } from "./zcash-blocks.mjs";

const PORT = parseInt(process.env.PORT ?? "18232", 10);
const TOKEN = process.env.LIGHTWALLET_RPC_TOKEN;
const ZINGO = process.env.ZINGO_CLI_PATH ?? "zingo-cli";
// lightwalletd endpoints (comma-separated). zingo cycles them on transient
// errors; without --server it uses its built-in (often dead) default.
const LIGHTWALLETD_LIST = (process.env.LIGHTWALLETD ?? "https://zec.rocks:443,https://na.zec.rocks:443,https://eu.zec.rocks:443")
  .split(",").map((s) => s.trim()).filter(Boolean);
const WALLET_DIR = process.env.ZINGO_WALLET_DIR;
const UFVK_WALLETS_DIR = process.env.ZINGO_UFVK_WALLETS_DIR ?? join(homedir(), ".zingo-ufvks");
const exec = promisify(execFile);

if (!existsSync(UFVK_WALLETS_DIR)) {
  mkdirSync(UFVK_WALLETS_DIR, { recursive: true });
}

if (!TOKEN) {
  console.error("FATAL: LIGHTWALLET_RPC_TOKEN env var is required.");
  console.error("Generate one with:");
  console.error(`  node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`);
  process.exit(1);
}
if (TOKEN.length < 32) {
  console.error("FATAL: LIGHTWALLET_RPC_TOKEN must be at least 32 chars.");
  process.exit(1);
}

const TOKEN_BUF = Buffer.from(TOKEN);

// Background sync keeps wallets fresh on a timer so request handlers serve from
// an in-memory cache instead of blocking on a per-request --waitsync.
const BACKGROUND_SYNC = process.env.BACKGROUND_SYNC !== "0";
const REFRESH_INTERVAL_MS = Number(process.env.BACKGROUND_SYNC_INTERVAL_MS ?? 120_000);
const RESULT_TTL_MS = Number(process.env.RESULT_TTL_MS ?? 180_000);

// Per-wallet-dir mutex: only one zingo-cli process may touch a dir at a time,
// since concurrent processes on one wallet corrupt it. Covers both the
// background loop and any cold request that has to compute.
const dirLocks = new Map();
function withDirLock(key, fn) {
  const prev = dirLocks.get(key) ?? Promise.resolve();
  const run = prev.then(fn, fn);
  dirLocks.set(key, run.catch(() => {}));
  return run;
}

// key -> { data, at, refresh }. Requests serve `data`; the loop calls `refresh`.
const RESULT_CACHE = new Map();
const cacheInflight = new Map();
async function cached(key, refresh) {
  const hit = RESULT_CACHE.get(key);
  if (hit && Date.now() - hit.at < RESULT_TTL_MS) return hit.data;
  if (cacheInflight.has(key)) return cacheInflight.get(key);
  const p = (async () => {
    try {
      const data = await refresh();
      RESULT_CACHE.set(key, { data, at: Date.now(), refresh });
      return data;
    } finally {
      cacheInflight.delete(key);
    }
  })();
  cacheInflight.set(key, p);
  return p;
}

// Transient lightwalletd/network errors worth retrying on another endpoint.
const TRANSIENT_RE = /timeout|deadline|cancell|unavailable|transport error|\bEOF\b|connection|reset|\btls\b/i;

// Run `zingo-cli --server S <baseArgs> --waitsync <cmd>`, cycling the endpoint
// list and retrying on transient sync errors. baseArgs may be a function so
// callers can recompute wallet freshness between attempts.
//
// `parse` is an optional custom parser for commands whose output isn't JSON
// (e.g. `balance` emits a Rust Debug print, not JSON). Returns the parsed
// value if it returns a non-null result. Defaults to JSON extraction.
async function runZingo(baseArgs, cmd, { timeout, maxBuffer, lockKey, parse }) {
  const parser = parse ?? defaultJsonParser;
  const attempt = async () => {
    let lastErr;
    const attempts = Math.max(2, LIGHTWALLETD_LIST.length);
    for (let i = 0; i < attempts; i++) {
      const server = LIGHTWALLETD_LIST[i % LIGHTWALLETD_LIST.length];
      const base = typeof baseArgs === "function" ? baseArgs() : baseArgs;
      try {
        const { stdout } = await exec(ZINGO, ["--server", server, ...base, "--waitsync", cmd], {
          encoding: "utf8",
          maxBuffer,
          timeout,
        });
        const parsed = parser(stdout);
        if (parsed != null) return parsed;
        lastErr = new Error(`zingo "${cmd}" via ${server} returned no parseable data: ${stdout.trim().slice(0, 300) || "(empty)"}`);
      } catch (err) {
        lastErr = err;
        const blob = `${err.message ?? ""}${err.stderr ?? ""}${err.stdout ?? ""}`;
        if (!TRANSIENT_RE.test(blob)) throw err;
      }
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 2000));
    }
    throw lastErr;
  };
  return lockKey ? withDirLock(lockKey, attempt) : attempt();
}

// zingo-cli v0.2+ takes the command as a positional arg; `--waitsync` blocks
// until the startup sync catches up.
async function zingoCmd(cmd) {
  return runZingo(WALLET_DIR ? ["--data-dir", WALLET_DIR] : [], cmd, {
    timeout: 120_000,
    maxBuffer: 32 * 1024 * 1024,
    lockKey: WALLET_DIR ?? "service",
  });
}

// Default parser: extract a JSON block out of zingo stdout. Used by
// commands like `messages` that emit a JSON object/array possibly preceded
// by log noise.
function defaultJsonParser(stdout) {
  const block = extractJsonBlock(stdout);
  if (!block) return null;
  try {
    return JSON.parse(block);
  } catch {
    return null;
  }
}

// Parser for `zingo-cli balance`, whose modern output is a Rust Debug print
// (NOT JSON). Example output:
//   Launching sync task...
//   [
//       confirmed_orchard_balance: 67_900
//       unconfirmed_orchard_balance: 0
//       total_orchard_balance: 67_900
//       ...
//       confirmed_transparent_balance: no view cap
//   ]
// We extract every `<key>: <value>` pair and translate `<int_with_underscores>`
// to a Number, with "no view cap" treated as 0. Result has the same field
// names so getUfvkBalance's existing summing logic keeps working.
function parseZingoBalanceDebug(stdout) {
  const fields = {};
  const re = /([a-z][a-z0-9_]*_balance):\s*([0-9][0-9_]*|no view cap)/gi;
  let m;
  while ((m = re.exec(stdout)) !== null) {
    const key = m[1];
    const raw = m[2];
    fields[key] = raw === "no view cap" ? 0 : Number(raw.replace(/_/g, ""));
  }
  return Object.keys(fields).length > 0 ? fields : null;
}

// Walks stdout and yields every balanced { ... } / [ ... ] block in order, then
// returns the first one that successfully parses as JSON. Modern zingo-cli
// emits a Rust Debug print of the wallet state before the actual JSON for
// some commands (notably `balance`); skipping those non-JSON blocks fixes the
// "Unexpected token 'c', \"[\n    confirmed_\"" parse failure.
function extractJsonBlock(s) {
  const blocks = [];
  let i = 0;
  while (i < s.length) {
    const open = s.slice(i).search(/[\{\[]/);
    if (open === -1) break;
    const start = i + open;
    const block = balancedBlock(s, start);
    if (!block) break;
    blocks.push(block);
    i = start + block.length;
  }
  // Prefer parseable blocks; among those, the first one wins.
  for (const b of blocks) {
    try {
      JSON.parse(b);
      return b;
    } catch {
      // Skip non-JSON debug blocks like Rust `[\n confirmed_orchard: 0, ...]`.
    }
  }
  return null;
}

function balancedBlock(s, start) {
  const opener = s[start];
  if (opener !== "{" && opener !== "[") return null;
  const stack = [opener];
  let inString = false;
  let escape = false;
  for (let i = start + 1; i < s.length; i++) {
    const ch = s[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\" && inString) { escape = true; continue; }
    if (ch === "\"") { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{" || ch === "[") stack.push(ch);
    else if (ch === "}" || ch === "]") {
      stack.pop();
      if (stack.length === 0) return s.slice(start, i + 1);
    }
  }
  return null;
}

// zingo-cli v0.2's `messages` returns { value_transfers: [...] }; older
// versions return a flat array. Per-transfer field names also drift between
// versions, hence the defensive key lookups below.
async function listIncomingMemos(address, limit) {
  const data = await zingoCmd("messages");
  const transfers = Array.isArray(data) ? data : (data?.value_transfers ?? []);
  if (!Array.isArray(transfers)) {
    throw new Error(`'messages' returned unexpected shape: ${JSON.stringify(data).slice(0, 200)}`);
  }

  const out = [];
  for (const t of transfers) {
    if (!t || typeof t !== "object") continue;
    const memo = pickMemo(t, address);
    if (!memo) continue;
    // Different zingo versions report direction as `kind`, `direction`,
    // or only via the amount sign, so check all three.
    const kind = t.kind ?? t.direction ?? null;
    if (kind && /out/i.test(String(kind))) continue;
    const amountRaw = t.amount ?? t.value ?? t.zatoshis ?? 0;
    if (typeof amountRaw === "number" && amountRaw < 0) continue;
    out.push({
      txid: t.txid ?? t.tx_id ?? t.transaction_id ?? t.id ?? "<unknown>",
      memo,
      amountZatoshi: zatoshiString(amountRaw),
      blockHeight: t.block_height ?? t.height ?? t.blockheight ?? undefined,
    });
    if (out.length >= limit) break;
  }
  return out;
}

// zingo reports amounts as integer zatoshi *or* decimal ZEC depending on
// the command; decimals get scaled by 1e8. String return keeps it JSON-safe.
function zatoshiString(raw) {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n)) return "0";
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 1e8));
}

// Source: packages/siwz-core/src/zcash-blocks.ts. Override with `birthday` in POST body.
const DEFAULT_WALLET_BIRTHDAY = ZCASH_BLOCKS.SAFE_RECENT_BIRTHDAY;

// Dedupes concurrent /transactions calls per UFVK. Two zingo-cli processes
// against the same wallet dir corrupt it, and nginx 504 retries are common.
const ufvkSyncInFlight = new Map();

async function zingoCmdForUfvk(ufvk, walletDir, cmd, opts = {}) {
  // Recomputed each attempt: a failed first sync may still persist the wallet,
  // after which re-passing --viewkey errors, so only pass it while fresh.
  const buildArgs = () => {
    const base = ["--data-dir", walletDir];
    if (!existsSync(join(walletDir, "zingo-wallet.dat"))) {
      const birthday = Number.isFinite(opts.birthday) ? Math.max(0, Math.floor(opts.birthday)) : DEFAULT_WALLET_BIRTHDAY;
      base.push("--viewkey", ufvk, "--birthday", String(birthday));
    }
    return base;
  };
  return runZingo(buildArgs, cmd, {
    timeout: 5 * 60_000,
    maxBuffer: 64 * 1024 * 1024,
    lockKey: walletDir,
    parse: opts.parse,
  });
}

function walletDirForUfvk(ufvk) {
  const h = createHash("sha256").update(ufvk).digest("hex").slice(0, 16);
  return join(UFVK_WALLETS_DIR, h);
}

async function syncUfvkTransactions(ufvk, opts = {}) {
  const inflight = ufvkSyncInFlight.get(ufvk);
  if (inflight) return inflight;
  const promise = (async () => {
    try {
      return await _syncUfvkTransactionsImpl(ufvk, opts);
    } finally {
      ufvkSyncInFlight.delete(ufvk);
    }
  })();
  ufvkSyncInFlight.set(ufvk, promise);
  return promise;
}

async function _syncUfvkTransactionsImpl(ufvk, opts = {}) {
  const dir = walletDirForUfvk(ufvk);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const data = await zingoCmdForUfvk(ufvk, dir, "messages", opts);
  const raw = Array.isArray(data) ? data : (data?.value_transfers ?? []);

  const txs = raw
    .filter((t) => t && typeof t === "object")
    .map((t) => {
      const memo = pickMemo(t, "") ?? null;
      const kind = String(t.kind ?? t.direction ?? "").toLowerCase();
      const direction = /out|sent/.test(kind) ? "out" : "in";
      const amountRaw = t.amount ?? t.value ?? t.zatoshis ?? 0;
      return {
        txid: t.txid ?? t.tx_id ?? t.transaction_id ?? t.id ?? "",
        direction,
        amountZatoshi: zatoshiString(amountRaw),
        memo,
        counterparty: t.recipient_address ?? t.from_address ?? null,
        blockHeight: t.block_height ?? t.height ?? t.blockheight ?? null,
        timestamp: t.datetime
          ? (t.datetime > 1e12 ? t.datetime : t.datetime * 1000)
          : null,
        status: t.status ?? "confirmed",
        poolReceived: t.pool_received ?? t.pool ?? null,
      };
    })
    .filter((t) => t.txid);

  // Skip the `height`/`info` follow-up calls: each invocation re-runs a
  // full --waitsync, which would triple the work and OOM a 2GB VPS.
  return {
    transactions: txs,
    syncedToBlock: null,
    chainTip: null,
    walletBirthday: null,
    syncedAt: new Date().toISOString(),
  };
}

// zingo-cli `balance` field names drift across versions; sum the per-pool
// totals (orchard/sapling/transparent) and spendable_* defensively.
//
// Newer zingo-cli builds emit a Rust Debug print for `balance` with fields
// like `confirmed_orchard_balance`, `unconfirmed_orchard_balance`,
// `total_orchard_balance`. Older versions emit JSON with `orchard_balance`,
// `spendable_orchard_balance`. We accept either by trying JSON first and
// falling back to the debug parser, and by reading whichever set of keys is
// present.
async function getUfvkBalance(ufvk, opts = {}) {
  const dir = walletDirForUfvk(ufvk);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const data = await zingoCmdForUfvk(ufvk, dir, "balance", {
    ...opts,
    parse: (stdout) => defaultJsonParser(stdout) ?? parseZingoBalanceDebug(stdout),
  });

  const num = (v) => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  // Legacy JSON shape: `orchard_balance`, `spendable_orchard_balance`, etc.
  const legacyTotalKeys = ["orchard_balance", "sapling_balance", "transparent_balance"];
  const legacySpendableKeys = [
    "spendable_orchard_balance",
    "spendable_sapling_balance",
    // transparent is spendable once confirmed; zingo lacks a spendable_transparent field.
    "transparent_balance",
  ];
  // Modern Rust-debug shape: `total_*_balance` (= confirmed + unconfirmed),
  // `confirmed_*_balance` (treated as spendable), `unconfirmed_*_balance`.
  const modernTotalKeys = ["total_orchard_balance", "total_sapling_balance", "total_transparent_balance"];
  const modernSpendableKeys = ["confirmed_orchard_balance", "confirmed_sapling_balance", "confirmed_transparent_balance"];

  let total = 0;
  let spendable = 0;
  for (const k of [...legacyTotalKeys, ...modernTotalKeys]) total += num(data?.[k]);
  for (const k of [...legacySpendableKeys, ...modernSpendableKeys]) spendable += num(data?.[k]);
  // Guard against versions that only expose spendable.
  if (total === 0 && spendable > 0) total = spendable;

  return {
    totalZatoshi: String(Math.round(total)),
    spendableZatoshi: String(Math.round(spendable)),
    unconfirmedZatoshi: String(Math.max(0, Math.round(total - spendable))),
    syncedAt: new Date().toISOString(),
  };
}

function pickMemo(t, address) {
  // zingo-cli v0.2 puts memos in `{ memos: [string, ...] }`. Older builds
  // and per-pool note shapes are checked as fallbacks.
  if (Array.isArray(t.memos)) {
    for (const m of t.memos) {
      if (typeof m === "string" && m.length > 0) return m;
    }
  }
  if (typeof t.memo === "string" && t.memo.length > 0) return t.memo;
  if (typeof t.message === "string" && t.message.length > 0) return t.message;
  if (typeof t.text === "string" && t.text.length > 0) return t.text;
  for (const pool of ["sapling_notes", "orchard_notes", "outgoing_metadata"]) {
    const notes = t[pool];
    if (!Array.isArray(notes)) continue;
    for (const n of notes) {
      if (n?.recipient_address && n.recipient_address !== address) continue;
      const memo = typeof n?.memo === "string" ? n.memo : null;
      if (memo && memo.length > 0) return memo;
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("cache-control", "no-store");

  if (req.method === "GET" && req.url === "/health") {
    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true, version: "0.1.0", zingo: ZINGO }));
    return;
  }

  if (req.method === "POST" && (req.url === "/memos" || req.url === "/transactions" || req.url === "/balance")) {
    if (!checkAuth(req)) {
      res.statusCode = 401;
      res.end(JSON.stringify({ error: "unauthorized" }));
      return;
    }
    const parsed = await readJsonBody(req, res);
    if (!parsed) return;

    if (req.url === "/memos") {
      const address = typeof parsed.address === "string" ? parsed.address.trim() : "";
      const limit = Math.min(Math.max(parseInt(parsed.limit ?? 50, 10) || 50, 1), 200);
      if (!address) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "address required" }));
        return;
      }
      try {
        const all = await cached(`memos:${address}`, () => listIncomingMemos(address, 200));
        res.statusCode = 200;
        res.end(JSON.stringify({ memos: all.slice(0, limit) }));
      } catch (err) {
        console.error(`[lightwallet-rpc] /memos failed:`, err);
        res.statusCode = 502;
        res.end(JSON.stringify({ error: `zingo-cli failed: ${err.message}` }));
      }
      return;
    }

    if (req.url === "/transactions") {
      const ufvk = typeof parsed.ufvk === "string" ? parsed.ufvk.trim() : "";
      if (!ufvk || !(ufvk.startsWith("uview") || ufvk.startsWith("uviewtest"))) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "ufvk required, must start with uview... or uviewtest..." }));
        return;
      }
      const birthday = parsed.birthday != null ? Number(parsed.birthday) : undefined;
      try {
        const result = await cached(`tx:${ufvk}`, () => syncUfvkTransactions(ufvk, { birthday }));
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error(`[lightwallet-rpc] /transactions failed:`, err);
        res.statusCode = 502;
        res.end(JSON.stringify({ error: `sync failed: ${err.message}` }));
      }
      return;
    }

    if (req.url === "/balance") {
      const ufvk = typeof parsed.ufvk === "string" ? parsed.ufvk.trim() : "";
      if (!ufvk || !(ufvk.startsWith("uview") || ufvk.startsWith("uviewtest"))) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "ufvk required, must start with uview... or uviewtest..." }));
        return;
      }
      const birthday = parsed.birthday != null ? Number(parsed.birthday) : undefined;
      try {
        const result = await cached(`bal:${ufvk}`, () => getUfvkBalance(ufvk, { birthday }));
        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error(`[lightwallet-rpc] /balance failed:`, err);
        res.statusCode = 502;
        res.end(JSON.stringify({ error: `balance failed: ${err.message}` }));
      }
      return;
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not found" }));
});

function checkAuth(req) {
  const provided = (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
  if (provided.length !== TOKEN_BUF.length) return false;
  try {
    return timingSafeEqual(Buffer.from(provided), TOKEN_BUF);
  } catch {
    return false;
  }
}

async function readJsonBody(req, res) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 4096) {
      res.statusCode = 413;
      res.end(JSON.stringify({ error: "body too large" }));
      return null;
    }
  }
  try {
    return body ? JSON.parse(body) : {};
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "invalid JSON" }));
    return null;
  }
}

// Re-run each cached entry's heavy sync on a timer, so request handlers keep
// hitting a warm cache instead of blocking. Only refreshes wallets that have
// been requested at least once (the first request per wallet warms the cache).
async function backgroundRefresh() {
  for (const [key, entry] of RESULT_CACHE) {
    try {
      entry.data = await entry.refresh();
      entry.at = Date.now();
    } catch (err) {
      console.error(`[lightwallet-rpc] bg refresh ${key} failed: ${err.message}`);
    }
  }
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[lightwallet-rpc] listening on 127.0.0.1:${PORT}`);
  console.log(`[lightwallet-rpc] front with nginx + certbot for TLS.`);
  console.log(`[lightwallet-rpc] token length: ${TOKEN.length} chars (kept on server only).`);
  if (BACKGROUND_SYNC) {
    setInterval(() => void backgroundRefresh(), REFRESH_INTERVAL_MS).unref();
    console.log(`[lightwallet-rpc] background sync every ${REFRESH_INTERVAL_MS}ms (set BACKGROUND_SYNC=0 to disable)`);
  }
});

process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
