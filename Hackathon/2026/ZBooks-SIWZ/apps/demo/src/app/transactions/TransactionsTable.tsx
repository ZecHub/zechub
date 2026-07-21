"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CATEGORY_LABEL, type Category, type Transaction } from "@/lib/types";
import { TxRow } from "./TxRow";

interface Props {
  txs: Transaction[];
  keyLabels: Record<string, string>;
  counterpartyLabels: Record<string, string>;
  editable: boolean;
}

const ALL_CATEGORIES = Object.entries(CATEGORY_LABEL).map(([value, label]) => ({ value, label }));

export function TransactionsTable({ txs, keyLabels, counterpartyLabels, editable }: Props) {
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState<"all" | "in" | "out">("all");
  const [category, setCategory] = useState<string>("all");
  const [keyId, setKeyId] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return txs.filter((t) => {
      if (keyId !== "all" && t.ufvk_id !== keyId) return false;
      if (direction !== "all" && t.direction !== direction) return false;
      if (category === "untagged" && t.tag) return false;
      if (category !== "all" && category !== "untagged" && t.tag !== category) return false;
      if (!q) return true;
      const cpLabel = t.counterparty ? counterpartyLabels[t.counterparty] : undefined;
      return (
        (t.memo ?? "").toLowerCase().includes(q) ||
        (t.counterparty ?? "").toLowerCase().includes(q) ||
        (cpLabel ?? "").toLowerCase().includes(q) ||
        (t.notes ?? "").toLowerCase().includes(q) ||
        t.txid.toLowerCase().includes(q)
      );
    });
  }, [txs, query, direction, category, keyId, counterpartyLabels]);

  return (
    <>
      <FilterBar
        query={query}
        setQuery={setQuery}
        direction={direction}
        setDirection={setDirection}
        category={category}
        setCategory={setCategory}
        keyLabels={keyLabels}
        keyId={keyId}
        setKeyId={setKeyId}
        total={txs.length}
        showing={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-sm text-neutral-500">
          {txs.length === 0
            ? "No transactions yet. Sync a key to start importing."
            : "No transactions match these filters."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead className="text-left text-neutral-500 text-xs uppercase tracking-wider bg-neutral-50/80 dark:bg-neutral-900/50">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Dir</th>
                <th className="py-2.5 px-3 text-right">Amount (ZEC)</th>
                <th className="py-2.5 px-3">Memo / counterparty</th>
                <th className="py-2.5 px-3">Key</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((t) => (
                  <TxRow
                    key={t.id}
                    t={t}
                    keyLabel={keyLabels[t.ufvk_id] ?? "(unknown)"}
                    counterpartyLabel={t.counterparty ? counterpartyLabels[t.counterparty] : undefined}
                    editable={editable}
                    categories={ALL_CATEGORIES}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function FilterBar({
  query, setQuery,
  direction, setDirection,
  category, setCategory,
  keyLabels, keyId, setKeyId,
  total, showing,
}: {
  query: string;
  setQuery: (v: string) => void;
  direction: "all" | "in" | "out";
  setDirection: (v: "all" | "in" | "out") => void;
  category: string;
  setCategory: (v: string) => void;
  keyLabels: Record<string, string>;
  keyId: string;
  setKeyId: (v: string) => void;
  total: number;
  showing: number;
}) {
  const keyEntries = Object.entries(keyLabels);
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search memo, counterparty, notes, txid…"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-1.5 text-sm w-60 sm:w-72 focus:outline-none focus:ring-1 focus:ring-zcash-yellow"
        />
        {keyEntries.length > 1 && (
          <select
            value={keyId}
            onChange={(e) => setKeyId(e.target.value)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 text-sm"
          >
            <option value="all">All wallets</option>
            {keyEntries.map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        )}
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as "all" | "in" | "out")}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 text-sm"
        >
          <option value="all">All directions</option>
          <option value="in">Incoming</option>
          <option value="out">Outgoing</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1.5 text-sm"
        >
          <option value="all">All categories</option>
          <option value="untagged">Untagged only</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div className="text-xs text-neutral-500">
        {showing === total ? `${total} transactions` : `${showing} of ${total}`}
      </div>
    </div>
  );
}
