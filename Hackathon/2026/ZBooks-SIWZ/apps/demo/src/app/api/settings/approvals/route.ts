import { NextResponse } from "next/server";
import { getWorkspaceSettings, setWorkspaceSettings } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });
  return NextResponse.json({ settings: await getWorkspaceSettings() });
}

// Admin-only. Replaces the whole policy.
export async function PUT(req: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { minApprovals?: unknown; approverAddresses?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const min = Number(body.minApprovals);
  if (!Number.isFinite(min) || min < 1) {
    return NextResponse.json({ error: "minApprovals must be >= 1" }, { status: 400 });
  }
  if (!Array.isArray(body.approverAddresses)) {
    return NextResponse.json({ error: "approverAddresses must be an array" }, { status: 400 });
  }
  const addrs = body.approverAddresses.map((x) => String(x));

  try {
    const settings = await setWorkspaceSettings({ minApprovals: min, approverAddresses: addrs, by: auth.address });
    return NextResponse.json({ settings });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
