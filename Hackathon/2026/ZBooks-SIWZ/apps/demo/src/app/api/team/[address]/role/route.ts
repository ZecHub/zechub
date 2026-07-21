import { NextResponse } from "next/server";
import { setRole, type Role } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

const ROLES: Role[] = ["admin", "treasurer", "viewer"];

export async function PATCH(
  req: Request,
  { params }: { params: { address: string } },
) {
  const auth = await requireRole("admin");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { role?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const role = typeof body.role === "string" ? body.role : "";
  if (!ROLES.includes(role as Role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }
  const addr = decodeURIComponent(params.address);
  if (addr === auth.address && role !== "admin") {
    return NextResponse.json({ error: "You can't demote yourself." }, { status: 400 });
  }
  try {
    await setRole(addr, role as Role);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 });
  }
}
