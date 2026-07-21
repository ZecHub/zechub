"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  resolveAssignee,
  type BountyBlockReason,
  type BountyImportCandidate,
} from "@/lib/zec-bounties";

interface Props {
  payable: BountyImportCandidate[];
  pickable: BountyImportCandidate[];
  blocked: BountyImportCandidate[];
  zbooksNetwork: string;
  draftRuns: { id: string; title: string }[];
  keys: { id: string; label: string }[];
}

type TargetMode = "new" | "existing";

const REASON_ORDER: BountyBlockReason[] = [
  "in_progress",
  "not_approved",
  "already_paid",
  "multi_assignee",
  "no_assignee",
  "no_address",
  "amount_zero",
  "network_mismatch",
  "address_unknown",
  "cancelled",
];

const REASON_HEADING: Record<BountyBlockReason, string> = {
  payable: "Ready to pay",
  needs_assignee_pick: "Pick a payee",
  in_progress: "Work in progress",
  not_approved: "Not yet approved",
  already_paid: "Already paid upstream",
  multi_assignee: "Multiple assignees, none with a usable address",
  no_assignee: "No assignee set",
  no_address: "Assignee has no address on file",
  amount_zero: "Amount is zero",
  network_mismatch: "Wrong network",
  address_unknown: "Unrecognised address format",
  cancelled: "Cancelled upstream",
};

function displayAssignee(c: BountyImportCandidate): { name: string; address?: string } {
  const auto = resolveAssignee(c.bounty);
  if (auto && auto !== "multi") {
    // Prefer the resolved payout address (network-matched) if set, otherwise
    // fall back to whichever address is present on the user for display.
    return {
      name: auto.name ?? "(no name)",
      address: c.payoutAddress ?? auto.UA_address ?? auto.z_address ?? undefined,
    };
  }
  return { name: c.bounty.assigneeUser?.name ?? "(unassigned)" };
}

