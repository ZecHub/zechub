import { NextResponse } from "next/server";
import { isZcashAddress } from "@siwz/core";
import { addLineItem, getPayee, getRun, type PayoutLineItem, type WorkStatus } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

// POST adds a line item. Either { payeeId, amountZec, memo?, workStatus? }
// (resolves label+address from the payee) or an inline { label, address, amountZec }.
// A { payeeIds: [...] } array bulk-adds several payees at zero amount (fill in later).
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  if (!(await getRun(params.id))) return NextResponse.json({ error: "run not found" }, { status: 404 });

  let body: {
    payeeId?: unknown;
    payeeIds?: unknown;
    label?: unknown;
    address?: unknown;
    amountZec?: unknown;
    memo?: unknown;
    workStatus?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bulk add by payee ids.
  if (Array.isArray(body.payeeIds)) {
    const created: PayoutLineItem[] = [];
    for (const pid of body.payeeIds) {
      if (typeof pid !== "string") continue;
      const payee = await getPayee(pid);
      if (!payee) continue;
      created.push(
        await addLineItem(params.id, {
          payeeId: payee.id,
          label: payee.label,
          address: payee.address,
          amountZec: 0.0000001, // placeholder so it validates; treasurer sets the real amount
        }),
      );
    }
    return NextResponse.json({ items: created });
  }

  const amountZec = Number(body.amountZec);
  if (!Number.isFinite(amountZec) || amountZec <= 0) {
    return NextResponse.json({ error: "amountZec must be a positive number" }, { status: 400 });
  }
  const memo = typeof body.memo === "string" ? body.memo : undefined;
  const workStatus =
    body.workStatus === "completed" || body.workStatus === "in_progress"
      ? (body.workStatus as WorkStatus)
      : undefined;

  let label: string;
  let address: string;
  let payeeId: string | undefined;

  if (typeof body.payeeId === "string") {
    const payee = await getPayee(body.payeeId);
    if (!payee) return NextResponse.json({ error: "payee not found" }, { status: 404 });
    label = payee.label;
    address = payee.address;
    payeeId = payee.id;
  } else {
    label = typeof body.label === "string" ? body.label.trim() : "";
    address = typeof body.address === "string" ? body.address.trim() : "";
    if (!label) return NextResponse.json({ error: "label required" }, { status: 400 });
    if (!address || !isZcashAddress(address)) {
      return NextResponse.json({ error: "valid address required" }, { status: 400 });
    }
  }

  try {
    const item = await addLineItem(params.id, { payeeId, label, address, amountZec, memo, workStatus });
    return NextResponse.json({ item });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
