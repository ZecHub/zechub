"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Ufvk } from "@/lib/types";
import { shortenMiddle } from "@/lib/format";
import { useConfirm } from "@/components/ConfirmDialog";
import { RelativeTime } from "@/components/RelativeTime";

export function KeyRow({ k, canEdit }: { k: Ufvk; canEdit: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const { confirm } = useConfirm();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(k.label);
  const isSyncing = k.sync_status === "syncing" || busy;

  const saveLabel = () => {
    const next = label.trim();
    setEditing(false);
    if (!next || next === k.label) {
      setLabel(k.label);
      return;
    }
    startTransition(async () => {
      await fetch(`/api/keys/${k.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ label: next }),
      });
      router.refresh();
    });
  };
  const progress = computeProgress(k);

  // While a sync runs server-side, poll so the row updates without a manual refresh.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (k.sync_status !== "syncing") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => router.refresh(), 4_000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [k.sync_status, router]);

  const onSync = () => {
    if (isSyncing) return;
    setBusy(true);
    startTransition(async () => {
      await fetch(`/api/keys/${k.id}/sync`, { method: "POST" });
      // Brief delay so the row's sync_status flips before we re-fetch.
      setTimeout(() => {
        router.refresh();
        setBusy(false);
      }, 300);
    });
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4 flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {editing && canEdit ? (
              <input
                autoFocus
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onBlur={saveLabel}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveLabel();
                  if (e.key === "Escape") {
                    setLabel(k.label);
                    setEditing(false);
                  }
                }}
                maxLength={80}
                className="font-semibold rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-1.5 py-0.5 text-sm w-48"
              />
            ) : (
              <span className="font-semibold tracking-tight inline-flex items-center gap-1.5">
                {k.label}
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="text-[10px] font-normal text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                  >
                    rename
                  </button>
                )}
              </span>
            )}
            {k.primary && (
              <span className="text-[10px] uppercase tracking-wider bg-zcash-yellow/25 text-zcash-dark dark:text-zcash-yellow px-1.5 py-0.5 rounded">
                Primary
              </span>
            )}
            <SyncBadge status={isSyncing ? "syncing" : k.sync_status} />
          </div>
          <code title={k.ufvk} className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 break-all">
            {shortenMiddle(k.ufvk, 14, 10)}
          </code>
          <div className="text-[11px] text-neutral-500">
            Added {new Date(k.created_at).toLocaleDateString()} by{" "}
            <span className="font-mono">{shortAddr(k.owner)}</span>
          </div>
        </div>
        {canEdit && (
          <div className="flex flex-wrap gap-2">
            <button
              className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
              disabled={isPending || isSyncing}
              onClick={onSync}
              title="Re-sync this key from chain tip"
            >
              {isSyncing ? "Syncing…" : "Sync now"}
            </button>
            {!k.primary && (
              <button
                className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    await fetch(`/api/keys/${k.id}/primary`, { method: "POST" });
                    router.refresh();
                  });
                }}
              >
                Make primary
              </button>
            )}
            <button
              className="text-xs rounded-md border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 px-2.5 py-1 hover:bg-red-50 dark:hover:bg-red-950/40"
              disabled={isPending}
              onClick={async () => {
                const ok = await confirm({
                  title: `Remove "${k.label}"?`,
                  body: "All transactions imported from this key will be cleared too. This can't be undone.",
                  confirmLabel: "Remove key",
                  tone: "danger",
                });
                if (!ok) return;
                startTransition(async () => {
                  await fetch(`/api/keys/${k.id}`, { method: "DELETE" });
                  router.refresh();
                });
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 border-t border-neutral-100 dark:border-neutral-800 pt-2">
        <div className="flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-3 flex-wrap">
            {k.last_synced_at ? (
              <span>
                Last sync <RelativeTime ts={k.last_synced_at} />
              </span>
            ) : (
              <span className="italic">No sync yet</span>
            )}
            {typeof k.last_synced_block === "number" && (
              <span>Block {k.last_synced_block.toLocaleString()}</span>
            )}
            {typeof k.last_chain_tip === "number" && (
              <span>Tip {k.last_chain_tip.toLocaleString()}</span>
            )}
            {typeof k.last_tx_count === "number" && (
              <span>{k.last_tx_count} tx</span>
            )}
          </div>
        </div>
        {(isSyncing || (progress != null && progress < 100)) && (
          <ProgressBar progress={isSyncing ? null : progress} />
        )}
      </div>

      <AnimatePresence>
        {k.sync_status === "error" && k.last_sync_error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[11px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-md px-2 py-1.5 overflow-hidden"
          >
            <strong className="font-semibold">Sync failed:</strong>{" "}
            <span className="break-words">{k.last_sync_error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function SyncBadge({ status }: { status: Ufvk["sync_status"] }) {
  const map: Record<Ufvk["sync_status"], { label: string; cls: string }> = {
    idle: { label: "Pending sync", cls: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300" },
    syncing: { label: "Syncing", cls: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" },
    ok: { label: "Synced", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" },
    error: { label: "Sync error", cls: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300" },
  };
  const info = map[status] ?? map.idle;
  return (
    <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${info.cls}`}>
      {status === "syncing" && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current align-middle mr-1 animate-pulse" />
      )}
      {info.label}
    </span>
  );
}

function shortAddr(a: string): string {
  if (a.length <= 14) return a;
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

// Indeterminate bar mid-sync (zingo --waitsync blocks live progress).
// Determinate bar from the last completed sync's block/tip.
function ProgressBar({ progress }: { progress: number | null }) {
  if (progress === null) {
    return (
      <div className="h-1 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative">
        <motion.div
          className="h-full bg-zcash-yellow w-1/3 absolute"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }
  return (
    <div className="h-1 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
      <motion.div
        className="h-full bg-emerald-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function computeProgress(k: Ufvk): number | null {
  if (k.last_synced_block == null || k.last_chain_tip == null) return null;
  const start = k.wallet_birthday ?? Math.max(0, k.last_chain_tip - 100_000);
  const span = k.last_chain_tip - start;
  if (span <= 0) return 100;
  const progressed = k.last_synced_block - start;
  return Math.max(0, Math.min(100, Math.round((progressed / span) * 100)));
}

