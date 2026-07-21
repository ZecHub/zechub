import { NextResponse } from "next/server";
import { addTeamMember, listMembers, type Role } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { isZcashAddress } from "@siwz/core";

export const dynamic = "force-dynamic";

const ROLES: Role[] = ["admin", "treasurer", "viewer"];

export async function GET() {
  const auth = await requireRole("admin", "treasurer", "viewer");
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });
  return NextResponse.json({ team: await listMembers() });
}

export async function POST(req: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { address?: unknown; role?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const role = typeof body.role === "string" ? body.role : "";
  if (!address || !isZcashAddress(address)) {
    return NextResponse.json({ error: "Provide a valid Zcash address" }, { status: 400 });
  }
  if (!ROLES.includes(role as Role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }
  try {
    const m = await addTeamMember(address, role as Role, auth.address);
    return NextResponse.json({ member: m });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
