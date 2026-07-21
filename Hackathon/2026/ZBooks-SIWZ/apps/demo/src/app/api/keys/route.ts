import { NextResponse } from "next/server";
import { addKey, listKeys } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { inspectUfvk } from "@/lib/ufvk";
import { syncUfvkInBackground } from "@/lib/sync";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireRole("admin", "treasurer", "viewer");
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });
  return NextResponse.json({ keys: await listKeys() });
}

export async function POST(req: Request) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { label?: unknown; ufvk?: unknown; birthday?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const ufvk = typeof body.ufvk === "string" ? body.ufvk.trim() : "";
  const label = typeof body.label === "string" ? body.label.trim() : "";
  if (!ufvk) return NextResponse.json({ error: "ufvk is required" }, { status: 400 });
  const inspection = inspectUfvk(ufvk);
  if (!inspection.valid) {
    return NextResponse.json({ error: inspection.reason }, { status: 400 });
  }
  // Birthday is optional. Accept either string or number, clamp to a
  // non-negative integer. Anything malformed silently drops to undefined
  // so the wrapper uses its own NU5 default.
  const birthdayRaw = typeof body.birthday === "string" || typeof body.birthday === "number"
    ? Number(body.birthday)
    : NaN;
  const birthday = Number.isFinite(birthdayRaw) && birthdayRaw >= 0
    ? Math.floor(birthdayRaw)
    : undefined;
  const key = await addKey({ owner: auth.address, label: label || "Untitled key", ufvk, birthday });
  // Kick off the first sync without blocking the response. Initial sync
  // for an active UFVK can take a couple of minutes; the UI polls /keys
  // to see when the row's sync_status flips from "syncing" to "ok".
  syncUfvkInBackground(key.id);
  return NextResponse.json({ key });
}
