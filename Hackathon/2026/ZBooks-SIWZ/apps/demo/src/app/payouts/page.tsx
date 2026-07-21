import { redirect } from "next/navigation";
import Link from "next/link";
import { listKeys, listPayees, listRuns } from "@/lib/db";
import { canManagePayouts, currentUser } from "@/lib/session";
import { Pagination, parsePageParam } from "@/components/Pagination";
import { NewRunForm } from "./NewRunForm";
import { PayeesManager } from "./PayeesManager";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 15;

interface SearchParams {
  page?: string | string[];
}

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  sent: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  reconciled: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  void: "bg-neutral-100 text-neutral-400 line-through dark:bg-neutral-800",
};

export default async function PayoutsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const user = await currentUser();
  if (!user) redirect("/");
  // Viewers can browse runs and line items. Write actions are gated below.

  const runs = await listRuns();
  const payees = await listPayees();
  const keys = (await listKeys()).map((k) => ({ id: k.id, label: k.label, primary: k.primary }));
  const canEdit = canManagePayouts(user.role);

  const page = parsePageParam(searchParams?.page);
  const totalRuns = runs.length;
  const offset = (page - 1) * PAGE_SIZE;
  const pagedRuns = runs.slice(offset, offset + PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Payouts</h1>
        <div className="text-xs text-neutral-500">role: {user.role}</div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
        Build a payout run from completed work, then pay everyone in a single
        batch transaction. One wallet scan, one confirmation. ZBooks watches
        the treasury and reconciles each payment back to its line automatically.
        Non-custodial: ZBooks never holds a spending key.
      </p>

      {canEdit && (
        <div className="flex flex-col gap-3">
          <NewRunForm keys={keys} />
          <div className="text-xs text-neutral-500 flex items-center gap-3 flex-wrap">
            <span>Import from:</span>
            <Link
              href="/payouts/sources/zec-bounties"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 hover:border-zcash-yellow/60 hover:bg-zcash-yellow/5 transition-colors text-neutral-700 dark:text-neutral-300 font-medium"
            >
              <span aria-hidden>🪙</span> ZecBounties
            </Link>
          </div>
        </div>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold tracking-tight">
          Runs <span className="text-neutral-500 font-normal">({totalRuns})</span>
        </h2>
        {totalRuns === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-center text-sm text-neutral-500">
            No payout runs yet. {canEdit ? "Create one above." : "Ask a treasurer to create one."}
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {pagedRuns.map((r) => {
              const completed = r.items.filter((i) => i.work_status === "completed");
              const paid = r.items.filter((i) => i.pay_status === "paid");
              const totalToPay = completed
                .filter((i) => i.pay_status !== "paid")
                .reduce((s, i) => s + i.amount_zec, 0);
              return (
                <li key={r.id}>
                  <Link
                    href={`/payouts/${r.id}`}
                    className="block rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 hover:border-zcash-yellow/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold tracking-tight">{r.title}</div>
                      <span className={`text-[10px] uppercase tracking-wide rounded px-2 py-0.5 font-medium ${STATUS_STYLE[r.status] ?? ""}`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 flex gap-3 flex-wrap pt-2">
                      <span>{r.items.length} line{r.items.length === 1 ? "" : "s"}</span>
                      <span>{completed.length} completed</span>
                      <span>{paid.length} paid</span>
                      {totalToPay > 0 && (
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {totalToPay.toLocaleString(undefined, { maximumFractionDigits: 8 })} ZEC to pay
                        </span>
                      )}
                      <span>created {new Date(r.created_at).toLocaleDateString()}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {totalRuns > 0 && (
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={totalRuns}
            basePath="/payouts"
            label="runs"
          />
        )}
      </section>

      <PayeesManager payees={payees} canEdit={canEdit} />
    </div>
  );
}
