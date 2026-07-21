"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Category, Transaction } from "@/lib/types";
import { CounterpartyLabel } from "@/components/CounterpartyLabel";

export function TxRow({
  t,
  keyLabel,
  editable,
  categories,
  counterpartyLabel,
}: {
  t: Transaction;
  keyLabel: string;
  editable: boolean;
  categories: { value: string; label: string }[];
  counterpartyLabel?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [tag, setTag] = useState<string>(t.tag ?? "");
  const [notes, setNotes] = useState<string>(t.notes ?? "");
  const [savedHint, setSavedHint] = useState(false);

  const submit = (partial: { tag?: Category | ""; notes?: string }) => {
    startTransition(async () => {
      const payload: Record<string, string | undefined> = {};
      if (partial.tag !== undefined) payload.tag = partial.tag === "" ? undefined : partial.tag;
      if (partial.notes !== undefined) payload.notes = partial.notes;
      const res = await fetch(`/api/transactions/${t.id}/tag`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSavedHint(true);
        setTimeout(() => setSavedHint(false), 900);
        router.refresh();
      }
    });
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      className="border-t border-neutral-100 dark:border-neutral-800/80 align-top"
    >
      <td className="py-2 pr-3 whitespace-nowrap text-xs text-neutral-500">
        {new Date(t.timestamp).toLocaleDateString()}
      </td>
      <td className="py-2 pr-3">
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
            t.direction === "in"
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : "bg-red-500/15 text-red-700 dark:text-red-300"
          }`}
        >
          {t.direction === "in" ? "IN" : "OUT"}
        </span>
      </td>
      <td
        className={`py-2 pr-3 text-right font-mono ${
          t.amount_zec >= 0 ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"
        }`}
      >
        {t.amount_zec >= 0 ? "+" : ""}
        {t.amount_zec.toLocaleString(undefined, { maximumFractionDigits: 8 })}
      </td>
      <td className="py-2 pr-3 max-w-[22rem]">
        <div className="line-clamp-2 text-sm">
          {t.memo ?? <span className="text-neutral-400">no memo</span>}
        </div>
        {t.counterparty && (
          <div className="mt-0.5">
            <CounterpartyLabel
              address={t.counterparty}
              label={counterpartyLabel}
              editable={editable}
            />
          </div>
        )}
      </td>
      <td className="py-2 pr-3 text-xs text-neutral-500">{keyLabel}</td>
      <td className="py-2 pr-3">
        {editable ? (
          <select
            className="bg-transparent border border-neutral-300 dark:border-neutral-700 rounded px-1.5 py-1 text-xs"
            value={tag}
            disabled={isPending}
            onChange={(e) => {
              setTag(e.target.value);
              submit({ tag: e.target.value as Category | "" });
            }}
          >
            <option value="">untagged</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        ) : (
          <span className="text-xs text-neutral-500">{t.tag ?? "—"}</span>
        )}
      </td>
      <td className="py-2 pr-3">
        {editable ? (
          <input
            className="bg-transparent border border-neutral-300 dark:border-neutral-700 rounded px-1.5 py-1 text-xs w-40 focus:outline-none focus:ring-1 focus:ring-zcash-yellow"
            placeholder="note…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => {
              if (notes !== (t.notes ?? "")) submit({ notes });
            }}
          />
        ) : (
          <span className="text-xs text-neutral-500">{t.notes ?? "—"}</span>
        )}
        {savedHint && <span className="ml-2 text-[10px] text-emerald-600">saved</span>}
      </td>
    </motion.tr>
  );
}
