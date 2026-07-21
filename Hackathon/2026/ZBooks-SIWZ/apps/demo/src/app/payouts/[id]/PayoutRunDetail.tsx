"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PayoutLineItem, PayoutRunApproval } from "@/lib/types";
import { shortenMiddle } from "@/lib/format";
import { useToast } from "@/components/Toast";
import { useConfirm } from "@/components/ConfirmDialog";
import { RelativeTime } from "@/components/RelativeTime";

interface RunData {
  id: string;
  title: string;
  status: "draft" | "sent" | "reconciled" | "void";
  source_ufvk_id?: string;
  note?: string;
  created_at: number;
  sent_at?: number;
  required_approvals: number;
  items: PayoutLineItem[];
}

interface ApprovalsView {
  required: number;
  validCount: number;
  approved: boolean;
  payloadHash: string;
  approvers: string[];
  valid: PayoutRunApproval[];
  stale: PayoutRunApproval[];
}

interface Preflight {
  count: number;
  totalZec: number;
  feeZec: number;
  requiredZec: number;
  spendableZec: number | null;
  sufficient: boolean | null;
  uri: string | null;
  balance: { totalZatoshi: string; spendableZatoshi: string; unconfirmedZatoshi: string } | null;
  balanceError?: string;
  approvals: ApprovalsView;
}

type IdLabel = { id: string; label: string; address?: string; primary?: boolean };

const zec = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 8 });

interface SourceKeySync {
  syncStatus: string;
  lastSyncedAt?: number;
  lastSyncError?: string;
}

