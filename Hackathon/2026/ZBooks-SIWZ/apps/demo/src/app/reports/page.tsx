import { redirect } from "next/navigation";
import { counterpartyLabelMap, listTransactions } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { zecUsdForTimestamps } from "@/lib/fiat";
import { ReportsView } from "./ReportsView";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const txs = await listTransactions();
  const counterpartyLabels = Object.fromEntries((await counterpartyLabelMap()).entries());
  // ZEC/USD per transaction date for fiat valuation (cached in the store).
  const priceByDate = Object.fromEntries((await zecUsdForTimestamps(txs.map((t) => t.timestamp))).entries());

  if (txs.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-sm text-neutral-500">
          No transactions to report yet. Add a viewing key to begin.
        </div>
      </div>
    );
  }

  return <ReportsView allTxs={txs} counterpartyLabels={counterpartyLabels} priceByDate={priceByDate} />;
}
