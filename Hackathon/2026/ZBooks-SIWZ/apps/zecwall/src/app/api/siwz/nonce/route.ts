import { NextResponse } from "next/server";
import { issueNonce } from "@siwz/next-auth/nonce";

export const dynamic = "force-dynamic";

export async function GET() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return NextResponse.json({ error: "NEXTAUTH_SECRET not set" }, { status: 500 });
  const issued = issueNonce({ secret, ttlSeconds: 600 });
  return NextResponse.json({ nonce: issued.nonce, token: issued.token });
}
