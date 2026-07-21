import { NextResponse } from "next/server";
import { addLineItem, createRun, findExistingExternalRefs } from "@/lib/db";
import { requireRole } from "@/lib/session";
import {
  bountyToPayoutLine,
  fetchAllBounties,
  getEffectiveAssignee,
  pickAddressForNetwork,
  type ZecBounty,
} from "@/lib/zec-bounties";
import { SIWZ_NETWORK } from "@/lib/auth";

export const dynamic = "force-dynamic";

// POST {
//   bountyIds: string[],
//   assigneeOverrides?: { [bountyId]: userId },   // for multi-assignee bounties
//   target: { type: "new", title?, sourceUfvkId? } | { type: "existing", runId }
// }
// Returns { ok: true, runId, added, skipped: { id, reason }[] }
export async function POST(req: Request) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });

  let body: {
    bountyIds?: unknown;
    assigneeOverrides?: unknown;
    target?: { type?: unknown; title?: unknown; sourceUfvkId?: unknown; runId?: unknown };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const ids = Array.isArray(body.bountyIds) ? body.bountyIds.filter((x) => typeof x === "string") : [];
  if (ids.length === 0) {
    return NextResponse.json({ error: "bountyIds required (non-empty array of strings)" }, { status: 400 });
  }
  if (ids.length > 100) {
    return NextResponse.json({ error: "max 100 bounties per import" }, { status: 400 });
  }

  // Parse optional assignee overrides: { [bountyId]: userId }
  const overrides: Record<string, string> = {};
  if (body.assigneeOverrides && typeof body.assigneeOverrides === "object") {
    for (const [k, v] of Object.entries(body.assigneeOverrides as Record<string, unknown>)) {
      if (typeof v === "string" && v) overrides[k] = v;
    }
  }

  let upstream: ZecBounty[];
  try {
    upstream = await fetchAllBounties();
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch from zec-bounties: ${(err as Error).message}` },
      { status: 502 },
    );
  }

  const skipped: { id: string; reason: string }[] = [];
  const upstreamById = new Map(upstream.map((b) => [b.id, b]));

  // Resolve each requested id into (bounty, effective assignee). Skip those
  // that fail any payability check, with a specific reason.
  type Resolved = { bounty: ZecBounty; address: string };
  const resolved: Resolved[] = [];
  for (const id of ids) {
    const b = upstreamById.get(id);
    if (!b) {
      skipped.push({ id, reason: "Not found upstream" });
      continue;
    }
    if (b.status === "CANCELLED" || b.status === "TO_DO") {
      skipped.push({ id, reason: `Status is ${b.status}, not payable` });
      continue;
    }
    if (b.isPaid) {
      skipped.push({ id, reason: "Already marked paid upstream" });
      continue;
    }
    if (!(b.bountyAmount > 0)) {
      skipped.push({ id, reason: "Amount is zero" });
      continue;
    }
    const assignee = getEffectiveAssignee(b, overrides[id]);
    if (!assignee) {
      skipped.push({
        id,
        reason: overrides[id]
          ? "Picked assignee not found on bounty"
          : "No assignee, or multi-assignee without a pick selected",
      });
      continue;
    }
    const address = pickAddressForNetwork(assignee, SIWZ_NETWORK);
    if (!address) {
      const hasAny = !!(assignee.UA_address || assignee.z_address);
      skipped.push({
        id,
        reason: hasAny
          ? `Assignee has no ${SIWZ_NETWORK} address; ZBooks runs on ${SIWZ_NETWORK}`
          : "Assignee has no address on file",
      });
      continue;
    }
    resolved.push({ bounty: b, address });
  }

  // Dedupe against payout_items.external_ref
  const refs = resolved.map((r) => `zec-bounties:${r.bounty.id}`);
  const existing = await findExistingExternalRefs(refs);
  const fresh = resolved.filter((r) => !existing.has(`zec-bounties:${r.bounty.id}`));
  for (const r of resolved) {
    if (existing.has(`zec-bounties:${r.bounty.id}`)) {
      skipped.push({ id: r.bounty.id, reason: "Already imported into a previous run" });
    }
  }

  if (fresh.length === 0) {
    return NextResponse.json({ error: "No bounties to import", skipped, added: 0 }, { status: 400 });
  }

  let runId: string;
  const target = body.target ?? {};
  if (target.type === "existing" && typeof target.runId === "string") {
    runId = target.runId;
  } else {
    const title =
      (typeof target.title === "string" && target.title.trim()) ||
      `ZecBounties · ${new Date().toISOString().slice(0, 10)}`;
    const run = await createRun({
      title,
      sourceUfvkId: typeof target.sourceUfvkId === "string" ? target.sourceUfvkId : undefined,
      by: auth.address,
      note: `Imported ${fresh.length} bount${fresh.length === 1 ? "y" : "ies"} from zec-bounties`,
    });
    runId = run.id;
  }

  let added = 0;
  for (const r of fresh) {
    const line = bountyToPayoutLine(r.bounty, SIWZ_NETWORK, overrides[r.bounty.id]);
    try {
      await addLineItem(runId, {
        label: line.label,
        address: line.address,
        amountZec: line.amount_zec,
        memo: line.memo,
        externalRef: line.external_ref,
        workStatus: "completed",
      });
      added += 1;
    } catch (err) {
      skipped.push({ id: r.bounty.id, reason: `Insert failed: ${(err as Error).message}` });
    }
  }

  return NextResponse.json({ ok: true, runId, added, skipped });
}
