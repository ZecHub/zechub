import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/session";

export const dynamic = "force-dynamic";

// Reset zbooks.json to an empty state. Behind two gates: SIWZ_DEMO=1
// AND caller is admin. Convenient for demo recordings; refuses in prod.
export async function POST() {
  if (process.env.SIWZ_DEMO !== "1") {
    return NextResponse.json(
      { error: "wipe is only available when SIWZ_DEMO=1" },
      { status: 403 },
    );
  }
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "admin only" }, { status: auth.status });
  }

  const path = process.env.DATA_PATH ?? join(process.cwd(), "data", "zbooks.json");
  writeFileSync(
    path,
    JSON.stringify({ ufvks: [], transactions: [], team: [], counterparties: [] }, null, 2),
    "utf8",
  );
  return NextResponse.json({ ok: true });
}
