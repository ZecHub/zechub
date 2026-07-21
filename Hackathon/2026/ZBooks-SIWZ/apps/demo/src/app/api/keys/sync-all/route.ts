import { NextResponse } from "next/server";
import { listKeys } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { syncUfvkInBackground } from "@/lib/sync";

export const dynamic = "force-dynamic";

// Fan-out fired by BackgroundSync every 5min. Returns immediately.
export async function POST() {
  const auth = await requireRole("admin", "treasurer", "viewer");
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });

  const keys = await listKeys();
  for (const k of keys) syncUfvkInBackground(k.id);

  return NextResponse.json({ ok: true, queued: keys.length });
}
