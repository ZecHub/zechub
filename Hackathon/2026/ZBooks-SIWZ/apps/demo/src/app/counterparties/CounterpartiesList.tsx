"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Counterparty } from "@/lib/types";
import { useConfirm } from "@/components/ConfirmDialog";
import { Pagination } from "@/components/Pagination";

interface Stats {
  count: number;
  totalIn: number;
  totalOut: number;
  latest: number;
}

type SavedRow = Counterparty & { stats: Stats };
type UnlabelledRow = { address: string } & Stats;

export function CounterpartiesList({
  saved,
  unlabelled,
  canEdit,
  unlabelledPage,
  unlabelledPageSize,
}: {
  saved: SavedRow[];
  unlabelled: UnlabelledRow[];
  canEdit: boolean;
  unlabelledPage: number;
  unlabelledPageSize: number;
}) {
  const unlabelledTotal = unlabelled.length;
  const unlabelledSlice = unlabelled.slice(
    (unlabelledPage - 1) * unlabelledPageSize,
    unlabelledPage * unlabelledPageSize,
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold tracking-tight">
          Saved <span className="text-neutral-500 font-normal">({saved.length})</span>
        </h2>
        {saved.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-center text-sm text-neutral-500">
            No labels yet. Save one below from the unlabelled list, or
            click "+ label" next to any counterparty on /transactions.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {saved.map((c) => (
                <SavedItem key={c.address} c={c} canEdit={canEdit} />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold tracking-tight">
          Unlabelled, by activity{" "}
          <span className="text-neutral-500 font-normal">({unlabelledTotal})</span>
        </h2>
        {unlabelledTotal === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-center text-sm text-neutral-500">
            Every counterparty in your transactions has a label. Nice.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {unlabelledSlice.map((u) => (
              <UnlabelledItem key={u.address} u={u} canEdit={canEdit} />
            ))}
          </ul>
        )}
        {unlabelledTotal > 0 && (
          <Pagination
            page={unlabelledPage}
            pageSize={unlabelledPageSize}
            total={unlabelledTotal}
            basePath="/counterparties"
            label="unlabelled addresses"
          />
        )}
      </section>
    </div>
  );
}

function SavedItem({ c, canEdit }: { c: SavedRow; canEdit: boolean }) {
  const router = useRouter();
  const { confirm } = useConfirm();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(c.label);
  const [notes, setNotes] = useState(c.notes ?? "");
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      await fetch("/api/counterparties", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ address: c.address, label, notes }),
      });
      setEditing(false);
      router.refresh();
    });
  };

  const remove = async () => {
    const ok = await confirm({
      title: `Forget label "${c.label}"?`,
      body: "The raw address will show again everywhere this contact appears.",
      confirmLabel: "Remove label",
      tone: "danger",
    });
    if (!ok) return;
    startTransition(async () => {
      await fetch("/api/counterparties", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ address: c.address, label: "" }),
      });
      router.refresh();
    });
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 flex flex-col gap-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {editing && canEdit ? (
            <input
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="font-semibold rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1 text-sm w-full"
              maxLength={80}
            />
          ) : (
            <div className="font-semibold tracking-tight">{c.label}</div>
          )}
          <code className="font-mono text-[11px] text-neutral-500 break-all block mt-1">
            {c.address}
          </code>
        </div>
        {canEdit && (
          <div className="flex gap-2 flex-shrink-0">
            {editing ? (
              <>
                <button
                  onClick={save}
                  disabled={isPending}
                  className="text-xs rounded-md bg-zcash-yellow text-zcash-dark px-2.5 py-1 font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setLabel(c.label);
                    setNotes(c.notes ?? "");
                  }}
                  className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Edit
                </button>
                <button
                  onClick={remove}
                  className="text-xs rounded-md border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 px-2.5 py-1"
                >
                  Forget
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {editing && canEdit && (
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 mt-1"
        />
      )}
      {!editing && c.notes && (
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{c.notes}</p>
      )}

      <div className="text-[11px] text-neutral-500 flex gap-3 flex-wrap pt-1 border-t border-neutral-100 dark:border-neutral-800">
        <span>{c.stats.count} tx</span>
        {c.stats.totalIn > 0 && (
          <span className="text-emerald-700 dark:text-emerald-400">+{c.stats.totalIn.toLocaleString()} ZEC in</span>
        )}
        {c.stats.totalOut > 0 && (
          <span className="text-red-700 dark:text-red-400">−{c.stats.totalOut.toLocaleString()} ZEC out</span>
        )}
        {c.stats.latest > 0 && (
          <span>Last seen {new Date(c.stats.latest).toLocaleDateString()}</span>
        )}
      </div>
    </motion.li>
  );
}

function UnlabelledItem({ u, canEdit }: { u: UnlabelledRow; canEdit: boolean }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState("");
  const [isPending, startTransition] = useTransition();

  const save = () => {
    if (!label.trim()) {
      setEditing(false);
      return;
    }
    startTransition(async () => {
      await fetch("/api/counterparties", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ address: u.address, label }),
      });
      router.refresh();
    });
  };

  return (
    <li className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 flex items-center gap-3 text-sm">
      <code className="font-mono text-[11px] text-neutral-500 truncate flex-1">{u.address}</code>
      <span className="text-[11px] text-neutral-500 flex-shrink-0">{u.count} tx</span>
      {canEdit && (
        editing ? (
          <span className="flex gap-1.5 items-center flex-shrink-0">
            <input
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") setEditing(false);
              }}
              placeholder="Label…"
              maxLength={80}
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2 py-1 text-xs w-40"
              disabled={isPending}
            />
            <button
              onClick={save}
              disabled={isPending || !label.trim()}
              className="text-xs rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-2 py-1 disabled:opacity-50"
            >
              Save
            </button>
          </span>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-shrink-0"
          >
            + label
          </button>
        )
      )}
    </li>
  );
}
