import { NextResponse } from "next/server";
import { setPrimaryKey } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });
  await setPrimaryKey(params.id);
  return NextResponse.json({ ok: true });
}
