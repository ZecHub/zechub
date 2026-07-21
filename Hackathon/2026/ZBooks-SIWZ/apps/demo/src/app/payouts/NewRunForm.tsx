"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

export function NewRunForm({
  keys,
}: {
  keys: { id: string; label: string; primary: boolean }[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [sourceUfvkId, setSourceUfvkId] = useState(
    keys.find((k) => k.primary)?.id ?? keys[0]?.id ?? "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/payouts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, sourceUfvkId: sourceUfvkId || undefined }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(j.error ?? `Server returned ${res.status}`);
        return;
      }
      setTitle("");
      toast({ message: "Payout run created.", tone: "success" });
      router.push(`/payouts/${j.run.id}`);
    });
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 flex flex-col gap-3"
    >
      <div className="text-sm font-semibold tracking-tight">New payout run</div>
      <div className="grid sm:grid-cols-[1fr_240px] gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-neutral-500">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ZecHub contributors, week of May 25"
            maxLength={120}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-neutral-500">Pay from (treasury key)</span>
          <select
            value={sourceUfvkId}
            onChange={(e) => setSourceUfvkId(e.target.value)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
          >
            {keys.length === 0 && <option value="">No keys, add one first</option>}
            {keys.map((k) => (
              <option key={k.id} value={k.id}>
                {k.label}
                {k.primary ? " (primary)" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-neutral-500 max-w-md leading-relaxed">
          The treasury key is the wallet ZBooks watches to reconcile this run.
          It pays from there, but signs in the treasurer&apos;s own wallet.
        </span>
        <button
          type="submit"
          disabled={isPending || !title.trim()}
          className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
        >
          {isPending ? "Creating…" : "Create run"}
        </button>
      </div>
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}
    </form>
  );
}
