import { CATEGORY_LABEL, type Category, type Transaction } from "./types";

export interface MonthBucket {
  /** YYYY-MM */
  month: string;
  inflow: number;
  outflow: number;
  net: number;
  byCategory: Partial<Record<Category, { inflow: number; outflow: number }>>;
  count: number;
}

// Groups by calendar month (UTC), most-recent first.
export function monthlyPL(txs: Transaction[]): MonthBucket[] {
  const buckets = new Map<string, MonthBucket>();
  for (const t of txs) {
    const d = new Date(t.timestamp);
    const month = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    let b = buckets.get(month);
    if (!b) {
      b = { month, inflow: 0, outflow: 0, net: 0, byCategory: {}, count: 0 };
      buckets.set(month, b);
    }
    if (t.amount_zec >= 0) b.inflow += t.amount_zec;
    else b.outflow += Math.abs(t.amount_zec);
    b.net += t.amount_zec;
    b.count += 1;
    if (t.tag) {
      const c = b.byCategory[t.tag] ?? { inflow: 0, outflow: 0 };
      if (t.amount_zec >= 0) c.inflow += t.amount_zec;
      else c.outflow += Math.abs(t.amount_zec);
      b.byCategory[t.tag] = c;
    }
  }
  return [...buckets.values()].sort((a, b) => b.month.localeCompare(a.month));
}

// Inclusive YYYY-MM..YYYY-MM range (UTC). Omitted bounds = open-ended.
export function filterByMonthRange(
  txs: Transaction[],
  from?: string,
  to?: string,
): Transaction[] {
  if (!from && !to) return txs;
  const fromTs = from ? Date.UTC(+from.slice(0, 4), +from.slice(5, 7) - 1, 1) : -Infinity;
  // `to` inclusive: add one month to capture the entire selected month.
  const toTs = to ? Date.UTC(+to.slice(0, 4), +to.slice(5, 7), 1) : Infinity;
  return txs.filter((t) => t.timestamp >= fromTs && t.timestamp < toTs);
}

// CSV shaped for QuickBooks / Xero import. When priceByDate (YYYY-MM-DD ->
// ZEC/USD) is supplied, two fiat columns are added for tax-ready books.
export function transactionsCsv(txs: Transaction[], priceByDate?: Record<string, number>): string {
  const withUsd = Boolean(priceByDate);
  const header = [
    "Date",
    "Direction",
    "Amount (ZEC)",
    ...(withUsd ? ["ZEC/USD", "Amount (USD)"] : []),
    "Category",
    "Counterparty",
    "Memo",
    "Notes",
    "TxID",
    "Block Height",
  ];
  const escape = (v: string | number | undefined | null) => {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const lines = [header.join(",")];
  for (const t of txs) {
    const iso = new Date(t.timestamp).toISOString();
    const price = withUsd ? priceByDate![iso.slice(0, 10)] : undefined;
    const usdCols = withUsd
      ? [escape(price ?? ""), escape(price != null ? (t.amount_zec * price).toFixed(2) : "")]
      : [];
    lines.push(
      [
        escape(iso),
        escape(t.direction.toUpperCase()),
        escape(t.amount_zec),
        ...usdCols,
        escape(t.tag ? CATEGORY_LABEL[t.tag] : ""),
        escape(t.counterparty),
        escape(t.memo),
        escape(t.notes),
        escape(t.txid),
        escape(t.block_height),
      ].join(","),
    );
  }
  return lines.join("\n");
}
