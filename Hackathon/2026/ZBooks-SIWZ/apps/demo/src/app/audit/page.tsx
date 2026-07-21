import { redirect } from "next/navigation";
import {
  CATEGORY_LABEL,
  counterpartyLabelMap,
  listTransactionsPage,
  type Category,
} from "@/lib/db";
import { currentUser } from "@/lib/session";
import { Pagination, parsePageParam } from "@/components/Pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

interface SearchParams {
  page?: string | string[];
}

// Tagging audit log only. Role changes and key adds aren't tracked here.
export default async function AuditPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const user = await currentUser();
  if (!user) redirect("/");

  const page = parsePageParam(searchParams?.page);
  const offset = (page - 1) * PAGE_SIZE;

  const [{ items: entries, total }, labels] = await Promise.all([
    listTransactionsPage({ limit: PAGE_SIZE, offset, taggedOnly: true }),
    counterpartyLabelMap(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Audit</h1>
        <div className="text-xs text-neutral-500">role: {user.role}</div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
        Every tagging action across all transactions, newest first.
        Useful for quarter-close reviews when you need to know who
        categorised what.
      </p>

      {total === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-sm text-neutral-500">
          Nothing tagged yet. Categorise a transaction on /transactions to start the audit trail.
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-left text-neutral-500 text-xs uppercase tracking-wider bg-neutral-50 dark:bg-neutral-900/50">
                <tr>
                  <th className="py-2.5 px-3">When</th>
                  <th className="py-2.5 px-3">Who</th>
                  <th className="py-2.5 px-3">Counterparty</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Memo</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((t) => {
                  const cpLabel = t.counterparty ? labels.get(t.counterparty) : undefined;
                  return (
                    <tr
                      key={t.id}
                      className="border-t border-neutral-100 dark:border-neutral-800/80 align-top"
                    >
                      <td className="py-2 px-3 whitespace-nowrap text-xs text-neutral-500">
                        {new Date(t.tagged_at!).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                        {shortAddr(t.tagged_by!)}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        {cpLabel ? (
                          <div>
                            <div className="font-medium">{cpLabel}</div>
                            <code className="font-mono text-[10px] text-neutral-500">
                              {shortAddr(t.counterparty!)}
                            </code>
                          </div>
                        ) : t.counterparty ? (
                          <code className="font-mono text-[11px] text-neutral-500">
                            {shortAddr(t.counterparty)}
                          </code>
                        ) : (
                          <span className="text-neutral-400">(none)</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-xs">
                        {t.tag ? CATEGORY_LABEL[t.tag as Category] : <span className="text-neutral-400">untagged</span>}
                      </td>
                      <td className="py-2 px-3 text-xs text-neutral-600 dark:text-neutral-300 max-w-[18rem]">
                        <span className="line-clamp-1">{t.memo ?? <span className="text-neutral-400">(none)</span>}</span>
                        {t.notes && (
                          <span className="block text-[10px] text-neutral-500 line-clamp-1">
                            {t.notes}
                          </span>
                        )}
                      </td>
                      <td className={`py-2 px-3 text-right font-mono text-xs ${
                        t.amount_zec >= 0
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-red-700 dark:text-red-400"
                      }`}>
                        {t.amount_zec >= 0 ? "+" : ""}
                        {t.amount_zec.toLocaleString(undefined, { maximumFractionDigits: 8 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={total}
            basePath="/audit"
            label="tagging events"
          />
        </>
      )}
    </div>
  );
}

function shortAddr(a: string): string {
  if (a.length <= 16) return a;
  return `${a.slice(0, 8)}…${a.slice(-6)}`;
}
