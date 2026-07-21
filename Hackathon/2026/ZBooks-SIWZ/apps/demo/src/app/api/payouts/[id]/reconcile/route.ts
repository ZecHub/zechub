import { NextResponse } from "next/server";
import { getRun, reconcileRun } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { syncUfvk } from "@/lib/sync";

export const dynamic = "force-dynamic";

// POST re-checks the treasury for outgoing txs that settle this run's items.
// ?sync=1 first refreshes the source key (can take a while) so freshly-broadcast
// payments are visible before matching.
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  const run = await getRun(params.id);
  if (!run) return NextResponse.json({ error: "not found" }, { status: 404 });

  const wantSync = new URL(req.url).searchParams.get("sync") === "1";
  if (wantSync && run.source_ufvk_id) {
    await syncUfvk(run.source_ufvk_id);
  }

  const { matched, items } = await reconcileRun(params.id);
  return NextResponse.json({ matched, items });
}
