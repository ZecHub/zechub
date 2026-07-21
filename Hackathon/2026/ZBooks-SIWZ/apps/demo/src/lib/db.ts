import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { createClient, type Client, type Row } from "@libsql/client/web";
import { isShieldedAddress } from "@siwz/core";
import { decryptUfvk, encryptUfvk, isEncrypted } from "./crypto-at-rest";
import {
  CATEGORY_LABEL,
  type Category,
  type Counterparty,
  type PayStatus,
  type Payee,
  type PayoutLineItem,
  type PayoutRun,
  type PayoutRunApproval,
  type PayoutRunStatus,
  type Role,
  type SyncStatus,
  type TeamMember,
  type Transaction,
  type Ufvk,
  type WorkStatus,
  type WorkspaceSettings,
} from "./types";

// libSQL (Turso) store. Async, SQL-backed, so it persists on Vercel's
// ephemeral filesystem and gives real per-row writes instead of the old
// read-modify-write-the-whole-file race. Types live in ./types so client
// components can import them without pulling this server module into the bundle.
export { CATEGORY_LABEL };
export type {
  Category,
  Counterparty,
  PayStatus,
  Payee,
  PayoutLineItem,
  PayoutRun,
  PayoutRunApproval,
  PayoutRunStatus,
  Role,
  SyncStatus,
  TeamMember,
  Transaction,
  Ufvk,
  WorkStatus,
  WorkspaceSettings,
};

let _client: Client | undefined;
let _ready: Promise<void> | undefined;

