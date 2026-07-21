import { NextResponse } from "next/server";
import { getRun, removeRun, updateRun, type PayoutRunStatus } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { loadApprovalState, runPreflight } from "@/lib/payouts";

export const dynamic = "force-dynamic";

const STATUSES: PayoutRunStatus[] = ["draft", "sent", "reconciled", "void"];

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });
  const run = await getRun(params.id);
  if (!run) return NextResponse.json({ error: "not found" }, { status: 404 });
  const preflight = await runPreflight(run);
  return NextResponse.json({ run, preflight });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { title?: unknown; sourceUfvkId?: unknown; note?: unknown; status?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const patch: {
    title?: string;
    source_ufvk_id?: string;
    note?: string;
    status?: PayoutRunStatus;
    sent_at?: number;
  } = {};
  if (typeof body.title === "string" && body.title.trim()) patch.title = body.title.trim();
  if (typeof body.sourceUfvkId === "string") patch.source_ufvk_id = body.sourceUfvkId || undefined;
  if (typeof body.note === "string") patch.note = body.note;
  if (typeof body.status === "string") {
    if (!STATUSES.includes(body.status as PayoutRunStatus)) {
      return NextResponse.json({ error: "invalid status" }, { status: 400 });
    }
    patch.status = body.status as PayoutRunStatus;
    if (patch.status === "sent") patch.sent_at = Date.now();
  }

  if (patch.status === "sent") {
    const run = await getRun(params.id);
    if (!run) return NextResponse.json({ error: "not found" }, { status: 404 });
    if (run.required_approvals > 1) {
      const state = await loadApprovalState(run);
      if (!state.approved) {
        return NextResponse.json(
          { error: `awaiting ${state.required - state.validCount} more approval(s) before marking sent` },
          { status: 409 },
        );
      }
    }
  }

  try {
    return NextResponse.json({ run: await updateRun(params.id, patch) });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });
  await removeRun(params.id);
  return NextResponse.json({ ok: true });
}
