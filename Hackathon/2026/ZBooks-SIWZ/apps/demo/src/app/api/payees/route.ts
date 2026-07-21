import { NextResponse } from "next/server";
import { isZcashAddress } from "@siwz/core";
import { addPayee, listPayees } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });
  return NextResponse.json({ payees: await listPayees() });
}

export async function POST(req: Request) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { label?: unknown; address?: unknown; notes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const label = typeof body.label === "string" ? body.label.trim() : "";
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes : undefined;
  if (!label) return NextResponse.json({ error: "label required" }, { status: 400 });
  if (label.length > 80) return NextResponse.json({ error: "label too long" }, { status: 400 });
  if (!address) return NextResponse.json({ error: "address required" }, { status: 400 });
  if (!isZcashAddress(address)) {
    return NextResponse.json({ error: "not a valid Zcash address" }, { status: 400 });
  }

  try {
    const payee = await addPayee({ label, address, notes, by: auth.address });
    return NextResponse.json({ payee });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}
