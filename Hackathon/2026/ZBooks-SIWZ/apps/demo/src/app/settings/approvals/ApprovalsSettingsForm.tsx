"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { shortenMiddle } from "@/lib/format";

interface Settings {
  minApprovals: number;
  approverAddresses: string[];
}

interface Candidate {
  address: string;
  role: string;
}

export function ApprovalsSettingsForm({
  current,
  candidates,
  canEdit,
}: {
  current: Settings;
  candidates: Candidate[];
  canEdit: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [min, setMin] = useState(current.minApprovals);
  const [selected, setSelected] = useState<Set<string>>(new Set(current.approverAddresses));
  const [isPending, startTransition] = useTransition();

  const toggle = (addr: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(addr)) next.delete(addr);
      else next.add(addr);
      return next;
    });

  const save = () =>
    startTransition(async () => {
      const addrs = Array.from(selected);
      if (min > Math.max(1, addrs.length)) {
        toast({
          message: `Threshold ${min} exceeds approver count ${addrs.length}. Add approvers or lower the threshold.`,
          tone: "error",
        });
        return;
      }
      const res = await fetch("/api/settings/approvals", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ minApprovals: min, approverAddresses: addrs }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({ message: j.error ?? "Could not save.", tone: "error" });
        return;
      }
      toast({ message: "Approvals policy saved.", tone: "success" });
      router.refresh();
    });

  const orphan = current.approverAddresses.filter(
    (a) => !candidates.some((c) => c.address === a),
  );

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm max-w-[10rem]">
          <span className="text-neutral-500">Approvals required (M)</span>
          <input
            type="number"
            min={1}
            value={min}
            onChange={(e) => setMin(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
            disabled={!canEdit}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 font-mono disabled:opacity-60"
          />
        </label>
        <p className="text-xs text-neutral-500 leading-relaxed">
          Set to 1 to disable multi-party approval (current behaviour). Set to
          2+ to require multiple treasurers to sign off before the ZIP 321 URI
          is revealed for any new run.
        </p>
      </section>

      <section className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold tracking-tight">
            Approvers (N){" "}
            <span className="font-normal text-neutral-500">· {selected.size} selected</span>
          </h2>
          <p className="text-xs text-neutral-500">Empty list = any admin/treasurer can approve.</p>
        </div>
        {candidates.length === 0 ? (
          <p className="text-xs text-neutral-500">
            No admins or treasurers yet. Add team members on the Team page first.
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {candidates.map((c) => (
              <li key={c.address}>
                <label className={`flex items-center gap-2.5 text-sm ${canEdit ? "cursor-pointer" : "cursor-default"}`}>
                  <input
                    type="checkbox"
                    checked={selected.has(c.address)}
                    onChange={() => toggle(c.address)}
                    disabled={!canEdit}
                    className="accent-zcash-yellow disabled:opacity-60"
                  />
                  <code className="font-mono text-xs">{shortenMiddle(c.address)}</code>
                  <span className="text-[10px] uppercase tracking-wide text-neutral-500">
                    {c.role}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
        {orphan.length > 0 && (
          <div className="text-xs text-amber-700 dark:text-amber-400">
            {orphan.length} approver address{orphan.length === 1 ? "" : "es"} no longer in
            the team. Removed from the active list on save.
          </div>
        )}
      </section>

      {canEdit ? (
        <div className="flex justify-end">
          <button
            onClick={save}
            disabled={isPending}
            className="text-sm rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-4 py-2 hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Save policy"}
          </button>
        </div>
      ) : (
        <p className="text-xs text-neutral-500 text-right">
          Read-only. Only admins can edit the approval policy.
        </p>
      )}
    </div>
  );
}
