import { NextResponse } from "next/server";
import { tagTransaction, type Category } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

const VALID: Category[] = [
  "grant_payout",
  "contractor",
  "expense",
  "reimbursement",
  "refund",
  "internal_transfer",
  "income",
  "other",
];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { tag?: unknown; notes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const patch: { tag?: Category; notes?: string; taggedBy: string } = { taggedBy: auth.address };
  if (body.tag !== undefined && body.tag !== null) {
    if (typeof body.tag !== "string" || !VALID.includes(body.tag as Category)) {
      return NextResponse.json({ error: "invalid tag" }, { status: 400 });
    }
    patch.tag = body.tag as Category;
  }
  if (body.notes !== undefined) {
    if (typeof body.notes !== "string") {
      return NextResponse.json({ error: "notes must be a string" }, { status: 400 });
    }
    patch.notes = body.notes.slice(0, 500);
  }

  try {
    const updated = await tagTransaction(params.id, patch);
    return NextResponse.json({ transaction: updated });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 });
  }
}
