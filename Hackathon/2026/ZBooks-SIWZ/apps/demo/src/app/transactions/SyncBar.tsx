"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Ufvk } from "@/lib/types";
import { RelativeTime } from "@/components/RelativeTime";

// Top-of-page sync summary with "Refresh all" fan-out.
export function SyncBar({ keys, canEdit }: { keys: Ufvk[]; canEdit: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const anySyncing = busy || keys.some((k) => k.sync_status === "syncing");
  const synced = keys.filter((k) => k.last_synced_at);
  const oldest = synced.length
    ? Math.min(...synced.map((k) => k.last_synced_at as number))
    : null;
  const errors = keys.filter((k) => k.sync_status === "error");

  useEffect(() => {
    if (!anySyncing) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => router.refresh(), 5_000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [anySyncing, router]);

  const refreshAll = () => {
    if (!keys.length || anySyncing) return;
    setBusy(true);
    startTransition(async () => {
      await Promise.all(
        keys.map((k) => fetch(`/api/keys/${k.id}/sync`, { method: "POST" })),
      );
      setTimeout(() => {
        router.refresh();
        setBusy(false);
      }, 400);
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 px-3 py-2 flex items-center gap-3 text-xs"
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          anySyncing
            ? "bg-blue-500 animate-pulse"
            : errors.length
            ? "bg-red-500"
            : "bg-emerald-500"
        }`}
        aria-hidden
      />
      <div className="flex-1 text-neutral-600 dark:text-neutral-300">
        {anySyncing ? (
          `Syncing ${keys.filter((k) => k.sync_status === "syncing").length || keys.length} key${keys.length === 1 ? "" : "s"}…`
        ) : oldest ? (
          <>
            Last sync <RelativeTime ts={oldest} /> across {keys.length} key
            {keys.length === 1 ? "" : "s"}
          </>
        ) : (
          "No data synced yet"
        )}
        {errors.length > 0 && !anySyncing && (
          <span className="ml-2 text-red-600 dark:text-red-400">
            {errors.length} key{errors.length === 1 ? " has" : "s have"} sync errors
          </span>
        )}
      </div>
      {canEdit && keys.length > 0 && (
        <button
          onClick={refreshAll}
          disabled={isPending || anySyncing}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-white dark:hover:bg-neutral-800 disabled:opacity-50"
        >
          {anySyncing ? "Syncing…" : "Refresh all"}
        </button>
      )}
    </motion.div>
  );
}

