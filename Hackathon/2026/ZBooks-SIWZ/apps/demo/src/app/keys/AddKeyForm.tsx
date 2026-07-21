"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ZCASH_BLOCKS } from "@siwz/core";
import { useToast } from "@/components/Toast";

const DEFAULT_BIRTHDAY = String(ZCASH_BLOCKS.SAFE_RECENT_BIRTHDAY);

export function AddKeyForm({ autoFocus = false }: { autoFocus?: boolean }) {
  const [label, setLabel] = useState("");
  const [ufvk, setUfvk] = useState("");
  const [birthday, setBirthday] = useState(DEFAULT_BIRTHDAY);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const ufvkRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) ufvkRef.current?.focus();
  }, [autoFocus]);

  return (
    <form
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const birthdayNum = birthday.trim() === "" ? undefined : Number(birthday);
        if (birthdayNum != null && (!Number.isFinite(birthdayNum) || birthdayNum < 0)) {
          setError("Birthday must be a non-negative block height.");
          return;
        }
        startTransition(async () => {
          const res = await fetch("/api/keys", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ label, ufvk, birthday: birthdayNum }),
          });
          if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            setError(j.error ?? `Server returned ${res.status}`);
            return;
          }
          setLabel("");
          setUfvk("");
          setBirthday(DEFAULT_BIRTHDAY);
          toast({ message: "Viewing key added — sync started.", tone: "success" });
          router.refresh();
        });
      }}
    >
      <div className="text-sm font-semibold tracking-tight">Add a viewing key</div>
      <div className="grid sm:grid-cols-[200px_1fr] gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-neutral-500">Label</span>
          <input
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40 focus:border-zcash-yellow/60"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Operations wallet"
            maxLength={60}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-neutral-500">UFVK</span>
          <textarea
            ref={ufvkRef}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 font-mono text-xs min-h-[5rem] focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40 focus:border-zcash-yellow/60"
            value={ufvk}
            onChange={(e) => setUfvk(e.target.value)}
            placeholder="uview1…"
            spellCheck={false}
          />
        </label>
      </div>

      <details
        open={showAdvanced}
        onToggle={(e) => setShowAdvanced((e.target as HTMLDetailsElement).open)}
        className="text-xs"
      >
        <summary className="cursor-pointer text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 select-none">
          Advanced: set wallet birthday
        </summary>
        <div className="grid sm:grid-cols-[200px_1fr] gap-3 mt-2">
          <label className="flex flex-col gap-1">
            <span className="text-neutral-500">Birthday (block height)</span>
            <input
              type="number"
              min={0}
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40 focus:border-zcash-yellow/60"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="2800000 (early 2026)"
            />
          </label>
          <p className="text-neutral-500 leading-relaxed self-center">
            Block to start scanning from. Default <code className="font-mono">2,800,000</code> (~early 2026)
            covers any wallet created since 2025 and finishes the first
            sync in seconds. Use <code className="font-mono">1,687,104</code> for
            older Orchard wallets, <code className="font-mono">419,200</code> for
            Sapling-only wallets from 2018–2022, or <code className="font-mono">0</code> to
            scan the full chain (slow).
          </p>
        </div>
      </details>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <span className="text-xs text-neutral-500 max-w-md leading-relaxed">
          Adding a key kicks off a one-time sync against the shielded
          backend. First sync of an active treasury can take a couple of
          minutes; subsequent refreshes finish in seconds.
        </span>
        <button
          type="submit"
          className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
          disabled={isPending || !ufvk.trim()}
        >
          {isPending ? "Adding…" : "Add key"}
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
