import { NextResponse } from "next/server";
import { isZcashAddress } from "@siwz/core";
import { updatePayee } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { label?: unknown; address?: unknown; notes?: unknown; archived?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const patch: { label?: string; address?: string; notes?: string; archived?: boolean } = {};
  if (typeof body.label === "string") patch.label = body.label;
  if (typeof body.address === "string") {
    if (!isZcashAddress(body.address.trim())) {
      return NextResponse.json({ error: "not a valid Zcash address" }, { status: 400 });
    }
    patch.address = body.address;
  }
  if (typeof body.notes === "string") patch.notes = body.notes;
  if (typeof body.archived === "boolean") patch.archived = body.archived;

  try {
    return NextResponse.json({ payee: await updatePayee(params.id, patch) });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 });
  }
}

// Soft-delete: archive so historical line items keep their payee link.
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });
  try {
    await updatePayee(params.id, { archived: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 });
  }
}
