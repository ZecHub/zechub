import { NextResponse } from "next/server";
import { getKey, removeKey, updateKeyLabel } from "@/lib/db";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

// Only admin can touch any key; a treasurer can only modify keys they own.
// `owner` is the address that called addKey; for sign-in-imported keys that is
// the user's own anon identity, so a teammate cannot mutate another teammate's key.
async function authorizeKeyMutation(
  keyId: string,
  auth: { ok: true; address: string; role: "admin" | "treasurer" | "viewer" },
): Promise<{ ok: true } | { ok: false; status: 403 | 404; error: string }> {
  if (auth.role === "admin") return { ok: true };
  const key = await getKey(keyId);
  if (!key) return { ok: false, status: 404, error: "not found" };
  if (key.owner !== auth.address) {
    return {
      ok: false,
      status: 403,
      error: "Only the owner or an admin can modify this key",
    };
  }
  return { ok: true };
}

// PATCH { label } renames a key.
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  let body: { label?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const label = typeof body.label === "string" ? body.label.trim() : "";
  if (!label) return NextResponse.json({ error: "label required" }, { status: 400 });
  if (label.length > 80) return NextResponse.json({ error: "label too long" }, { status: 400 });

  const gate = await authorizeKeyMutation(params.id, auth);
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });

  await updateKeyLabel(params.id, label);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireRole("admin", "treasurer");
  if (!auth.ok) return NextResponse.json({ error: "forbidden" }, { status: auth.status });

  const gate = await authorizeKeyMutation(params.id, auth);
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });

  await removeKey(params.id);
  return NextResponse.json({ ok: true });
}
