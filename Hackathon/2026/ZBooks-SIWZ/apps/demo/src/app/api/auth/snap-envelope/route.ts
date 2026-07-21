import { NextResponse } from "next/server";
import { signSnapEnvelope, validateSnapCredentials } from "@/lib/snap-auth";

export const dynamic = "force-dynamic";

// Signs a server-side HMAC over Snap credentials so a stray fetch can't fabricate a session.
export async function POST(req: Request) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  let body: { fingerprint?: unknown; ufvk?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const fingerprint = typeof body.fingerprint === "string" ? body.fingerprint : "";
  const ufvk = typeof body.ufvk === "string" ? body.ufvk : "";
  const inspection = validateSnapCredentials({ fingerprint, ufvk });
  if (!inspection.ok) return NextResponse.json({ error: inspection.reason }, { status: 400 });
  const envelope = signSnapEnvelope({ fingerprint, ufvk }, secret);
  return NextResponse.json({ envelope });
}
