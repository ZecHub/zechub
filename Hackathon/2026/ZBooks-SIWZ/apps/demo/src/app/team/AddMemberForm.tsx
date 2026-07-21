"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AddMemberForm() {
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"admin" | "treasurer" | "viewer">("viewer");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 flex flex-col sm:flex-row gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
          const res = await fetch("/api/team", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ address: address.trim(), role }),
          });
          if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            setError(j.error ?? `Server returned ${res.status}`);
            return;
          }
          setAddress("");
          setRole("viewer");
          router.refresh();
        });
      }}
    >
      <input
        className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-zcash-yellow"
        placeholder="t1… or zs… or u1…"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <select
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 text-sm"
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "treasurer" | "viewer")}
      >
        <option value="viewer">Viewer</option>
        <option value="treasurer">Treasurer</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
        disabled={isPending || !address.trim()}
      >
        {isPending ? "Adding…" : "Add"}
      </button>
      {error && <div className="text-sm text-red-600 dark:text-red-400 sm:basis-full">{error}</div>}
    </form>
  );
}