function rawClient(): Client {
  if (_client) return _client;
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) throw new Error("TURSO_DATABASE_URL is not set");
  _client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  return _client;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS team (address TEXT PRIMARY KEY, role TEXT NOT NULL, added_by TEXT, added_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS ufvks (id TEXT PRIMARY KEY, owner TEXT, label TEXT NOT NULL, ufvk TEXT NOT NULL, ufvk_hash TEXT, is_primary INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, sync_status TEXT NOT NULL DEFAULT 'idle', last_synced_at INTEGER, last_synced_block INTEGER, last_sync_error TEXT, last_tx_count INTEGER, last_chain_tip INTEGER, wallet_birthday INTEGER, birthday INTEGER)`,
  `CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY, ufvk_id TEXT NOT NULL, txid TEXT NOT NULL, direction TEXT NOT NULL, amount_zec REAL NOT NULL, counterparty TEXT, memo TEXT, timestamp INTEGER NOT NULL, block_height INTEGER, tag TEXT, notes TEXT, tagged_by TEXT, tagged_at INTEGER)`,
  `CREATE INDEX IF NOT EXISTS idx_tx_ufvk_txid ON transactions (ufvk_id, txid)`,
  `CREATE TABLE IF NOT EXISTS counterparties (address TEXT PRIMARY KEY, label TEXT NOT NULL, notes TEXT, added_by TEXT, added_at INTEGER NOT NULL, updated_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS payees (id TEXT PRIMARY KEY, label TEXT NOT NULL, address TEXT NOT NULL, notes TEXT, added_by TEXT, added_at INTEGER NOT NULL, archived INTEGER NOT NULL DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS payout_runs (id TEXT PRIMARY KEY, title TEXT NOT NULL, source_ufvk_id TEXT, created_by TEXT, created_at INTEGER NOT NULL, status TEXT NOT NULL, sent_at INTEGER, note TEXT, required_approvals INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS payout_items (id TEXT PRIMARY KEY, run_id TEXT NOT NULL, payee_id TEXT, label TEXT NOT NULL, address TEXT NOT NULL, amount_zec REAL NOT NULL, memo TEXT, work_status TEXT NOT NULL, pay_status TEXT NOT NULL, txid TEXT, paid_at INTEGER, paid_block INTEGER, reconciled INTEGER, external_ref TEXT)`,
  `CREATE TABLE IF NOT EXISTS payout_run_approvals (id TEXT PRIMARY KEY, run_id TEXT NOT NULL, approver_address TEXT NOT NULL, comment TEXT, payload_hash TEXT NOT NULL, signature TEXT NOT NULL, approved_at INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS idx_approvals_run ON payout_run_approvals (run_id)`,
  `CREATE TABLE IF NOT EXISTS workspace_settings (id INTEGER PRIMARY KEY CHECK (id = 1), min_approvals INTEGER NOT NULL DEFAULT 1, approver_addresses TEXT NOT NULL DEFAULT '[]', updated_at INTEGER, updated_by TEXT)`,
  `INSERT OR IGNORE INTO workspace_settings (id, min_approvals, approver_addresses) VALUES (1, 1, '[]')`,
  `CREATE TABLE IF NOT EXISTS fiat_prices (date TEXT PRIMARY KEY, usd REAL NOT NULL, fetched_at INTEGER NOT NULL)`,
];

// Lazily create the client and run the (idempotent) schema + startup
// cleanups once per process.
async function db(): Promise<Client> {
  const c = rawClient();
  if (!_ready) {
    _ready = c
      .batch(SCHEMA, "write")
      .then(() => migrateUfvksToEncrypted(c))
      .then(() => migrateAddExternalRefColumn(c))
      .then(() => migrateAddRequiredApprovalsColumn(c))
      .then(() => migrateBackfillUfvkHash(c))
      .then(() => resetStaleSync(c));
  }
  await _ready;
  return c;
}

// One-time-per-row migration: encrypt any UFVKs that are still stored as
// plaintext from before encryption-at-rest landed. Idempotent because
// `encryptUfvk` short-circuits on already-encrypted input.
async function migrateUfvksToEncrypted(c: Client): Promise<void> {
  try {
    const rs = await c.execute("SELECT id, ufvk FROM ufvks");
    const work = rs.rows
      .filter((r) => !isEncrypted(String(r.ufvk)))
      .map((r) => ({ id: String(r.id), ufvk: String(r.ufvk) }));
    if (work.length === 0) return;
    const statements = work.map((r) => ({
      sql: "UPDATE ufvks SET ufvk = ? WHERE id = ?",
      args: [encryptUfvk(r.ufvk), r.id] as (string | number | null)[],
    }));
    await c.batch(statements, "write");
    console.log(`[db] encrypted ${work.length} UFVK row(s) at rest`);
  } catch (err) {
    // Don't block startup: future writes still encrypt, future reads still
    // handle both forms via decryptUfvk.
    console.error("[db] UFVK encryption migration failed:", err);
  }
}

// Schema-evolution helper: adds external_ref to payout_items if the column
// is missing (Turso/libSQL has no IF NOT EXISTS for ADD COLUMN, so we attempt
// and swallow the "duplicate column" error). Then creates the lookup index.
// The index can't live in the initial SCHEMA batch because that batch runs
// before this migration on first deploys with a pre-existing payout_items
// table that lacks the column.
async function migrateAddExternalRefColumn(c: Client): Promise<void> {
  try {
    await c.execute("ALTER TABLE payout_items ADD COLUMN external_ref TEXT");
    console.log("[db] added external_ref column to payout_items");
  } catch {
    // Column already exists. Ignore.
  }
  try {
    await c.execute("CREATE INDEX IF NOT EXISTS idx_payout_items_external_ref ON payout_items (external_ref)");
  } catch (err) {
    console.error("[db] failed to create external_ref index:", err);
  }
}

// Add required_approvals to existing payout_runs deployments.
async function migrateAddRequiredApprovalsColumn(c: Client): Promise<void> {
  try {
    await c.execute("ALTER TABLE payout_runs ADD COLUMN required_approvals INTEGER NOT NULL DEFAULT 1");
    console.log("[db] added required_approvals column to payout_runs");
  } catch {
    // Already exists.
  }
}

// Backfill ufvk_hash for rows added before the dedup column existed.
// Index creation lives here so it runs AFTER the column is added.
async function migrateBackfillUfvkHash(c: Client): Promise<void> {
  try {
    await c.execute("ALTER TABLE ufvks ADD COLUMN ufvk_hash TEXT");
    console.log("[db] added ufvk_hash column to ufvks");
  } catch {
    // Column already exists.
  }
  try {
    const rs = await c.execute("SELECT id, ufvk FROM ufvks WHERE ufvk_hash IS NULL");
    if (rs.rows.length > 0) {
      const work = rs.rows.map((r) => ({
        id: String(r.id),
        hash: ufvkHash(decryptUfvk(String(r.ufvk))),
      }));
      await c.batch(
        work.map((w) => ({
          sql: "UPDATE ufvks SET ufvk_hash = ? WHERE id = ?",
          args: [w.hash, w.id] as (string | number | null)[],
        })),
        "write",
      );
      console.log(`[db] backfilled ufvk_hash for ${work.length} row(s)`);
    }
  } catch (err) {
    console.error("[db] ufvk_hash backfill failed:", err);
  }
  try {
    await c.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_ufvks_hash ON ufvks (ufvk_hash) WHERE ufvk_hash IS NOT NULL");
  } catch (err) {
    // Most likely cause: a pre-existing duplicate UFVK pair from before the dedup check landed.
    // App-level addKey() still rejects new duplicates; existing pairs stay as data.
    console.warn("[db] could not create unique index on ufvks.ufvk_hash:", err);
  }
}

function ufvkHash(plaintext: string): string {
  return createHash("sha256").update(plaintext.trim()).digest("hex");
}

// Anything still tagged 'syncing' at process startup is left over from a
// process that died mid-sync (a redeploy is the common cause). The in-memory
// inFlight set in sync.ts can't see it, so without this reset the row sits
// permanently stuck. Clear it back to 'idle' so the user can retry.
async function resetStaleSync(c: Client): Promise<void> {
  try {
    const rs = await c.execute({
      sql: "UPDATE ufvks SET sync_status = 'idle', last_sync_error = ? WHERE sync_status = 'syncing'",
      args: ["Previous sync was interrupted by a process restart. Retry to sync again."],
    });
    if (rs.rowsAffected > 0) {
      console.log(`[db] reset ${rs.rowsAffected} stale 'syncing' row(s) at startup`);
    }
  } catch (err) {
    console.error("[db] stale-sync reset failed:", err);
  }
}

// ---- value coercion ---------------------------------------------------------

function n(v: Row[string]): number | undefined {
  return v === null || v === undefined ? undefined : Number(v);
}
function s(v: Row[string]): string | undefined {
  return v === null || v === undefined ? undefined : String(v);
}

function toUfvk(r: Row): Ufvk {
  // decryptUfvk returns its input unchanged if the stored value is legacy
  // plaintext (e.g. between schema-create and the migration completing).
  const ufvk = decryptUfvk(String(r.ufvk));
  return {
    id: String(r.id),
    owner: String(r.owner ?? ""),
    label: String(r.label),
    ufvk,
    primary: Number(r.is_primary) === 1,
    created_at: Number(r.created_at),
    sync_status: (r.sync_status as SyncStatus) ?? "idle",
    last_synced_at: n(r.last_synced_at),
    last_synced_block: n(r.last_synced_block),
    last_sync_error: s(r.last_sync_error),
    last_tx_count: n(r.last_tx_count),
    last_chain_tip: n(r.last_chain_tip),
    wallet_birthday: n(r.wallet_birthday),
    birthday: n(r.birthday),
  };
}

function toTx(r: Row): Transaction {
  return {
    id: String(r.id),
    ufvk_id: String(r.ufvk_id),
    txid: String(r.txid),
    direction: r.direction === "out" ? "out" : "in",
    amount_zec: Number(r.amount_zec),
    counterparty: s(r.counterparty),
    memo: s(r.memo),
    timestamp: Number(r.timestamp),
    block_height: n(r.block_height),
    tag: (s(r.tag) as Category | undefined),
    notes: s(r.notes),
    tagged_by: s(r.tagged_by),
    tagged_at: n(r.tagged_at),
  };
}

function toCounterparty(r: Row): Counterparty {
  return {
    address: String(r.address),
    label: String(r.label),
    notes: s(r.notes),
    added_by: String(r.added_by ?? ""),
    added_at: Number(r.added_at),
    updated_at: n(r.updated_at),
  };
}

function toPayee(r: Row): Payee {
  return {
    id: String(r.id),
    label: String(r.label),
    address: String(r.address),
    notes: s(r.notes),
    added_by: String(r.added_by ?? ""),
    added_at: Number(r.added_at),
    archived: Number(r.archived) === 1 ? true : undefined,
  };
}

function toRun(r: Row): PayoutRun {
  return {
    id: String(r.id),
    title: String(r.title),
    source_ufvk_id: s(r.source_ufvk_id),
    created_by: String(r.created_by ?? ""),
    created_at: Number(r.created_at),
    status: r.status as PayoutRunStatus,
    sent_at: n(r.sent_at),
    note: s(r.note),
    required_approvals: Number(r.required_approvals ?? 1),
  };
}

function toApproval(r: Row): PayoutRunApproval {
  return {
    id: String(r.id),
    run_id: String(r.run_id),
    approver_address: String(r.approver_address),
    comment: s(r.comment),
    payload_hash: String(r.payload_hash),
    signature: String(r.signature),
    approved_at: Number(r.approved_at),
  };
}

function toItem(r: Row): PayoutLineItem {
  return {
    id: String(r.id),
    run_id: String(r.run_id),
    payee_id: s(r.payee_id),
    label: String(r.label),
    address: String(r.address),
    amount_zec: Number(r.amount_zec),
    memo: s(r.memo),
    work_status: r.work_status as WorkStatus,
    pay_status: r.pay_status as PayStatus,
    txid: s(r.txid),
    paid_at: n(r.paid_at),
    paid_block: n(r.paid_block),
    reconciled: Number(r.reconciled) === 1 ? true : undefined,
    external_ref: s(r.external_ref),
  };
}

function toMember(r: Row): TeamMember {
  return {
    address: String(r.address),
    role: r.role as Role,
    added_by: String(r.added_by ?? ""),
    added_at: Number(r.added_at),
  };
}

// ---- Team -------------------------------------------------------------------

const ADMIN_ALLOWLIST = (process.env.SIWZ_ADMIN_ADDRESSES ?? "")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);

export async function ensureMember(address: string): Promise<Role> {
  const c = await db();
  const found = await c.execute({ sql: "SELECT role FROM team WHERE address = ?", args: [address] });
  if (found.rows.length) return found.rows[0].role as Role;

  let role: Role;
  let addedBy: string;
  if (ADMIN_ALLOWLIST.includes(address)) {
    role = "admin";
    addedBy = "allowlist";
  } else {
    const count = await c.execute("SELECT COUNT(*) AS num FROM team");
    const num = Number(count.rows[0].num);
    if (ADMIN_ALLOWLIST.length === 0 && num === 0) {
      role = "admin";
      addedBy = "self";
    } else {
      role = "viewer";
      addedBy = "auto";
    }
  }

  await c.execute({
    sql: "INSERT INTO team (address, role, added_by, added_at) VALUES (?, ?, ?, ?) ON CONFLICT(address) DO NOTHING",
    args: [address, role, addedBy, Date.now()],
  });
  // A concurrent insert may have won; return whatever actually persisted.
  const final = await c.execute({ sql: "SELECT role FROM team WHERE address = ?", args: [address] });
  return (final.rows[0]?.role as Role) ?? role;
}

export async function getMember(address: string): Promise<TeamMember | undefined> {
  const c = await db();
  const rs = await c.execute({ sql: "SELECT * FROM team WHERE address = ?", args: [address] });
  return rs.rows[0] ? toMember(rs.rows[0]) : undefined;
}

export async function listMembers(): Promise<TeamMember[]> {
  const c = await db();
  const rs = await c.execute("SELECT * FROM team ORDER BY added_at ASC");
  return rs.rows.map(toMember);
}

export async function setRole(address: string, role: Role): Promise<void> {
  const c = await db();
  const rs = await c.execute({ sql: "UPDATE team SET role = ? WHERE address = ?", args: [role, address] });
  if (rs.rowsAffected === 0) throw new Error(`Address not in team: ${address}`);
}

export async function addTeamMember(address: string, role: Role, addedBy: string): Promise<TeamMember> {
  const c = await db();
  const exists = await c.execute({ sql: "SELECT 1 FROM team WHERE address = ?", args: [address] });
  if (exists.rows.length) throw new Error("Address already on team");
  const m: TeamMember = { address, role, added_by: addedBy, added_at: Date.now() };
  await c.execute({
    sql: "INSERT INTO team (address, role, added_by, added_at) VALUES (?, ?, ?, ?)",
    args: [m.address, m.role, m.added_by, m.added_at],
  });
  return m;
}

export async function removeMember(address: string): Promise<void> {
  const c = await db();
  await c.execute({ sql: "DELETE FROM team WHERE address = ?", args: [address] });
}

// ---- Viewing keys -----------------------------------------------------------

export async function listKeys(): Promise<Ufvk[]> {
  const c = await db();
  const rs = await c.execute("SELECT * FROM ufvks ORDER BY created_at ASC");
  return rs.rows.map(toUfvk);
}

export async function addKey(input: {
  owner: string;
  label: string;
  ufvk: string;
  birthday?: number;
}): Promise<Ufvk> {
  const c = await db();
  const trimmed = input.ufvk.trim();
  const hash = ufvkHash(trimmed);
  const dup = await c.execute({
    sql: "SELECT label FROM ufvks WHERE ufvk_hash = ?",
    args: [hash],
  });
  if (dup.rows[0]) {
    throw new Error(`This viewing key is already on the team as "${String(dup.rows[0].label)}".`);
  }
  const count = await c.execute("SELECT COUNT(*) AS num FROM ufvks");
  const isFirst = Number(count.rows[0].num) === 0;
  const key: Ufvk = {
    id: randomUUID(),
    owner: input.owner,
    label: input.label.trim() || "Untitled key",
    ufvk: trimmed,
    primary: isFirst,
    created_at: Date.now(),
    sync_status: "idle",
    ...(Number.isFinite(input.birthday) ? { birthday: input.birthday } : {}),
  };
  await c.execute({
    sql: "INSERT INTO ufvks (id, owner, label, ufvk, ufvk_hash, is_primary, created_at, sync_status, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, 'idle', ?)",
    args: [key.id, key.owner, key.label, encryptUfvk(key.ufvk), hash, isFirst ? 1 : 0, key.created_at, key.birthday ?? null],
  });
  return key;
}

export async function getKey(id: string): Promise<Ufvk | undefined> {
  const c = await db();
  const rs = await c.execute({ sql: "SELECT * FROM ufvks WHERE id = ?", args: [id] });
  return rs.rows[0] ? toUfvk(rs.rows[0]) : undefined;
}

const SYNC_COLUMNS: Record<string, string> = {
  sync_status: "sync_status",
  last_synced_at: "last_synced_at",
  last_synced_block: "last_synced_block",
  last_sync_error: "last_sync_error",
  last_tx_count: "last_tx_count",
  last_chain_tip: "last_chain_tip",
  wallet_birthday: "wallet_birthday",
};

export async function updateKeySyncStatus(
  id: string,
  patch: Partial<Pick<Ufvk, "sync_status" | "last_synced_at" | "last_synced_block" | "last_sync_error" | "last_tx_count" | "last_chain_tip" | "wallet_birthday">>,
): Promise<void> {
  const sets: string[] = [];
  const args: (string | number | null)[] = [];
  for (const k of Object.keys(patch) as (keyof typeof patch)[]) {
    const col = SYNC_COLUMNS[k];
    if (!col) continue;
    sets.push(`${col} = ?`);
    const v = patch[k];
    args.push(v === undefined ? null : (v as string | number));
  }
  if (sets.length === 0) return;
  args.push(id);
  const c = await db();
  await c.execute({ sql: `UPDATE ufvks SET ${sets.join(", ")} WHERE id = ?`, args });
}

export async function removeKey(id: string): Promise<void> {
  const c = await db();
  await c.batch(
    [
      { sql: "DELETE FROM transactions WHERE ufvk_id = ?", args: [id] },
      { sql: "DELETE FROM ufvks WHERE id = ?", args: [id] },
    ],
    "write",
  );
}

export async function setPrimaryKey(id: string): Promise<void> {
  const c = await db();
  await c.execute({ sql: "UPDATE ufvks SET is_primary = CASE WHEN id = ? THEN 1 ELSE 0 END", args: [id] });
}

export async function updateKeyLabel(id: string, label: string): Promise<void> {
  const trimmed = label.trim();
  if (!trimmed) return;
  const c = await db();
  await c.execute({ sql: "UPDATE ufvks SET label = ? WHERE id = ?", args: [trimmed.slice(0, 80), id] });
}

// ---- Transactions -----------------------------------------------------------

export async function listTransactions(): Promise<Transaction[]> {
  const c = await db();
  const rs = await c.execute("SELECT * FROM transactions ORDER BY timestamp DESC");
  return rs.rows.map(toTx);
}

/** Paginated read for /transactions and /audit. Returns the slice + the
 *  total row count so the UI can render "X of N". `taggedOnly` flips the
 *  query for /audit, which is just /transactions filtered to rows with a
 *  tagged_at timestamp. */
export async function listTransactionsPage(opts: {
  limit: number;
  offset: number;
  taggedOnly?: boolean;
}): Promise<{ items: Transaction[]; total: number }> {
  const c = await db();
  const where = opts.taggedOnly ? "WHERE tagged_at IS NOT NULL" : "";
  const orderBy = opts.taggedOnly ? "tagged_at" : "timestamp";
  const [count, page] = await c.batch(
    [
      { sql: `SELECT COUNT(*) AS n FROM transactions ${where}`, args: [] },
      {
        sql: `SELECT * FROM transactions ${where} ORDER BY ${orderBy} DESC LIMIT ? OFFSET ?`,
        args: [opts.limit, opts.offset],
      },
    ],
    "read",
  );
  return {
    total: Number(count.rows[0]?.n ?? 0),
    items: page.rows.map(toTx),
  };
}

export async function tagTransaction(id: string, input: {
  tag?: Category;
  notes?: string;
  taggedBy: string;
}): Promise<Transaction> {
  const c = await db();
  const sets = ["tagged_by = ?", "tagged_at = ?"];
  const args: (string | number | null)[] = [input.taggedBy, Date.now()];
  if (input.tag !== undefined) {
    sets.unshift("tag = ?");
    args.unshift(input.tag);
  }
  if (input.notes !== undefined) {
    sets.unshift("notes = ?");
    args.unshift(input.notes);
  }
  args.push(id);
  const rs = await c.execute({ sql: `UPDATE transactions SET ${sets.join(", ")} WHERE id = ? RETURNING *`, args });
  if (!rs.rows[0]) throw new Error(`No such transaction: ${id}`);
  return toTx(rs.rows[0]);
}

// Existing rows keep their tag / notes / id so a re-sync doesn't clobber user-applied categorisation.
export async function upsertTransactions(
  ufvkId: string,
  incoming: Array<{
    txid: string;
    direction: "in" | "out";
    amount_zec: number;
    counterparty?: string;
    memo?: string;
    timestamp: number;
    block_height?: number;
  }>,
): Promise<{ inserted: number; updated: number }> {
  const c = await db();
  let inserted = 0;
  let updated = 0;
  for (const tx of incoming) {
    const existing = await c.execute({
      sql: "SELECT id FROM transactions WHERE ufvk_id = ? AND txid = ?",
      args: [ufvkId, tx.txid],
    });
    if (existing.rows.length) {
      await c.execute({
        sql: "UPDATE transactions SET direction = ?, amount_zec = ?, timestamp = ?, counterparty = COALESCE(?, counterparty), memo = COALESCE(?, memo), block_height = COALESCE(?, block_height) WHERE id = ?",
        args: [
          tx.direction,
          tx.amount_zec,
          tx.timestamp,
          tx.counterparty ?? null,
          tx.memo ?? null,
          tx.block_height ?? null,
          String(existing.rows[0].id),
        ],
      });
      updated++;
    } else {
      await c.execute({
        sql: "INSERT INTO transactions (id, ufvk_id, txid, direction, amount_zec, counterparty, memo, timestamp, block_height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [
          randomUUID(),
          ufvkId,
          tx.txid,
          tx.direction,
          tx.amount_zec,
          tx.counterparty ?? null,
          tx.memo ?? null,
          tx.timestamp,
          tx.block_height ?? null,
        ],
      });
      inserted++;
    }
  }
  return { inserted, updated };
}

// ---- Counterparties ---------------------------------------------------------

export async function listCounterparties(): Promise<Counterparty[]> {
  const c = await db();
  const rs = await c.execute("SELECT * FROM counterparties ORDER BY label COLLATE NOCASE ASC");
  return rs.rows.map(toCounterparty);
}

export async function getCounterparty(address: string): Promise<Counterparty | undefined> {
  const c = await db();
  const rs = await c.execute({ sql: "SELECT * FROM counterparties WHERE address = ?", args: [address] });
  return rs.rows[0] ? toCounterparty(rs.rows[0]) : undefined;
}

// Empty label removes the mapping.
export async function upsertCounterparty(input: {
  address: string;
  label: string;
  notes?: string;
  by: string;
}): Promise<Counterparty | null> {
  const address = input.address.trim();
  const label = input.label.trim();
  if (!address) throw new Error("address required");
  const c = await db();

  if (!label) {
    await c.execute({ sql: "DELETE FROM counterparties WHERE address = ?", args: [address] });
    return null;
  }

  const existing = await c.execute({ sql: "SELECT * FROM counterparties WHERE address = ?", args: [address] });
  if (existing.rows.length) {
    const notesProvided = input.notes !== undefined;
    await c.execute({
      sql: `UPDATE counterparties SET label = ?, updated_at = ?${notesProvided ? ", notes = ?" : ""} WHERE address = ?`,
      args: notesProvided
        ? [label, Date.now(), input.notes!.trim() || null, address]
        : [label, Date.now(), address],
    });
  } else {
    await c.execute({
      sql: "INSERT INTO counterparties (address, label, notes, added_by, added_at) VALUES (?, ?, ?, ?, ?)",
      args: [address, label, input.notes?.trim() || null, input.by, Date.now()],
    });
  }
  const rs = await c.execute({ sql: "SELECT * FROM counterparties WHERE address = ?", args: [address] });
  return toCounterparty(rs.rows[0]);
}

export async function counterpartyLabelMap(): Promise<Map<string, string>> {
  const c = await db();
  const rs = await c.execute("SELECT address, label FROM counterparties");
  return new Map(rs.rows.map((r) => [String(r.address), String(r.label)]));
}

// ---- Payees -----------------------------------------------------------------

export async function listPayees(includeArchived = false): Promise<Payee[]> {
  const c = await db();
  const rs = await c.execute(
    includeArchived
      ? "SELECT * FROM payees ORDER BY label COLLATE NOCASE ASC"
      : "SELECT * FROM payees WHERE archived = 0 ORDER BY label COLLATE NOCASE ASC",
  );
  return rs.rows.map(toPayee);
}

export async function getPayee(id: string): Promise<Payee | undefined> {
  const c = await db();
  const rs = await c.execute({ sql: "SELECT * FROM payees WHERE id = ?", args: [id] });
  return rs.rows[0] ? toPayee(rs.rows[0]) : undefined;
}

export async function addPayee(input: {
  label: string;
  address: string;
  notes?: string;
  by: string;
}): Promise<Payee> {
  const address = input.address.trim();
  const label = input.label.trim();
  if (!address) throw new Error("address required");
  if (!label) throw new Error("label required");
  const c = await db();
  const dup = await c.execute({ sql: "SELECT 1 FROM payees WHERE address = ? AND archived = 0", args: [address] });
  if (dup.rows.length) throw new Error("A payee with that address already exists");
  const payee: Payee = {
    id: randomUUID(),
    label,
    address,
    notes: input.notes?.trim() || undefined,
    added_by: input.by,
    added_at: Date.now(),
  };
  await c.execute({
    sql: "INSERT INTO payees (id, label, address, notes, added_by, added_at, archived) VALUES (?, ?, ?, ?, ?, ?, 0)",
    args: [payee.id, payee.label, payee.address, payee.notes ?? null, payee.added_by, payee.added_at],
  });
  return payee;
}

export async function updatePayee(
  id: string,
  patch: Partial<Pick<Payee, "label" | "address" | "notes" | "archived">>,
): Promise<Payee> {
  const c = await db();
  const cur = await c.execute({ sql: "SELECT * FROM payees WHERE id = ?", args: [id] });
  if (!cur.rows[0]) throw new Error(`No such payee: ${id}`);
  const p = toPayee(cur.rows[0]);
  if (patch.label !== undefined) p.label = patch.label.trim() || p.label;
  if (patch.address !== undefined) p.address = patch.address.trim() || p.address;
  if (patch.notes !== undefined) p.notes = patch.notes.trim() || undefined;
  if (patch.archived !== undefined) p.archived = patch.archived;
  await c.execute({
    sql: "UPDATE payees SET label = ?, address = ?, notes = ?, archived = ? WHERE id = ?",
    args: [p.label, p.address, p.notes ?? null, p.archived ? 1 : 0, id],
  });
  return p;
}

// ---- Payout runs ------------------------------------------------------------

export interface RunWithItems extends PayoutRun {
  items: PayoutLineItem[];
}

export async function listRuns(): Promise<RunWithItems[]> {
  const c = await db();
  const [runs, items] = await Promise.all([
    c.execute("SELECT * FROM payout_runs ORDER BY created_at DESC"),
    c.execute("SELECT * FROM payout_items"),
  ]);
  const byRun = new Map<string, PayoutLineItem[]>();
  for (const r of items.rows) {
    const item = toItem(r);
    (byRun.get(item.run_id) ?? byRun.set(item.run_id, []).get(item.run_id)!).push(item);
  }
  return runs.rows.map((r) => ({ ...toRun(r), items: byRun.get(String(r.id)) ?? [] }));
}

export async function getRun(id: string): Promise<RunWithItems | undefined> {
  const c = await db();
  const run = await c.execute({ sql: "SELECT * FROM payout_runs WHERE id = ?", args: [id] });
  if (!run.rows[0]) return undefined;
  const items = await c.execute({ sql: "SELECT * FROM payout_items WHERE run_id = ?", args: [id] });
  return { ...toRun(run.rows[0]), items: items.rows.map(toItem) };
}

export async function createRun(input: {
  title: string;
  sourceUfvkId?: string;
  note?: string;
  by: string;
}): Promise<PayoutRun> {
  const c = await db();
  // Snapshot at creation so later policy edits don't retroactively shift older runs.
  const settings = await getWorkspaceSettings();
  const required = Math.max(1, Math.min(settings.min_approvals, Math.max(1, settings.approver_addresses.length || 1)));
  const run: PayoutRun = {
    id: randomUUID(),
    title: input.title.trim() || "Untitled run",
    source_ufvk_id: input.sourceUfvkId,
    created_by: input.by,
    created_at: Date.now(),
    status: "draft",
    note: input.note?.trim() || undefined,
    required_approvals: required,
  };
  await c.execute({
    sql: "INSERT INTO payout_runs (id, title, source_ufvk_id, created_by, created_at, status, note, required_approvals) VALUES (?, ?, ?, ?, ?, 'draft', ?, ?)",
    args: [run.id, run.title, run.source_ufvk_id ?? null, run.created_by, run.created_at, run.note ?? null, run.required_approvals],
  });
  return run;
}

export async function updateRun(
  id: string,
  patch: Partial<Pick<PayoutRun, "title" | "source_ufvk_id" | "note" | "status" | "sent_at">>,
): Promise<PayoutRun> {
  const c = await db();
  const cur = await c.execute({ sql: "SELECT * FROM payout_runs WHERE id = ?", args: [id] });
  if (!cur.rows[0]) throw new Error(`No such run: ${id}`);
  const r = toRun(cur.rows[0]);
  if (patch.title !== undefined) r.title = patch.title;
  if (patch.source_ufvk_id !== undefined) r.source_ufvk_id = patch.source_ufvk_id;
  if (patch.note !== undefined) r.note = patch.note;
  if (patch.status !== undefined) r.status = patch.status;
  if (patch.sent_at !== undefined) r.sent_at = patch.sent_at;
  await c.execute({
    sql: "UPDATE payout_runs SET title = ?, source_ufvk_id = ?, note = ?, status = ?, sent_at = ? WHERE id = ?",
    args: [r.title, r.source_ufvk_id ?? null, r.note ?? null, r.status, r.sent_at ?? null, id],
  });
  return r;
}

export async function setRunStatus(id: string, status: PayoutRunStatus): Promise<PayoutRun> {
  const patch: Partial<PayoutRun> = { status };
  if (status === "sent") patch.sent_at = Date.now();
  return updateRun(id, patch);
}

export async function removeRun(id: string): Promise<void> {
  const c = await db();
  await c.batch(
    [
      { sql: "DELETE FROM payout_items WHERE run_id = ?", args: [id] },
      { sql: "DELETE FROM payout_run_approvals WHERE run_id = ?", args: [id] },
      { sql: "DELETE FROM payout_runs WHERE id = ?", args: [id] },
    ],
    "write",
  );
}

// ---- Approvals --------------------------------------------------------------

// Hash binds approvals to the exact payable set. Editing an item changes
// the hash so old approvals don't count toward the threshold any more.
export function canonicalRunPayload(run: RunWithItems): string {
  const payable = run.items
    .filter((i) => i.work_status === "completed" && i.pay_status !== "paid")
    .map((i) => ({ a: i.address, z: Math.round(i.amount_zec * 1e8), m: i.memo ?? "" }))
    .sort((x, y) => (x.a < y.a ? -1 : x.a > y.a ? 1 : x.z - y.z || (x.m < y.m ? -1 : x.m > y.m ? 1 : 0)));
  return JSON.stringify({
    run_id: run.id,
    source_ufvk_id: run.source_ufvk_id ?? "",
    payable,
  });
}

export function runPayloadHash(run: RunWithItems): string {
  return createHash("sha256").update(canonicalRunPayload(run)).digest("hex");
}

function approvalSecret(): Buffer {
  const s = process.env.NEXTAUTH_SECRET;
  if (!s || s.length < 16) throw new Error("NEXTAUTH_SECRET must be set (>= 16 chars) for approvals");
  return Buffer.from(s, "utf8");
}

export function signApproval(runId: string, approverAddress: string, payloadHash: string): string {
  return createHmac("sha256", approvalSecret())
    .update(`${runId}:${approverAddress}:${payloadHash}`)
    .digest("hex");
}

export function verifyApprovalSignature(a: PayoutRunApproval): boolean {
  const expected = signApproval(a.run_id, a.approver_address, a.payload_hash);
  const ax = Buffer.from(a.signature, "hex");
  const bx = Buffer.from(expected, "hex");
  if (ax.length !== bx.length) return false;
  return timingSafeEqual(ax, bx);
}

export async function listRunApprovals(runId: string): Promise<PayoutRunApproval[]> {
  const c = await db();
  const rs = await c.execute({
    sql: "SELECT * FROM payout_run_approvals WHERE run_id = ? ORDER BY approved_at ASC",
    args: [runId],
  });
  return rs.rows.map(toApproval);
}

export async function addRunApproval(input: {
  runId: string;
  approverAddress: string;
  comment?: string;
  payloadHash: string;
}): Promise<PayoutRunApproval> {
  const c = await db();
  const dup = await c.execute({
    sql: "SELECT 1 FROM payout_run_approvals WHERE run_id = ? AND approver_address = ? AND payload_hash = ?",
    args: [input.runId, input.approverAddress, input.payloadHash],
  });
  if (dup.rows.length) throw new Error("Already approved at this payload");
  const a: PayoutRunApproval = {
    id: randomUUID(),
    run_id: input.runId,
    approver_address: input.approverAddress,
    comment: input.comment?.trim() || undefined,
    payload_hash: input.payloadHash,
    signature: signApproval(input.runId, input.approverAddress, input.payloadHash),
    approved_at: Date.now(),
  };
  await c.execute({
    sql: "INSERT INTO payout_run_approvals (id, run_id, approver_address, comment, payload_hash, signature, approved_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: [a.id, a.run_id, a.approver_address, a.comment ?? null, a.payload_hash, a.signature, a.approved_at],
  });
  return a;
}

export async function revokeRunApproval(runId: string, approverAddress: string): Promise<void> {
  const c = await db();
  await c.execute({
    sql: "DELETE FROM payout_run_approvals WHERE run_id = ? AND approver_address = ?",
    args: [runId, approverAddress],
  });
}

// ---- Workspace settings -----------------------------------------------------

function parseAddresses(raw: unknown): string[] {
  try {
    const arr = JSON.parse(String(raw ?? "[]"));
    if (!Array.isArray(arr)) return [];
    return arr.map((x) => String(x).trim()).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getWorkspaceSettings(): Promise<WorkspaceSettings> {
  const c = await db();
  const rs = await c.execute("SELECT * FROM workspace_settings WHERE id = 1");
  const r = rs.rows[0];
  if (!r) return { min_approvals: 1, approver_addresses: [] };
  return {
    min_approvals: Number(r.min_approvals ?? 1),
    approver_addresses: parseAddresses(r.approver_addresses),
    updated_at: n(r.updated_at),
    updated_by: s(r.updated_by),
  };
}

export async function setWorkspaceSettings(input: {
  minApprovals: number;
  approverAddresses: string[];
  by: string;
}): Promise<WorkspaceSettings> {
  const min = Math.max(1, Math.floor(input.minApprovals));
  const addrs = Array.from(new Set(input.approverAddresses.map((a) => a.trim()).filter(Boolean)));
  if (min > Math.max(addrs.length, 1)) {
    throw new Error(`min_approvals (${min}) cannot exceed approver count (${addrs.length})`);
  }
  const c = await db();
  await c.execute({
    sql: "INSERT INTO workspace_settings (id, min_approvals, approver_addresses, updated_at, updated_by) VALUES (1, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET min_approvals = excluded.min_approvals, approver_addresses = excluded.approver_addresses, updated_at = excluded.updated_at, updated_by = excluded.updated_by",
    args: [min, JSON.stringify(addrs), Date.now(), input.by],
  });
  return getWorkspaceSettings();
}

// ---- Line items -------------------------------------------------------------

export async function addLineItem(
  runId: string,
  input: {
    payeeId?: string;
    label: string;
    address: string;
    amountZec: number;
    memo?: string;
    workStatus?: WorkStatus;
    externalRef?: string;
  },
): Promise<PayoutLineItem> {
  const c = await db();
  const run = await c.execute({ sql: "SELECT 1 FROM payout_runs WHERE id = ?", args: [runId] });
  if (!run.rows.length) throw new Error(`No such run: ${runId}`);
  const item: PayoutLineItem = {
    id: randomUUID(),
    run_id: runId,
    payee_id: input.payeeId,
    label: input.label.trim() || "Unnamed",
    address: input.address.trim(),
    amount_zec: input.amountZec,
    memo: input.memo?.trim() || undefined,
    work_status: input.workStatus ?? "in_progress",
    pay_status: "unpaid",
    external_ref: input.externalRef?.trim() || undefined,
  };
  if (!item.address) throw new Error("address required");
  if (!(item.amount_zec > 0)) throw new Error("amount must be positive");
  await c.execute({
    sql: "INSERT INTO payout_items (id, run_id, payee_id, label, address, amount_zec, memo, work_status, pay_status, external_ref) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', ?)",
    args: [item.id, item.run_id, item.payee_id ?? null, item.label, item.address, item.amount_zec, item.memo ?? null, item.work_status, item.external_ref ?? null],
  });
  return item;
}

/** Look up which external_refs already exist anywhere in payout_items.
 *  Used to dedupe re-imports from the same upstream system (e.g. zec-bounties). */
export async function findExistingExternalRefs(refs: string[]): Promise<Set<string>> {
  if (refs.length === 0) return new Set();
  const c = await db();
  const placeholders = refs.map(() => "?").join(", ");
  const rs = await c.execute({
    sql: `SELECT external_ref FROM payout_items WHERE external_ref IN (${placeholders})`,
    args: refs,
  });
  return new Set(rs.rows.map((r) => String(r.external_ref)));
}

export async function updateLineItem(
  itemId: string,
  patch: Partial<Pick<PayoutLineItem, "label" | "address" | "amount_zec" | "memo" | "work_status">>,
): Promise<PayoutLineItem> {
  const c = await db();
  const cur = await c.execute({ sql: "SELECT * FROM payout_items WHERE id = ?", args: [itemId] });
  if (!cur.rows[0]) throw new Error(`No such line item: ${itemId}`);
  const item = toItem(cur.rows[0]);
  if (patch.label !== undefined) item.label = patch.label.trim() || item.label;
  if (patch.address !== undefined) item.address = patch.address.trim() || item.address;
  if (patch.amount_zec !== undefined) {
    if (!(patch.amount_zec > 0)) throw new Error("amount must be positive");
    item.amount_zec = patch.amount_zec;
  }
  if (patch.memo !== undefined) item.memo = patch.memo.trim() || undefined;
  if (patch.work_status !== undefined) item.work_status = patch.work_status;
  await c.execute({
    sql: "UPDATE payout_items SET label = ?, address = ?, amount_zec = ?, memo = ?, work_status = ? WHERE id = ?",
    args: [item.label, item.address, item.amount_zec, item.memo ?? null, item.work_status, itemId],
  });
  return item;
}

export async function removeLineItem(itemId: string): Promise<void> {
  const c = await db();
  await c.execute({ sql: "DELETE FROM payout_items WHERE id = ?", args: [itemId] });
}

// Manual settlement: treasurer marks a line paid for payments made elsewhere.
export async function markLineItemPaid(
  itemId: string,
  input: { txid?: string; blockHeight?: number; reconciled?: boolean },
): Promise<PayoutLineItem> {
  const c = await db();
  const cur = await c.execute({ sql: "SELECT * FROM payout_items WHERE id = ?", args: [itemId] });
  if (!cur.rows[0]) throw new Error(`No such line item: ${itemId}`);
  const item = toItem(cur.rows[0]);
  item.pay_status = "paid";
  item.txid = input.txid?.trim() || item.txid;
  item.paid_at = Date.now();
  if (input.blockHeight !== undefined) item.paid_block = input.blockHeight;
  item.reconciled = input.reconciled ?? false;
  await c.execute({
    sql: "UPDATE payout_items SET pay_status = 'paid', txid = ?, paid_at = ?, paid_block = ?, reconciled = ? WHERE id = ?",
    args: [item.txid ?? null, item.paid_at, item.paid_block ?? null, item.reconciled ? 1 : 0, itemId],
  });
  return item;
}

export async function setLineItemPayStatus(itemId: string, status: PayStatus): Promise<PayoutLineItem> {
  const c = await db();
  const cur = await c.execute({ sql: "SELECT * FROM payout_items WHERE id = ?", args: [itemId] });
  if (!cur.rows[0]) throw new Error(`No such line item: ${itemId}`);
  const item = toItem(cur.rows[0]);
  item.pay_status = status;
  if (status === "unpaid") {
    item.txid = undefined;
    item.paid_at = undefined;
    item.paid_block = undefined;
    item.reconciled = undefined;
    await c.execute({
      sql: "UPDATE payout_items SET pay_status = 'unpaid', txid = NULL, paid_at = NULL, paid_block = NULL, reconciled = NULL WHERE id = ?",
      args: [itemId],
    });
  } else {
    await c.execute({ sql: "UPDATE payout_items SET pay_status = ? WHERE id = ?", args: [status, itemId] });
  }
  return item;
}

// Match unpaid completed items against the treasury's synced OUT txs by
// recipient address + amount (compared in zatoshi). Each synced tx settles at
// most one line; a memo on the line disambiguates repeat payments to one address.
export async function reconcileRun(runId: string): Promise<{ matched: number; items: PayoutLineItem[] }> {
  const c = await db();
  const runRs = await c.execute({ sql: "SELECT * FROM payout_runs WHERE id = ?", args: [runId] });
  if (!runRs.rows[0]) throw new Error(`No such run: ${runId}`);
  const run = toRun(runRs.rows[0]);

  const outRs = run.source_ufvk_id
    ? await c.execute({ sql: "SELECT * FROM transactions WHERE direction = 'out' AND ufvk_id = ?", args: [run.source_ufvk_id] })
    : await c.execute("SELECT * FROM transactions WHERE direction = 'out'");
  const outTxs = outRs.rows.map(toTx);

  const itemsRs = await c.execute({ sql: "SELECT * FROM payout_items WHERE run_id = ?", args: [runId] });
  const items = itemsRs.rows.map(toItem);

  // Shielded-with-memo lines match on (memo, amount): UA receivers vary on-chain
  // so address equality is unreliable. Everything else falls back to (address, amount).
  const useMemoMatch = (i: { address: string; memo?: string }) =>
    !!i.memo && isShieldedAddress(i.address);
  const lineKey = (i: { address: string; amount_zec: number; memo?: string }) => {
    const zat = Math.round(i.amount_zec * 1e8);
    return useMemoMatch(i) ? `memo:${i.memo}:${zat}` : `addr:${i.address}:${zat}`;
  };

  const usedTxKeys = new Set(
    items.filter((i) => i.txid).map((i) => `${i.txid}:${lineKey(i)}`),
  );

  // Refuse ambiguous duplicates: two lines with identical match-key would
  // race for the same tx, so require manual settlement.
  const tupleCount = new Map<string, number>();
  for (const i of items) {
    if (i.pay_status === "paid" || i.work_status !== "completed") continue;
    const k = lineKey(i);
    tupleCount.set(k, (tupleCount.get(k) ?? 0) + 1);
  }

  const statements: { sql: string; args: (string | number | null)[] }[] = [];
  let matched = 0;
  const touched: PayoutLineItem[] = [];

  for (const item of items) {
    if (item.pay_status === "paid") continue;
    if (item.work_status !== "completed") continue;
    const itemZat = Math.round(item.amount_zec * 1e8);
    const key = lineKey(item);
    if ((tupleCount.get(key) ?? 0) > 1) continue;
    const memoMatch = useMemoMatch(item);
    const hit = outTxs.find((t) => {
      if (Math.round(Math.abs(t.amount_zec) * 1e8) !== itemZat) return false;
      if (memoMatch) {
        if (t.memo !== item.memo) return false;
      } else {
        if (!t.counterparty || t.counterparty !== item.address) return false;
        if (item.memo && t.memo !== item.memo) return false;
      }
      return !usedTxKeys.has(`${t.txid}:${key}`);
    });
    if (!hit) continue;

    item.pay_status = "paid";
    item.txid = hit.txid;
    item.paid_at = Date.now();
    item.paid_block = hit.block_height;
    item.reconciled = true;
    usedTxKeys.add(`${hit.txid}:${key}`);
    matched++;
    touched.push(item);

    statements.push({
      sql: "UPDATE payout_items SET pay_status = 'paid', txid = ?, paid_at = ?, paid_block = ?, reconciled = 1 WHERE id = ?",
      args: [item.txid ?? null, item.paid_at, item.paid_block ?? null, item.id],
    });
    // Close the accounting loop: an unclassified matched payout is a contractor
    // expense, and the recipient gets the payee's friendly label.
    if (!hit.tag) {
      statements.push({
        sql: "UPDATE transactions SET tag = 'contractor', tagged_by = 'payout-reconcile', tagged_at = ? WHERE id = ? AND tag IS NULL",
        args: [Date.now(), hit.id],
      });
    }
    statements.push({
      sql: "INSERT INTO counterparties (address, label, added_by, added_at) VALUES (?, ?, 'payout-reconcile', ?) ON CONFLICT(address) DO NOTHING",
      args: [item.address, item.label, Date.now()],
    });
  }

  if (matched > 0) {
    const completed = items.filter((i) => i.work_status === "completed");
    const allPaid = completed.every((i) => i.pay_status === "paid");
    if (run.status === "sent" && allPaid) {
      statements.push({ sql: "UPDATE payout_runs SET status = 'reconciled' WHERE id = ?", args: [runId] });
    }
    await c.batch(statements, "write");
  }
  return { matched, items: touched };
}

// ---- Fiat price cache (ZEC/USD by UTC date, YYYY-MM-DD) ----------------------

export async function getFiatPrices(dates: string[]): Promise<Map<string, number>> {
  if (dates.length === 0) return new Map();
  const c = await db();
  const placeholders = dates.map(() => "?").join(",");
  const rs = await c.execute({ sql: `SELECT date, usd FROM fiat_prices WHERE date IN (${placeholders})`, args: dates });
  return new Map(rs.rows.map((r) => [String(r.date), Number(r.usd)]));
}

export async function saveFiatPrices(entries: { date: string; usd: number }[]): Promise<void> {
  if (entries.length === 0) return;
  const c = await db();
  await c.batch(
    entries.map((e) => ({
      sql: "INSERT OR REPLACE INTO fiat_prices (date, usd, fetched_at) VALUES (?, ?, ?)",
      args: [e.date, e.usd, Date.now()],
    })),
    "write",
  );
}
