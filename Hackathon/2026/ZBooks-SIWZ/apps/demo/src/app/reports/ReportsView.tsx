"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORY_LABEL, type Category, type Transaction } from "@/lib/types";
import { filterByMonthRange, monthlyPL } from "@/lib/reports";
import { CategorySplitChart, ContractorSparkline, MonthlyPLChart } from "./ReportsCharts";

interface Props {
  allTxs: Transaction[];
  counterpartyLabels: Record<string, string>;
  priceByDate: Record<string, number>;
}

// Date-range filter drives KPIs, charts, monthly table, contractors, and export URL.
export function ReportsView({ allTxs, counterpartyLabels, priceByDate }: Props) {
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    for (const t of allTxs) {
      const d = new Date(t.timestamp);
      set.add(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
    }
    return [...set].sort();
  }, [allTxs]);

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const txs = useMemo(
    () => filterByMonthRange(allTxs, from || undefined, to || undefined),
    [allTxs, from, to],
  );
  const months = useMemo(() => monthlyPL(txs), [txs]);

  const fmtUsd = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  // Fiat valuation: value each tx at its date's ZEC/USD price. Best effort,
  // some dates may be unpriced if the price feed was unavailable.
  const usd = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    let priced = 0;
    const netByMonth = new Map<string, number>();
    for (const t of txs) {
      const p = priceByDate[new Date(t.timestamp).toISOString().slice(0, 10)];
      if (p == null) continue;
      priced++;
      const v = t.amount_zec * p; // signed; outflows are negative
      if (t.amount_zec >= 0) inflow += v;
      else outflow += -v;
      const d = new Date(t.timestamp);
      const m = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      netByMonth.set(m, (netByMonth.get(m) ?? 0) + v);
    }
    return { inflow, outflow, net: inflow - outflow, priced, netByMonth };
  }, [txs, priceByDate]);
  const hasUsd = usd.priced > 0;

  // Category spend totals → donut
  const categoryChartData = useMemo(() => {
    const totals = new Map<Category, number>();
    for (const t of txs) {
      if (!t.tag) continue;
      if (t.amount_zec >= 0) continue;
      totals.set(t.tag, (totals.get(t.tag) ?? 0) + Math.abs(t.amount_zec));
    }
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([cat, value]) => ({ category: CATEGORY_LABEL[cat], value }));
  }, [txs]);

  // Top contractors + per-month spend series for sparklines
  const contractorRows = useMemo(() => {
    if (months.length === 0) return [];
    const monthIndex = new Map(months.slice().reverse().map((m, i) => [m.month, i]));
    const monthCount = months.length;
    const totals = new Map<string, { total: number; series: number[] }>();
    for (const t of txs) {
      if (t.tag !== "contractor" || !t.counterparty) continue;
      const cur = totals.get(t.counterparty) ?? {
        total: 0,
        series: new Array(monthCount).fill(0),
      };
      cur.total += Math.abs(t.amount_zec);
      const d = new Date(t.timestamp);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      const idx = monthIndex.get(key);
      if (idx != null) cur.series[idx] += Math.abs(t.amount_zec);
      totals.set(t.counterparty, cur);
    }
    return [...totals.entries()]
      .sort((a, b) => b[1].total - a[1].total)
      .map(([address, v]) => ({
        address,
        label: counterpartyLabels[address],
        total: v.total,
        series: v.series,
      }));
  }, [txs, months, counterpartyLabels]);

  const monthChartData = months.map((m) => ({
    month: m.month,
    inflow: m.inflow,
    outflow: m.outflow,
    net: m.net,
  }));

  const totalInflow = months.reduce((s, m) => s + m.inflow, 0);
  const totalOutflow = months.reduce((s, m) => s + m.outflow, 0);
  const untaggedCount = txs.filter((t) => !t.tag).length;

  const exportHref = (() => {
    const u = new URLSearchParams();
    if (from) u.set("from", from);
    if (to) u.set("to", to);
    const qs = u.toString();
    return `/api/reports/export${qs ? `?${qs}` : ""}`;
  })();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <DateRange
            availableMonths={availableMonths}
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
          />
          <a
            href={exportHref}
            className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3.5 py-1.5 text-sm hover:bg-yellow-400 transition-colors"
          >
            Download CSV
          </a>
        </div>
      </div>

      {txs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-sm text-neutral-500">
          No transactions match this range.
        </div>
      ) : (
        <>
          <section className="grid gap-3 sm:grid-cols-3">
            <Kpi label="Total inflow" value={`${totalInflow.toLocaleString()} ZEC`} sub={hasUsd ? fmtUsd(usd.inflow) : undefined} tone="pos" />
            <Kpi label="Total outflow" value={`${totalOutflow.toLocaleString()} ZEC`} sub={hasUsd ? fmtUsd(usd.outflow) : undefined} tone="neg" />
            <Kpi
              label="Net"
              value={`${(totalInflow - totalOutflow).toLocaleString()} ZEC`}
              sub={hasUsd ? fmtUsd(usd.net) : undefined}
              tone={totalInflow >= totalOutflow ? "pos" : "neg"}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <motion.div
              layout
              className="lg:col-span-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-base font-semibold tracking-tight">Monthly P&amp;L</h2>
                <span className="text-xs text-neutral-500">{months.length} months</span>
              </div>
              <MonthlyPLChart data={monthChartData} />
            </motion.div>
            <motion.div
              layout
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-base font-semibold tracking-tight">Spend by category</h2>
                {untaggedCount > 0 && (
                  <span className="text-xs text-neutral-500">{untaggedCount} untagged</span>
                )}
              </div>
              <CategorySplitChart data={categoryChartData} />
            </motion.div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold tracking-tight">Monthly detail</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
              <table className="w-full text-sm">
                <thead className="text-left text-neutral-500 text-xs uppercase tracking-wider bg-neutral-50 dark:bg-neutral-900/50">
                  <tr>
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3 text-right">Inflow</th>
                    <th className="py-2.5 px-3 text-right">Outflow</th>
                    <th className="py-2.5 px-3 text-right">Net</th>
                    {hasUsd && <th className="py-2.5 px-3 text-right">Net (USD)</th>}
                    <th className="py-2.5 px-3 text-right">#</th>
                    <th className="py-2.5 px-3">Top categories</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((m) => {
                    const cats = (Object.entries(m.byCategory) as [Category, { inflow: number; outflow: number }][])
                      .sort((a, b) => Math.abs(b[1].outflow + b[1].inflow) - Math.abs(a[1].outflow + a[1].inflow))
                      .slice(0, 3)
                      .map(([k, v]) => `${CATEGORY_LABEL[k]} (${(v.inflow - v.outflow).toLocaleString()})`)
                      .join(", ");
                    return (
                      <tr key={m.month} className="border-t border-neutral-100 dark:border-neutral-800/80">
                        <td className="py-2 px-3 font-mono">{m.month}</td>
                        <td className="py-2 px-3 text-right font-mono text-emerald-700 dark:text-emerald-400">
                          {m.inflow.toLocaleString()}
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-red-700 dark:text-red-400">
                          {m.outflow.toLocaleString()}
                        </td>
                        <td
                          className={`py-2 px-3 text-right font-mono font-semibold ${m.net >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}
                        >
                          {m.net >= 0 ? "+" : ""}
                          {m.net.toLocaleString()}
                        </td>
                        {hasUsd && (
                          <td className="py-2 px-3 text-right font-mono text-neutral-500">
                            {usd.netByMonth.has(m.month) ? fmtUsd(usd.netByMonth.get(m.month)!) : "—"}
                          </td>
                        )}
                        <td className="py-2 px-3 text-right text-neutral-500">{m.count}</td>
                        <td className="py-2 px-3 text-xs text-neutral-500">{cats || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold tracking-tight">Top contractors</h2>
            {contractorRows.length === 0 ? (
              <div className="text-sm text-neutral-500">No transactions tagged as contractor in this range.</div>
            ) : (
              <ul className="flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                {contractorRows.map((c, i) => (
                  <li
                    key={c.address}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm ${i > 0 ? "border-t border-neutral-100 dark:border-neutral-800/80" : ""}`}
                  >
                    <div className="flex-1 min-w-0">
                      {c.label ? (
                        <div className="font-medium truncate">{c.label}</div>
                      ) : null}
                      <code className={`font-mono text-[11px] truncate block ${c.label ? "text-neutral-500" : "text-neutral-600 dark:text-neutral-300"}`}>
                        {c.address}
                      </code>
                    </div>
                    <ContractorSparkline values={c.series} />
                    <span className="font-mono font-semibold text-red-700 dark:text-red-400 w-32 text-right flex-shrink-0">
                      {c.total.toLocaleString()} ZEC
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function DateRange({
  availableMonths,
  from, to,
  setFrom, setTo,
}: {
  availableMonths: string[];
  from: string;
  to: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
}) {
  return (
    <div className="flex gap-1.5 items-center text-xs">
      <span className="text-neutral-500">From</span>
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1"
      >
        <option value="">earliest</option>
        {availableMonths.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <span className="text-neutral-500">to</span>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1"
      >
        <option value="">latest</option>
        {availableMonths.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      {(from || to) && (
        <button
          onClick={() => { setFrom(""); setTo(""); }}
          className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 underline decoration-dotted"
        >
          clear
        </button>
      )}
    </div>
  );
}

function Kpi({ label, value, tone, sub }: { label: string; value: string; tone: "pos" | "neg" | "neutral"; sub?: string }) {
  const toneCls =
    tone === "pos" ? "text-emerald-700 dark:text-emerald-400"
    : tone === "neg" ? "text-red-700 dark:text-red-400"
    : "text-neutral-900 dark:text-neutral-100";
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4">
      <div className="text-[11px] uppercase tracking-wider text-neutral-500">{label}</div>
      <div className={`text-xl font-semibold font-mono mt-1 ${toneCls}`}>{value}</div>
      {sub && <div className="text-xs font-mono text-neutral-500 mt-0.5">{sub}</div>}
    </div>
  );
}
