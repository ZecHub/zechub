import { getShieldedExplorer } from "./explorer";
import { getKey, updateKeySyncStatus, upsertTransactions } from "./db";

// In-process lock so a re-click of "Sync" can't run two zingo processes
// against the same wallet. Carries a started_at so a process that crashed
// mid-sync (without clearing its lock) doesn't block its own retries forever.
// Cross-process startup recovery is handled by resetStaleSync in db.ts.
const inFlight = new Map<string, number>();
const STALE_LOCK_MS = 10 * 60 * 1000;

export interface SyncOutcome {
  ok: boolean;
  inserted?: number;
  updated?: number;
  syncedToBlock?: number | null;
  error?: string;
}

export async function syncUfvk(ufvkId: string): Promise<SyncOutcome> {
  const key = await getKey(ufvkId);
  if (!key) return { ok: false, error: "UFVK not found" };

  const startedAt = inFlight.get(ufvkId);
  if (startedAt !== undefined && Date.now() - startedAt < STALE_LOCK_MS) {
    return { ok: false, error: "A sync is already running for this key" };
  }
  if (startedAt !== undefined) {
    console.warn(
      `[sync] reclaiming stale in-flight lock for ${ufvkId} (${Math.round((Date.now() - startedAt) / 1000)}s old)`,
    );
  }
  inFlight.set(ufvkId, Date.now());

  const explorer = getShieldedExplorer();
  if (!explorer) {
    inFlight.delete(ufvkId);
    const msg =
      "No shielded backend configured. Set LIGHTWALLET_RPC_URL + LIGHTWALLET_RPC_TOKEN, or ZCASH_RPC_URL, or SIWZ_DEMO=1.";
    await updateKeySyncStatus(ufvkId, { sync_status: "error", last_sync_error: msg });
    return { ok: false, error: msg };
  }
  if (!explorer.getTransactionsForUfvk) {
    inFlight.delete(ufvkId);
    const msg = "The configured shielded backend doesn't support UFVK syncing.";
    await updateKeySyncStatus(ufvkId, { sync_status: "error", last_sync_error: msg });
    return { ok: false, error: msg };
  }

  await updateKeySyncStatus(ufvkId, { sync_status: "syncing", last_sync_error: undefined });

  try {
    const result = await explorer.getTransactionsForUfvk(key.ufvk, {
      birthday: key.birthday,
    });
    const normalised = result.transactions.map((t) => {
      const amountZec = zatoshiStringToZec(t.amountZatoshi);
      return {
        txid: t.txid,
        direction: t.direction,
        // Outgoing stored as negative so /reports + /transactions render without a direction-aware sign flip.
        amount_zec: t.direction === "out" ? -Math.abs(amountZec) : Math.abs(amountZec),
        counterparty: t.counterparty ?? undefined,
        memo: t.memo ?? undefined,
        timestamp: t.timestamp ?? Date.now(),
        block_height: t.blockHeight ?? undefined,
      };
    });

    const { inserted, updated } = await upsertTransactions(ufvkId, normalised);
    await updateKeySyncStatus(ufvkId, {
      sync_status: "ok",
      last_synced_at: Date.now(),
      last_synced_block: result.syncedToBlock ?? undefined,
      last_chain_tip: result.chainTip ?? undefined,
      wallet_birthday: result.walletBirthday ?? undefined,
      last_sync_error: undefined,
      last_tx_count: result.transactions.length,
    });
    return { ok: true, inserted, updated, syncedToBlock: result.syncedToBlock };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await updateKeySyncStatus(ufvkId, { sync_status: "error", last_sync_error: msg });
    return { ok: false, error: msg };
  } finally {
    inFlight.delete(ufvkId);
  }
}

// Fire-and-forget: HTTP returns immediately, client polls /api/keys for status.
export function syncUfvkInBackground(ufvkId: string): void {
  void syncUfvk(ufvkId).catch((err) => {
    console.error(`[sync] uncaught for ${ufvkId}:`, err);
  });
}

function zatoshiStringToZec(s: string): number {
  const n = Number(s);
  if (!Number.isFinite(n)) return 0;
  return n / 1e8;
}
