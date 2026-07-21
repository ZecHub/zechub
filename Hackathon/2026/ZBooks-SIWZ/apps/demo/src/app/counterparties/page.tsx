import { redirect } from "next/navigation";
import { listCounterparties, listTransactions } from "@/lib/db";
import { canTag, currentUser } from "@/lib/session";
import { parsePageParam } from "@/components/Pagination";
import { CounterpartiesList } from "./CounterpartiesList";

export const dynamic = "force-dynamic";

const UNLABELLED_PAGE_SIZE = 50;

interface SearchParams {
  page?: string | string[];
}

export default async function CounterpartiesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const user = await currentUser();
  if (!user) redirect("/");

  const saved = await listCounterparties();
  const txs = await listTransactions();

  const stats = new Map<string, { count: number; totalIn: number; totalOut: number; latest: number }>();
  for (const t of txs) {
    if (!t.counterparty) continue;
    const cur = stats.get(t.counterparty) ?? { count: 0, totalIn: 0, totalOut: 0, latest: 0 };
    cur.count++;
    if (t.amount_zec >= 0) cur.totalIn += t.amount_zec;
    else cur.totalOut += Math.abs(t.amount_zec);
    if (t.timestamp > cur.latest) cur.latest = t.timestamp;
    stats.set(t.counterparty, cur);
  }

  const savedSet = new Set(saved.map((c) => c.address));
  const unlabelledAll = [...stats.entries()]
    .filter(([addr]) => !savedSet.has(addr))
    .map(([address, s]) => ({ address, ...s }))
    .sort((a, b) => b.count - a.count);

  const savedWithStats = saved.map((c) => ({
    ...c,
    stats: stats.get(c.address) ?? { count: 0, totalIn: 0, totalOut: 0, latest: 0 },
  }));

  const unlabelledPage = parsePageParam(searchParams?.page);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
        <div className="text-xs text-neutral-500">role: {user.role}</div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
        Label the addresses you transact with once and the friendly name
        renders everywhere on transactions, reports, and the audit log.
        Labels are team-shared.
      </p>

      <CounterpartiesList
        saved={savedWithStats}
        unlabelled={unlabelledAll}
        canEdit={canTag(user.role)}
        unlabelledPage={unlabelledPage}
        unlabelledPageSize={UNLABELLED_PAGE_SIZE}
      />
    </div>
  );
}
