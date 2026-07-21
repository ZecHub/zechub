import { NextResponse } from "next/server";
import { removeMember } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: { address: string } },
) {
  const auth = await requireRole("admin");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });
  const addr = decodeURIComponent(params.address);
  if (addr === auth.address) {
    return NextResponse.json({ error: "You can't remove yourself." }, { status: 400 });
  }
  await removeMember(addr);
  return NextResponse.json({ ok: true });
}
