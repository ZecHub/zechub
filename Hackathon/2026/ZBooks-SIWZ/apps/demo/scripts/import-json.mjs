// One-time importer: move apps/demo/data/zbooks.json into the Turso store.
// Idempotent (INSERT OR REPLACE). Run from apps/demo:  node scripts/import-json.mjs
import { createClient } from "@libsql/client/web";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Minimal .env.local loader (no dotenv dependency).
function loadEnv() {
  const p = join(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnv();

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error("TURSO_DATABASE_URL not set (checked .env.local). Aborting.");
  process.exit(1);
}
const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS team (address TEXT PRIMARY KEY, role TEXT NOT NULL, added_by TEXT, added_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS ufvks (id TEXT PRIMARY KEY, owner TEXT, label TEXT NOT NULL, ufvk TEXT NOT NULL, is_primary INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, sync_status TEXT NOT NULL DEFAULT 'idle', last_synced_at INTEGER, last_synced_block INTEGER, last_sync_error TEXT, last_tx_count INTEGER, last_chain_tip INTEGER, wallet_birthday INTEGER, birthday INTEGER)`,
  `CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY, ufvk_id TEXT NOT NULL, txid TEXT NOT NULL, direction TEXT NOT NULL, amount_zec REAL NOT NULL, counterparty TEXT, memo TEXT, timestamp INTEGER NOT NULL, block_height INTEGER, tag TEXT, notes TEXT, tagged_by TEXT, tagged_at INTEGER)`,
  `CREATE INDEX IF NOT EXISTS idx_tx_ufvk_txid ON transactions (ufvk_id, txid)`,
  `CREATE TABLE IF NOT EXISTS counterparties (address TEXT PRIMARY KEY, label TEXT NOT NULL, notes TEXT, added_by TEXT, added_at INTEGER NOT NULL, updated_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS payees (id TEXT PRIMARY KEY, label TEXT NOT NULL, address TEXT NOT NULL, notes TEXT, added_by TEXT, added_at INTEGER NOT NULL, archived INTEGER NOT NULL DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS payout_runs (id TEXT PRIMARY KEY, title TEXT NOT NULL, source_ufvk_id TEXT, created_by TEXT, created_at INTEGER NOT NULL, status TEXT NOT NULL, sent_at INTEGER, note TEXT)`,
  `CREATE TABLE IF NOT EXISTS payout_items (id TEXT PRIMARY KEY, run_id TEXT NOT NULL, payee_id TEXT, label TEXT NOT NULL, address TEXT NOT NULL, amount_zec REAL NOT NULL, memo TEXT, work_status TEXT NOT NULL, pay_status TEXT NOT NULL, txid TEXT, paid_at INTEGER, paid_block INTEGER, reconciled INTEGER)`,
];

const b = (v) => (v ? 1 : 0);
const nz = (v) => (v === undefined || v === null ? null : v);

async function main() {
  const path = process.env.DATA_PATH ?? join(process.cwd(), "data", "zbooks.json");
  if (!existsSync(path)) {
    console.error(`No data file at ${path}. Nothing to import.`);
    process.exit(1);
  }
  const d = JSON.parse(readFileSync(path, "utf8"));
  await client.batch(SCHEMA, "write");

  const stmts = [];
  for (const m of d.team ?? []) {
    stmts.push({ sql: "INSERT OR REPLACE INTO team (address, role, added_by, added_at) VALUES (?,?,?,?)", args: [m.address, m.role, nz(m.added_by), m.added_at] });
  }
  for (const k of d.ufvks ?? []) {
    stmts.push({ sql: "INSERT OR REPLACE INTO ufvks (id, owner, label, ufvk, is_primary, created_at, sync_status, last_synced_at, last_synced_block, last_sync_error, last_tx_count, last_chain_tip, wallet_birthday, birthday) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", args: [k.id, nz(k.owner), k.label, k.ufvk, b(k.primary), k.created_at, k.sync_status ?? "idle", nz(k.last_synced_at), nz(k.last_synced_block), nz(k.last_sync_error), nz(k.last_tx_count), nz(k.last_chain_tip), nz(k.wallet_birthday), nz(k.birthday)] });
  }
  for (const t of d.transactions ?? []) {
    stmts.push({ sql: "INSERT OR REPLACE INTO transactions (id, ufvk_id, txid, direction, amount_zec, counterparty, memo, timestamp, block_height, tag, notes, tagged_by, tagged_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", args: [t.id, t.ufvk_id, t.txid, t.direction, t.amount_zec, nz(t.counterparty), nz(t.memo), t.timestamp, nz(t.block_height), nz(t.tag), nz(t.notes), nz(t.tagged_by), nz(t.tagged_at)] });
  }
  for (const c of d.counterparties ?? []) {
    stmts.push({ sql: "INSERT OR REPLACE INTO counterparties (address, label, notes, added_by, added_at, updated_at) VALUES (?,?,?,?,?,?)", args: [c.address, c.label, nz(c.notes), nz(c.added_by), c.added_at, nz(c.updated_at)] });
  }
  for (const p of d.payees ?? []) {
    stmts.push({ sql: "INSERT OR REPLACE INTO payees (id, label, address, notes, added_by, added_at, archived) VALUES (?,?,?,?,?,?,?)", args: [p.id, p.label, p.address, nz(p.notes), nz(p.added_by), p.added_at, b(p.archived)] });
  }
  for (const r of d.payout_runs ?? []) {
    stmts.push({ sql: "INSERT OR REPLACE INTO payout_runs (id, title, source_ufvk_id, created_by, created_at, status, sent_at, note) VALUES (?,?,?,?,?,?,?,?)", args: [r.id, r.title, nz(r.source_ufvk_id), nz(r.created_by), r.created_at, r.status, nz(r.sent_at), nz(r.note)] });
  }
  for (const i of d.payout_items ?? []) {
    stmts.push({ sql: "INSERT OR REPLACE INTO payout_items (id, run_id, payee_id, label, address, amount_zec, memo, work_status, pay_status, txid, paid_at, paid_block, reconciled) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", args: [i.id, i.run_id, nz(i.payee_id), i.label, i.address, i.amount_zec, nz(i.memo), i.work_status, i.pay_status, nz(i.txid), nz(i.paid_at), nz(i.paid_block), i.reconciled ? 1 : null] });
  }

  if (stmts.length) await client.batch(stmts, "write");

  for (const tbl of ["team", "ufvks", "transactions", "counterparties", "payees", "payout_runs", "payout_items"]) {
    const rs = await client.execute(`SELECT COUNT(*) AS n FROM ${tbl}`);
    console.log(`${tbl}: ${rs.rows[0].n}`);
  }
  console.log("Import complete.");
}

main().catch((e) => { console.error(e); process.exit(1); });
