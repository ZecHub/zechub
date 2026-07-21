"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Payee } from "@/lib/types";
import { shortenMiddle } from "@/lib/format";
import { useToast } from "@/components/Toast";
import { useConfirm } from "@/components/ConfirmDialog";

export function PayeesManager({ payees, canEdit }: { payees: Payee[]; canEdit: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/payees", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ label, address }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(j.error ?? `Server returned ${res.status}`);
        return;
      }
      setLabel("");
      setAddress("");
      toast({ message: `Added payee "${j.payee.label}".`, tone: "success" });
      router.refresh();
    });
  };

  const archive = async (p: Payee) => {
    const ok = await confirm({
      title: `Archive "${p.label}"?`,
      body: "They won't appear when adding line items. Past runs keep their record.",
      confirmLabel: "Archive",
      tone: "danger",
    });
    if (!ok) return;
    startTransition(async () => {
      await fetch(`/api/payees/${p.id}`, { method: "DELETE" });
      router.refresh();
    });
  };

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-semibold tracking-tight">
        Payees <span className="text-neutral-500 font-normal">({payees.length})</span>
      </h2>
      <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
        Contributors you pay. Save an address once; add them to any run with a
        click. Use a unified or Sapling address to carry a memo with the payment.
      </p>

      {canEdit && (
        <form
          onSubmit={add}
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 flex flex-col gap-3"
        >
          <div className="grid sm:grid-cols-[200px_1fr_auto] gap-3 items-end">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-neutral-500">Name</span>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Alice (design)"
                maxLength={80}
                className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-neutral-500">Zcash address</span>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="u1… / zs… / t1…"
                spellCheck={false}
                className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
              />
            </label>
            <button
              type="submit"
              disabled={isPending || !label.trim() || !address.trim()}
              className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              Add payee
            </button>
          </div>
          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-md px-3 py-2">
              {error}
            </div>
          )}
        </form>
      )}

      {payees.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-center text-sm text-neutral-500">
          No payees yet.
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {payees.map((p) => (
            <li
              key={p.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 flex items-center gap-3 text-sm"
            >
              <span className="font-medium flex-shrink-0">{p.label}</span>
              <code title={p.address} className="font-mono text-[11px] text-neutral-500 flex-1">{shortenMiddle(p.address)}</code>
              {canEdit && (
                <button
                  onClick={() => archive(p)}
                  className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-shrink-0"
                >
                  Archive
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