export function PayoutRunDetail({
  run,
  preflight,
  payees,
  keys,
  canEdit,
  currentUserAddress,
  sourceKeySync,
}: {
  run: RunData;
  preflight: Preflight;
  payees: IdLabel[];
  keys: IdLabel[];
  canEdit: boolean;
  currentUserAddress: string;
  sourceKeySync: SourceKeySync | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const [isPending, startTransition] = useTransition();
  const [payOpen, setPayOpen] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [freshPreflight, setFreshPreflight] = useState<Preflight | null>(null);

  const refresh = () => router.refresh();
  const act = (fn: () => Promise<unknown>) => startTransition(async () => { await fn(); refresh(); });

  // The page-load preflight can go stale before the user clicks Pay. Re-query
  // treasury balance + rebuild the URI right now, so a sudden balance drop or
  // a freshly-added line is caught before we open the QR.
  const openPay = async () => {
    setPayLoading(true);
    try {
      const res = await fetch(`/api/payouts/${run.id}/preflight`, { method: "POST" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast({ message: j.error ?? "Could not refresh treasury balance.", tone: "error" });
        return;
      }
      const fresh = (await res.json()) as Preflight;
      setFreshPreflight(fresh);
      if (fresh.count === 0) {
        toast({ message: "Nothing to pay: no completed unpaid lines.", tone: "error" });
        return;
      }
      if (!fresh.approvals.approved) {
        const need = fresh.approvals.required - fresh.approvals.validCount;
        toast({
          message: `Awaiting ${need} more approval${need === 1 ? "" : "s"} before this batch can be paid.`,
          tone: "error",
        });
        return;
      }
      if (fresh.sufficient === false) {
        toast({
          message: `Treasury short of ${zec(fresh.requiredZec)} ZEC right now. Cannot pay.`,
          tone: "error",
        });
        return;
      }
      setPayOpen(true);
    } catch (err) {
      toast({ message: (err as Error).message, tone: "error" });
    } finally {
      setPayLoading(false);
    }
  };

  const approve = (comment: string) =>
    startTransition(async () => {
      const res = await fetch(`/api/payouts/${run.id}/approve`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(comment ? { comment } : {}),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({ message: j.error ?? "Could not record approval.", tone: "error" });
        return;
      }
      toast({ message: "Approval recorded.", tone: "success" });
      refresh();
    });

  const revokeApproval = () =>
    startTransition(async () => {
      const res = await fetch(`/api/payouts/${run.id}/approve`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast({ message: j.error ?? "Could not revoke approval.", tone: "error" });
        return;
      }
      toast({ message: "Approval withdrawn.", tone: "success" });
      refresh();
    });

  const reconcile = () =>
    act(async () => {
      const res = await fetch(`/api/payouts/${run.id}/reconcile?sync=1`, { method: "POST" });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({ message: j.error ?? "Reconcile failed.", tone: "error" });
        return;
      }
      if (j.matched > 0) {
        toast({ message: `Reconciled ${j.matched} payment${j.matched === 1 ? "" : "s"}.`, tone: "success" });
      } else {
        toast({
          message:
            "Treasury synced, no matching payment yet. Shielded txs confirm in ~75s; try again in a minute.",
        });
      }
    });

  const setStatus = (status: RunData["status"]) =>
    act(async () => {
      await fetch(`/api/payouts/${run.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
    });

  const deleteRun = async () => {
    const ok = await confirm({
      title: `Delete "${run.title}"?`,
      body: "The run and all its line items are removed. Synced treasury transactions are untouched.",
      confirmLabel: "Delete run",
      tone: "danger",
    });
    if (!ok) return;
    startTransition(async () => {
      await fetch(`/api/payouts/${run.id}`, { method: "DELETE" });
      router.push("/payouts");
    });
  };

  const sourceKey = keys.find((k) => k.id === run.source_ufvk_id);
  const completed = run.items.filter((i) => i.work_status === "completed");
  const paidCount = run.items.filter((i) => i.pay_status === "paid").length;
  const unpaidCompletedCount = completed.length - paidCount;

  // Auto-poll after the run is marked sent: shielded txs take ~75s to confirm,
  // and once they do the treasurer shouldn't have to click anything.
  const watchUntilRef = useRef<number>(0);
  const [watching, setWatching] = useState(false);
  useEffect(() => {
    if (run.status !== "sent") return;
    if (unpaidCompletedCount === 0) return;
    if (!run.source_ufvk_id) return;
    watchUntilRef.current = Date.now() + 5 * 60_000;
    setWatching(true);
    const tick = async () => {
      if (Date.now() > watchUntilRef.current) {
        setWatching(false);
        return;
      }
      try {
        const res = await fetch(`/api/payouts/${run.id}/reconcile?sync=1`, { method: "POST" });
        if (res.ok) {
          const j = await res.json();
          if (j.matched > 0) {
            setWatching(false);
            router.refresh();
            return;
          }
        }
      } catch {}
    };
    const t = setInterval(tick, 45_000);
    const initial = setTimeout(tick, 4_000);
    return () => {
      clearInterval(t);
      clearTimeout(initial);
      setWatching(false);
    };
  }, [run.status, run.id, run.source_ufvk_id, unpaidCompletedCount, router]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Link href="/payouts" className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 w-fit">
          ← All runs
        </Link>
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{run.title}</h1>
          <span className="text-xs text-neutral-500">
            {sourceKey ? `from ${sourceKey.label}` : "no treasury key set"}
          </span>
        </div>
      </div>

      <PreflightBanner
        preflight={preflight}
        canEdit={canEdit}
        disabled={isPending || payLoading}
        onPay={openPay}
        onReconcile={reconcile}
        sourceKeySync={sourceKeySync}
        watching={watching}
      />

      {run.status === "draft" && run.required_approvals > 1 && (
        <ApprovalsPanel
          approvals={preflight.approvals}
          currentUserAddress={currentUserAddress}
          canApprove={canEdit}
          disabled={isPending}
          onApprove={approve}
          onRevoke={revokeApproval}
        />
      )}

      <p className="text-xs text-neutral-500 leading-relaxed -mt-2">
        {sourceKey ? (
          <>
            Payments are detected automatically from <strong>{sourceKey.label}</strong>. Pay the
            batch, hit <strong>I&apos;ve sent it</strong>, then ZBooks watches the chain for ~5
            minutes and marks each line paid as soon as the tx confirms (shielded ~75s).
            <strong> Check for payments</strong> forces a re-check now. A row&apos;s{" "}
            <strong>Mark paid</strong> button is only the manual fallback if you paid from a
            wallet ZBooks isn&apos;t watching.
          </>
        ) : (
          <span className="text-amber-600 dark:text-amber-400">
            No paying wallet is set for this run, so payments cannot be auto-detected. Add the
            wallet you pay from on the Keys page and set it as this run&apos;s source.
          </span>
        )}
      </p>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold tracking-tight">
            Line items{" "}
            <span className="text-neutral-500 font-normal">
              ({completed.length} completed · {paidCount} paid)
            </span>
          </h2>
        </div>

        {run.items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-center text-sm text-neutral-500">
            No line items yet. Add a payee below.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {run.items.map((item) => (
              <ItemRow
                key={item.id}
                runId={run.id}
                item={item}
                canEdit={canEdit}
                approvalsCleared={preflight.approvals.approved}
                onChanged={refresh}
              />
            ))}
          </ul>
        )}
      </section>

      {canEdit && <AddItem runId={run.id} payees={payees} onAdded={refresh} />}

      {canEdit && (
        <section className="flex flex-wrap items-center gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
          {run.status === "draft" && (
            <button
              onClick={async () => {
                const ok = await confirm({
                  title: "Mark run as sent?",
                  body:
                    "Confirm you have broadcast this batch from your wallet. ZBooks will then watch the treasury for ~5 minutes and mark each line paid as the tx confirms. Use Void run instead if you have not paid yet.",
                  confirmLabel: "Yes, I have paid",
                });
                if (ok) setStatus("sent");
              }}
              disabled={isPending || !preflight.approvals.approved}
              title={
                !preflight.approvals.approved
                  ? `Awaiting ${preflight.approvals.required - preflight.approvals.validCount} more approval(s)`
                  : undefined
              }
              className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
            >
              Mark run as sent
            </button>
          )}
          {run.status !== "void" && (
            <button
              onClick={() => setStatus("void")}
              disabled={isPending}
              className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Void run
            </button>
          )}
          <button
            onClick={deleteRun}
            disabled={isPending}
            className="text-xs rounded-md border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 px-2.5 py-1 ml-auto"
          >
            Delete run
          </button>
        </section>
      )}

      {payOpen && (
        <PayModal
          runId={run.id}
          preflight={freshPreflight ?? preflight}
          onClose={() => setPayOpen(false)}
          onSent={() => {
            setPayOpen(false);
            setStatus("sent");
          }}
        />
      )}
    </div>
  );
}

function PreflightBanner({
  preflight,
  canEdit,
  disabled,
  onPay,
  onReconcile,
  sourceKeySync,
  watching,
}: {
  preflight: Preflight;
  canEdit: boolean;
  disabled: boolean;
  onPay: () => void;
  onReconcile: () => void;
  sourceKeySync: SourceKeySync | null;
  watching: boolean;
}) {
  const { count, totalZec, feeZec, requiredZec, spendableZec, sufficient } = preflight;
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <Stat label="To pay" value={`${count} line${count === 1 ? "" : "s"}`} />
        <Stat label="Total" value={`${zec(totalZec)} ZEC`} />
        <Stat label="Est. fee" value={`${zec(feeZec)} ZEC`} hint="ZIP 317" />
        <Stat label="Required" value={`${zec(requiredZec)} ZEC`} />
      </div>

      {sourceKeySync && (
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500 -mt-2">
          {watching ? (
            <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Watching for payments. Auto-checks every ~45s for 5 minutes.
            </span>
          ) : sourceKeySync.lastSyncedAt ? (
            <>
              Treasury last synced{" "}
              <RelativeTime ts={sourceKeySync.lastSyncedAt} className="font-medium" />.
              {sourceKeySync.syncStatus === "syncing" && (
                <span className="text-amber-600 dark:text-amber-400">syncing now…</span>
              )}
            </>
          ) : (
            <span>Treasury not synced yet.</span>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-neutral-100 dark:border-neutral-800">
        <div className="text-sm">
          {spendableZec == null ? (
            <span className="text-neutral-500">
              Treasury balance unknown
              {preflight.balanceError === "no-source"
                ? " (no treasury UFVK set on this run)"
                : preflight.balanceError === "no-backend"
                ? " (no shielded backend configured: set LIGHTWALLET_RPC_URL or SIWZ_DEMO=1)"
                : preflight.balanceError?.startsWith("fetch-failed:")
                ? ` (backend error: ${preflight.balanceError.replace("fetch-failed: ", "")})`
                : " (backend didn't respond)"}
              .
            </span>
          ) : sufficient ? (
            <span className="text-emerald-700 dark:text-emerald-400">
              ✓ Treasury spendable {zec(spendableZec)} ZEC, enough to cover this run.
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400">
              ✗ Treasury spendable {zec(spendableZec)} ZEC, short of the {zec(requiredZec)} ZEC needed.
            </span>
          )}
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <button
              onClick={onReconcile}
              disabled={disabled}
              title="Sync the paying wallet and mark any detected payments paid automatically"
              className="text-sm rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
            >
              {disabled ? "Checking…" : "Check for payments"}
            </button>
            <button
              onClick={onPay}
              disabled={disabled || count === 0 || sufficient === false || !preflight.approvals.approved}
              title={
                !preflight.approvals.approved
                  ? `Awaiting ${preflight.approvals.required - preflight.approvals.validCount} more approval(s)`
                  : undefined
              }
              className="text-sm rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              Pay batch ({count})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ApprovalsPanel({
  approvals,
  currentUserAddress,
  canApprove,
  disabled,
  onApprove,
  onRevoke,
}: {
  approvals: ApprovalsView;
  currentUserAddress: string;
  canApprove: boolean;
  disabled: boolean;
  onApprove: (comment: string) => void;
  onRevoke: () => void;
}) {
  const [comment, setComment] = useState("");
  const allowlistOn = approvals.approvers.length > 0;
  const eligible = canApprove && (!allowlistOn || approvals.approvers.includes(currentUserAddress));
  const mine = approvals.valid.find((a) => a.approver_address === currentUserAddress);
  const pct = Math.min(100, Math.round((approvals.validCount / Math.max(1, approvals.required)) * 100));

  return (
    <section className={`rounded-xl border p-5 flex flex-col gap-4 ${
      approvals.approved
        ? "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/10"
        : "border-amber-300 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/10"
    }`}>
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Approvals{" "}
            <span className="font-normal text-neutral-500">
              · {approvals.validCount} of {approvals.required}
            </span>
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
            Multi-party approval. Editing any line item resets the count.
            {approvals.stale.length > 0 && (
              <>
                {" "}
                <span className="text-amber-700 dark:text-amber-400">
                  {approvals.stale.length} stale approval{approvals.stale.length === 1 ? "" : "s"} from before the last edit.
                </span>
              </>
            )}
          </p>
        </div>
        {approvals.approved ? (
          <span className="text-xs uppercase tracking-wide rounded px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            cleared
          </span>
        ) : (
          <span className="text-xs uppercase tracking-wide rounded px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            pending
          </span>
        )}
      </div>

      <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <div
          className={`h-full ${approvals.approved ? "bg-emerald-500" : "bg-amber-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {approvals.valid.length > 0 && (
        <ul className="flex flex-col gap-2 text-sm">
          {approvals.valid.map((a) => (
            <li key={a.id} className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">✓</span>
              <div className="flex-1 min-w-0">
                <code className="font-mono text-xs">{shortenMiddle(a.approver_address)}</code>
                <span className="text-xs text-neutral-500 ml-2">
                  {new Date(a.approved_at).toLocaleString()}
                </span>
                {a.comment && (
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                    &ldquo;{a.comment}&rdquo;
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {!canApprove ? (
        <p className="text-xs text-neutral-500">
          Viewer role. Only treasurers and admins can approve payouts.
        </p>
      ) : !eligible ? (
        <p className="text-xs text-neutral-500">
          You are not on the approver allowlist. Ask an admin to add your address on{" "}
          <Link href="/settings/approvals" className="underline">Settings → Approvals</Link>.
        </p>
      ) : mine ? (
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-xs text-neutral-500">You approved this batch.</span>
          <button
            onClick={onRevoke}
            disabled={disabled}
            className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
          >
            Withdraw approval
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onApprove(comment.trim());
            setComment("");
          }}
          className="flex flex-col gap-2 pt-1 border-t border-neutral-200 dark:border-neutral-800"
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional comment (e.g. amounts cross-checked against Dework)"
            maxLength={500}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
          />
          <button
            type="submit"
            disabled={disabled}
            className="self-end text-sm rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            Approve this batch
          </button>
        </form>
      )}
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] uppercase tracking-wide text-neutral-500">
        {label}
        {hint && <span className="ml-1 normal-case text-neutral-400">· {hint}</span>}
      </span>
      <span className="font-semibold tracking-tight">{value}</span>
    </div>
  );
}

function ItemRow({
  runId,
  item,
  canEdit,
  approvalsCleared,
  onChanged,
}: {
  runId: string;
  item: PayoutLineItem;
  canEdit: boolean;
  approvalsCleared: boolean;
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const [amount, setAmount] = useState(String(item.amount_zec));
  const [memo, setMemo] = useState(item.memo ?? "");
  const [isPending, startTransition] = useTransition();

  const patch = (body: Record<string, unknown>) =>
    startTransition(async () => {
      const res = await fetch(`/api/payouts/${runId}/items/${item.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast({ message: j.error ?? "Update failed.", tone: "error" });
      }
      onChanged();
    });

  const remove = () =>
    startTransition(async () => {
      await fetch(`/api/payouts/${runId}/items/${item.id}`, { method: "DELETE" });
      onChanged();
    });

  const paid = item.pay_status === "paid";
  const completed = item.work_status === "completed";

  return (
    <li
      className={`rounded-xl border p-3 sm:p-4 flex flex-col gap-2 ${
        paid
          ? "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/10"
          : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40"
      }`}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-medium">{item.label}</span>
        {paid ? (
          <span className="text-[10px] uppercase tracking-wide rounded px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            paid · {item.reconciled ? "auto" : "manual"}
          </span>
        ) : (
          <button
            disabled={!canEdit || isPending}
            onClick={() => patch({ workStatus: completed ? "in_progress" : "completed" })}
            className={`text-[10px] uppercase tracking-wide rounded px-2 py-0.5 ${
              completed
                ? "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800"
            } disabled:opacity-60`}
            title={canEdit ? "Toggle completed / in progress" : undefined}
          >
            {completed ? "completed" : "in progress"}
          </button>
        )}
        {item.pay_status === "failed" && (
          <span className="text-[10px] uppercase tracking-wide rounded px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300">
            failed
          </span>
        )}
        <code title={item.address} className="font-mono text-[11px] text-neutral-500 flex-1 min-w-0">{shortenMiddle(item.address)}</code>
      </div>

      <div className="flex items-center gap-3 flex-wrap text-sm">
        <label className="flex items-center gap-1.5">
          <span className="text-[11px] text-neutral-500">ZEC</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => {
              const n = Number(amount);
              if (Number.isFinite(n) && n > 0 && n !== item.amount_zec) patch({ amountZec: n });
            }}
            disabled={!canEdit || paid || isPending}
            inputMode="decimal"
            className="w-28 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1 font-mono text-xs disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
          />
        </label>
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={() => {
            if (memo !== (item.memo ?? "")) patch({ memo });
          }}
          disabled={!canEdit || paid || isPending}
          placeholder="memo (shielded only)"
          maxLength={400}
          className="flex-1 min-w-[10rem] rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1 text-xs disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
        />

        {canEdit && (
          <div className="flex gap-1.5 ml-auto">
            {paid ? (
              <button
                onClick={() => patch({ action: "mark_unpaid" })}
                disabled={isPending}
                className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Mark unpaid
              </button>
            ) : (
              <button
                onClick={() => patch({ action: "mark_paid" })}
                disabled={isPending || !approvalsCleared}
                title={
                  !approvalsCleared
                    ? "Awaiting approval before any line can be marked paid"
                    : "Manual fallback for payments made outside the batch. Normal batch payouts settle via Check for payments."
                }
                className="text-xs rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
              >
                Mark paid
              </button>
            )}
            <button
              onClick={remove}
              disabled={isPending}
              className="text-xs rounded-md border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {item.txid && (
        <code className="font-mono text-[10px] text-neutral-400 break-all">tx {item.txid}</code>
      )}
    </li>
  );
}

function AddItem({
  runId,
  payees,
  onAdded,
}: {
  runId: string;
  payees: IdLabel[];
  onAdded: () => void;
}) {
  const { toast } = useToast();
  const [payeeId, setPayeeId] = useState(payees[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [completed, setCompleted] = useState(true);
  const [isPending, startTransition] = useTransition();

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(amount);
    if (!payeeId) {
      toast({ message: "Add a payee first (on the Payouts page).", tone: "error" });
      return;
    }
    if (!Number.isFinite(n) || n <= 0) {
      toast({ message: "Enter a positive amount.", tone: "error" });
      return;
    }
    startTransition(async () => {
      const res = await fetch(`/api/payouts/${runId}/items`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          payeeId,
          amountZec: n,
          memo: memo || undefined,
          workStatus: completed ? "completed" : "in_progress",
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({ message: j.error ?? "Could not add line.", tone: "error" });
        return;
      }
      setAmount("");
      setMemo("");
      onAdded();
    });
  };

  return (
    <form
      onSubmit={add}
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 flex flex-col gap-3"
    >
      <div className="text-sm font-semibold tracking-tight">Add line item</div>
      <div className="grid sm:grid-cols-[1fr_120px_1fr_auto] gap-3 items-end">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-neutral-500">Payee</span>
          <select
            value={payeeId}
            onChange={(e) => setPayeeId(e.target.value)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
          >
            {payees.length === 0 && <option value="">No payees yet</option>}
            {payees.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-neutral-500">Amount (ZEC)</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            placeholder="0.5"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-neutral-500">Memo (optional)</span>
          <input
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Dev task, completed"
            maxLength={400}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-zcash-yellow/40"
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
        >
          Add
        </button>
      </div>
      <label className="flex items-center gap-2 text-xs text-neutral-500">
        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        Work is completed (include in the batch). Uncheck for in-progress.
      </label>
    </form>
  );
}

function PayModal({
  runId,
  preflight,
  onClose,
  onSent,
}: {
  runId: string;
  preflight: Preflight;
  onClose: () => void;
  onSent: () => void;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const uri = preflight.uri ?? "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(uri);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast({ message: "Copy failed. Select the URI manually.", tone: "error" });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold tracking-tight">Pay {preflight.count} in one batch</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">✕</button>
        </div>

        <div className="rounded-xl bg-white p-3 self-center border border-neutral-200">
          {/* SVG from the server; cache-busted so it reflects current items. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/payouts/${runId}/qr?t=${Date.now()}`}
            alt="Batch payment QR"
            width={280}
            height={280}
          />
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed text-center">
          Scan in a <strong>multi-recipient</strong> wallet (today: <strong>YWallet</strong> and{" "}
          <strong>ZODL</strong>). Single-recipient wallets (Zingo, Cake, Brave) only pay the first
          line. For those, copy the URI and pay each recipient one by one.
        </p>

        <div className="flex gap-2">
          <button
            onClick={copy}
            className="flex-1 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {copied ? "Copied ✓" : "Copy URI"}
          </button>
          <a
            href={uri}
            className="flex-1 text-center text-sm rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3 py-2 hover:bg-yellow-400"
          >
            Open in wallet
          </a>
        </div>

        <button
          onClick={onSent}
          className="text-sm rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          I&apos;ve sent it → mark run as sent
        </button>
        <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
          After it confirms, hit <strong>Reconcile</strong>. ZBooks matches the
          payments back to these lines automatically.
        </p>
      </div>
    </div>
  );
}
