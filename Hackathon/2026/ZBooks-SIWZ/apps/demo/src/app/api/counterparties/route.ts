import { NextResponse } from "next/server";
import { listCounterparties, upsertCounterparty } from "@/lib/db";
import { canTag, requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireRole("admin", "treasurer", "viewer");
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });
  return NextResponse.json({ counterparties: await listCounterparties() });
}

export async function POST(req: Request) {
  const auth = await requireRole("admin", "treasurer", "viewer");
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });
  // Tagging is a treasurer-or-above action — same gate as transaction tagging.
  if (!canTag(auth.role)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: { address?: unknown; label?: unknown; notes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const label = typeof body.label === "string" ? body.label : "";
  const notes = typeof body.notes === "string" ? body.notes : undefined;
  if (!address) return NextResponse.json({ error: "address required" }, { status: 400 });
  if (label.length > 80) return NextResponse.json({ error: "label too long" }, { status: 400 });

  const cp = await upsertCounterparty({ address, label, notes, by: auth.address });
  return NextResponse.json({ counterparty: cp });
}
