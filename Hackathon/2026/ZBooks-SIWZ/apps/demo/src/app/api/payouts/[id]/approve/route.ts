import { NextResponse } from "next/server";
import {
  addRunApproval,
  getRun,
  getWorkspaceSettings,
  revokeRunApproval,
  runPayloadHash,
} from "@/lib/db";
import { notifyRunApproved } from "@/lib/discord";
import { loadApprovalState } from "@/lib/payouts";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

// Record this user's approval of the run's current payable items.
// Idempotent at (run, address, payload). Item edits invalidate older approvals.
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  const settings = await getWorkspaceSettings();
  // Empty allowlist = any treasurer/admin counts.
  if (settings.approver_addresses.length > 0 && !settings.approver_addresses.includes(auth.address)) {
    return NextResponse.json({ error: "not an approver" }, { status: 403 });
  }

  const run = await getRun(params.id);
  if (!run) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (run.status !== "draft") {
    return NextResponse.json({ error: `run is ${run.status}, only draft runs accept approvals` }, { status: 400 });
  }

  let body: { comment?: unknown } = {};
  try {
    body = await req.json();
  } catch {}
  const comment = typeof body.comment === "string" ? body.comment.slice(0, 500) : undefined;

  const payloadHash = runPayloadHash(run);
  try {
    await addRunApproval({
      runId: run.id,
      approverAddress: auth.address,
      comment,
      payloadHash,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  const state = await loadApprovalState(run);
  if (run.required_approvals > 1) {
    const origin = req.headers.get("origin") ?? undefined;
    notifyRunApproved({
      runId: run.id,
      title: run.title,
      approver: auth.address,
      validCount: state.validCount,
      required: state.required,
      origin,
    }).catch(() => {});
  }
  return NextResponse.json({ ok: true, approvals: state });
}

// Withdraw the caller's approval.
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  const run = await getRun(params.id);
  if (!run) return NextResponse.json({ error: "not found" }, { status: 404 });

  await revokeRunApproval(run.id, auth.address);
  const state = await loadApprovalState(run);
  return NextResponse.json({ ok: true, approvals: state });
}
