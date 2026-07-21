import { NextResponse } from "next/server";
import { listTransactions } from "@/lib/db";
import { filterByMonthRange, transactionsCsv } from "@/lib/reports";
import { zecUsdForTimestamps } from "@/lib/fiat";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = await requireRole("admin", "treasurer", "viewer");
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });

  const url = new URL(req.url);
  // Accept only YYYY-MM. Anything else is dropped to keep the file name
  // predictable and the filter unambiguous.
  const valid = (s: string | null) => (s && /^\d{4}-\d{2}$/.test(s) ? s : undefined);
  const from = valid(url.searchParams.get("from"));
  const to = valid(url.searchParams.get("to"));

  const filtered = filterByMonthRange(await listTransactions(), from, to);
  const priceByDate = Object.fromEntries((await zecUsdForTimestamps(filtered.map((t) => t.timestamp))).entries());
  const csv = transactionsCsv(filtered, priceByDate);

  const stamp = from || to
    ? `${from ?? "start"}_${to ?? "now"}`
    : new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="zbooks-${stamp}.csv"`,
    },
  });
}
