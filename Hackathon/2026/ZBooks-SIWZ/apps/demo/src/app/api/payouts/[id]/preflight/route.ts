import { NextResponse } from "next/server";
import { getRun } from "@/lib/db";
import { runPreflight } from "@/lib/payouts";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

// Fresh preflight: re-runs the treasury balance check and rebuilds the ZIP 321
// URI from current items. The page-load preflight can go stale between render
// and the user clicking "Pay batch"; the client calls this right before
// opening the pay modal so a sudden balance drop is caught before the user
// scans the QR.
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  const run = await getRun(params.id);
  if (!run) return NextResponse.json({ error: "not found" }, { status: 404 });

  const preflight = await runPreflight(run);
  return NextResponse.json({
    count: preflight.count,
    totalZec: preflight.totalZec,
    feeZec: preflight.feeZec,
    requiredZec: preflight.requiredZec,
    spendableZec: preflight.spendableZec,
    sufficient: preflight.sufficient,
    uri: preflight.uri,
    balance: preflight.balance
      ? {
          totalZatoshi: preflight.balance.totalZatoshi,
          spendableZatoshi: preflight.balance.spendableZatoshi,
          unconfirmedZatoshi: preflight.balance.unconfirmedZatoshi,
        }
      : null,
    approvals: {
      required: preflight.approvals.required,
      validCount: preflight.approvals.validCount,
      approved: preflight.approvals.approved,
      approvers: preflight.approvals.approvers,
    },
  });
}