export function ImportClient({ payable, pickable, blocked, zbooksNetwork, draftRuns, keys }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  // For each pickable bounty, which assignee userId the treasurer chose.
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [targetMode, setTargetMode] = useState<TargetMode>("new");
  const [newTitle, setNewTitle] = useState(`ZecBounties · ${new Date().toISOString().slice(0, 10)}`);
  const [sourceUfvkId, setSourceUfvkId] = useState<string>(keys[0]?.id ?? "");
  const [existingRunId, setExistingRunId] = useState<string>(draftRuns[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === payable.length) setSelected(new Set());
    else setSelected(new Set(payable.map((c) => c.bounty.id)));
  };

  const setPick = (bountyId: string, userId: string) => {
    setPicks((prev) => ({ ...prev, [bountyId]: userId }));
    if (!userId) {
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(bountyId);
        return next;
      });
    }
  };

  const total = useMemo(() => {
    let sum = 0;
    for (const c of payable) {
      if (selected.has(c.bounty.id)) sum += c.bounty.bountyAmount;
    }
    for (const c of pickable) {
      if (selected.has(c.bounty.id) && picks[c.bounty.id]) sum += c.bounty.bountyAmount;
    }
    return sum;
  }, [payable, pickable, selected, picks]);

  // Group blocked by reason for the "Other bounties" section.
  const grouped = useMemo(() => {
    const map = new Map<BountyBlockReason, BountyImportCandidate[]>();
    for (const c of blocked) {
      const arr = map.get(c.reason) ?? [];
      arr.push(c);
      map.set(c.reason, arr);
    }
    return REASON_ORDER.filter((r) => map.has(r)).map((r) => ({
      reason: r,
      items: map.get(r)!,
    }));
  }, [blocked]);

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const target =
        targetMode === "existing" && existingRunId
          ? { type: "existing" as const, runId: existingRunId }
          : { type: "new" as const, title: newTitle, sourceUfvkId: sourceUfvkId || undefined };
      // Only forward picks for bounties that are actually selected.
      const assigneeOverrides: Record<string, string> = {};
      for (const id of selected) if (picks[id]) assigneeOverrides[id] = picks[id]!;
      const res = await fetch("/api/payouts/import-zec-bounties", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          bountyIds: Array.from(selected),
          assigneeOverrides,
          target,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        runId?: string;
        added?: number;
        skipped?: { id: string; reason: string }[];
      };
      if (!res.ok) {
        setError(json.error ?? `HTTP ${res.status}`);
        return;
      }
      router.push(`/payouts/${json.runId}`);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-xs text-neutral-500 flex items-center gap-3 flex-wrap">
        <span>
          ZBooks network: <span className="font-mono">{zbooksNetwork}</span>
        </span>
        <span>
          {payable.length} ready · {blocked.length} blocked
        </span>
        {payable.length > 0 && (
          <button
            type="button"
            onClick={toggleAll}
            className="text-zcash-yellow hover:underline"
          >
            {selected.size === payable.length ? "Deselect all" : "Select all"}
          </button>
        )}
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-base font-semibold tracking-tight">
          Ready to pay <span className="text-neutral-500 font-normal">({payable.length})</span>
        </h2>
        {payable.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-sm text-neutral-500">
            No bounties currently match: status in (IN_PROGRESS, IN_REVIEW, DONE), not paid yet, with a single assignee on{" "}
            <code className="font-mono text-xs">{zbooksNetwork}</code>.
            {pickable.length > 0 && (
              <> See "Pick a payee" below for multi-assignee bounties you can still resolve.</>
            )}
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {payable.map((c) => {
              const checked = selected.has(c.bounty.id);
              const who = displayAssignee(c);
              return (
                <li key={c.bounty.id}>
                  <label
                    className={`block rounded-xl border p-4 cursor-pointer transition-colors ${
                      checked
                        ? "border-zcash-yellow bg-zcash-yellow/5"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(c.bounty.id)}
                        className="mt-1 h-4 w-4 accent-zcash-yellow"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="font-semibold tracking-tight truncate">{c.bounty.title}</div>
                          <div className="font-mono text-sm tabular-nums whitespace-nowrap">
                            {c.bounty.bountyAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })} ZEC
                          </div>
                        </div>
                        <div className="text-xs text-neutral-500 flex flex-wrap gap-x-3 gap-y-1 pt-1">
                          <span>{who.name}</span>
                          <span>status: {c.bounty.status}</span>
                          {c.bounty.categoryId && <span>{c.bounty.categoryId}</span>}
                          <span>created {new Date(c.bounty.dateCreated).toLocaleDateString()}</span>
                        </div>
                        {who.address && (
                          <div className="font-mono text-[10px] text-neutral-400 truncate pt-1">{who.address}</div>
                        )}
                      </div>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {pickable.length > 0 && (
        <section className="flex flex-col gap-2">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Pick a payee <span className="text-neutral-500 font-normal">({pickable.length})</span>
            </h2>
            <p className="text-xs text-neutral-500 pt-1">
              These bounties have multiple assignees. Choose one payee per bounty and check the box to include it. The full bounty amount goes to the picked address. ZecHub picks a single payee at finalisation; you can pick earlier here.
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {pickable.map((c) => {
              const checked = selected.has(c.bounty.id);
              const chosen = picks[c.bounty.id] ?? "";
              const picksList = c.pickableAssignees ?? [];
              const canCheck = !!chosen;
              return (
                <li key={c.bounty.id}>
                  <div
                    className={`rounded-xl border p-4 transition-colors ${
                      checked
                        ? "border-zcash-yellow bg-zcash-yellow/5"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={!canCheck}
                        onChange={() => toggle(c.bounty.id)}
                        className="mt-1 h-4 w-4 accent-zcash-yellow disabled:opacity-40"
                      />
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="font-semibold tracking-tight truncate">{c.bounty.title}</div>
                          <div className="font-mono text-sm tabular-nums whitespace-nowrap">
                            {c.bounty.bountyAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })} ZEC
                          </div>
                        </div>
                        <div className="text-xs text-neutral-500 flex flex-wrap gap-x-3 gap-y-1">
                          <span>{c.bounty.assignees?.length ?? picksList.length} assignees</span>
                          <span>status: {c.bounty.status}</span>
                          {c.bounty.categoryId && <span>{c.bounty.categoryId}</span>}
                          <span>created {new Date(c.bounty.dateCreated).toLocaleDateString()}</span>
                        </div>
                        <label className="flex items-center gap-2 text-xs">
                          <span className="text-neutral-500">Pay to:</span>
                          <select
                            value={chosen}
                            onChange={(e) => setPick(c.bounty.id, e.target.value)}
                            className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1 text-xs"
                          >
                            <option value="">Choose a payee</option>
                            {picksList.map((p) => (
                              <option key={p.userId} value={p.userId}>
                                {p.name} ({p.z_address.slice(0, 12)}...{p.z_address.slice(-6)})
                              </option>
                            ))}
                          </select>
                        </label>
                        {chosen && (
                          <div className="font-mono text-[10px] text-neutral-400 truncate">
                            {picksList.find((p) => p.userId === chosen)?.z_address}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {selected.size > 0 && (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <div className="text-sm">
              <span className="font-semibold">{selected.size}</span> selected ·{" "}
              <span className="font-mono">
                {total.toLocaleString(undefined, { maximumFractionDigits: 8 })} ZEC
              </span>{" "}
              total
            </div>
          </div>

          <fieldset className="flex flex-col gap-3 text-sm">
            <label className="flex items-start gap-2">
              <input
                type="radio"
                name="target"
                value="new"
                checked={targetMode === "new"}
                onChange={() => setTargetMode("new")}
                className="mt-1 accent-zcash-yellow"
              />
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-medium">Create new payout run</span>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  disabled={targetMode !== "new"}
                  placeholder="Run title"
                  className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-1.5 text-sm disabled:opacity-50"
                />
                {keys.length > 0 && (
                  <select
                    value={sourceUfvkId}
                    onChange={(e) => setSourceUfvkId(e.target.value)}
                    disabled={targetMode !== "new"}
                    className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-1.5 text-sm disabled:opacity-50"
                  >
                    <option value="">No treasury (pick later)</option>
                    {keys.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </label>

            {draftRuns.length > 0 && (
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="target"
                  value="existing"
                  checked={targetMode === "existing"}
                  onChange={() => setTargetMode("existing")}
                  className="mt-1 accent-zcash-yellow"
                />
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-medium">Append to existing draft run</span>
                  <select
                    value={existingRunId}
                    onChange={(e) => setExistingRunId(e.target.value)}
                    disabled={targetMode !== "existing"}
                    className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-1.5 text-sm disabled:opacity-50"
                  >
                    {draftRuns.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            )}
          </fieldset>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 rounded-md bg-red-50 dark:bg-red-950/30 px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => router.push("/payouts")}
              className="rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={submitting || selected.size === 0}
              className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-4 py-2 text-sm disabled:opacity-60"
            >
              {submitting ? "Importing…" : `Import ${selected.size} bount${selected.size === 1 ? "y" : "ies"} →`}
            </button>
          </div>
        </div>
      )}

      {blocked.length > 0 && (
        <section className="flex flex-col gap-3 pt-2">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Other bounties{" "}
              <span className="text-neutral-500 font-normal">({blocked.length})</span>
            </h2>
            <p className="text-xs text-neutral-500 pt-1">
              These exist upstream but aren't selectable right now. Grouped by reason.
            </p>
          </div>

          {grouped.map(({ reason, items }) => (
            <details
              key={reason}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/20"
            >
              <summary className="cursor-pointer select-none px-4 py-3 text-sm flex items-center gap-2">
                <span className="font-medium">{REASON_HEADING[reason]}</span>
                <span className="text-neutral-500">({items.length})</span>
              </summary>
              <ul className="flex flex-col gap-1 px-2 pb-2">
                {items.map(({ bounty, network, reasonLabel }) => (
                  <li
                    key={bounty.id}
                    className="rounded-lg bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 p-3 opacity-70"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-medium tracking-tight truncate">{bounty.title}</div>
                      <div className="font-mono text-xs tabular-nums whitespace-nowrap">
                        {bounty.bountyAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })} ZEC
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-500 pt-1 flex flex-wrap gap-x-3">
                      <span>{bounty.assigneeUser?.name ?? "(unassigned)"}</span>
                      {bounty.categoryId && <span>{bounty.categoryId}</span>}
                      <span className="font-mono">{network}</span>
                      <span>status: {bounty.status}</span>
                    </div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 pt-1">
                      {reasonLabel}
                    </div>
                    {(bounty.assigneeUser?.UA_address || bounty.assigneeUser?.z_address) && (
                      <div className="font-mono text-[10px] text-neutral-400 truncate pt-1">
                        {bounty.assigneeUser?.UA_address || bounty.assigneeUser?.z_address}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </section>
      )}
    </div>
  );
}
