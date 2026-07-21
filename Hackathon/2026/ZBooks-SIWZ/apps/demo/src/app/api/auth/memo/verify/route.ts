import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { verifyMemoChallenge } from "@siwz/core";
import { getDefaultExplorer } from "@/lib/explorer";
import { signSnapEnvelope } from "@/lib/snap-auth";

export const dynamic = "force-dynamic";

// Manual-txid fallback for the memo-challenge flow. Idempotent.
export async function POST(req: Request) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return NextResponse.json({ error: "server misconfigured" }, { status: 500 });

  let body: { token?: unknown; txid?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const token = typeof body.token === "string" ? body.token : "";
  const txid = typeof body.txid === "string" ? body.txid.trim().toLowerCase() : "";
  if (!token) return NextResponse.json({ error: "token is required" }, { status: 400 });
  if (!/^[0-9a-f]{64}$/.test(txid)) return NextResponse.json({ error: "txid must be 64 hex chars" }, { status: 400 });

  const explorer = getDefaultExplorer();
  let tx;
  try {
    tx = await explorer.getTransaction(txid);
  } catch (err) {
    return NextResponse.json({ error: `Explorer lookup failed: ${(err as Error).message}` }, { status: 502 });
  }
  if (!tx) {
    return NextResponse.json({
      error: "Transaction not found yet. If you just sent it, wait for the next block (~75s on mainnet) and retry.",
      retryable: true,
    }, { status: 404 });
  }

  let matched = false;
  let lastErr: string | undefined;
  let identity: string | undefined;
  for (const output of tx.outputs) {
    const result = await verifyMemoChallenge({
      secret,
      token,
      observedAmountZatoshi: output.amountZatoshi,
      observedRecipient: output.address,
    });
    if (result.ok) {
      matched = true;
      identity = result.identity;
      break;
    }
    lastErr = `${result.error}: ${result.errorMessage}`;
  }

  if (!matched || !identity) {
    return NextResponse.json({
      error: `Transaction ${txid} doesn't contain a matching output. ${lastErr ?? ""} Re-check the amount and recipient on the wallet's send screen.`,
    }, { status: 400 });
  }

  const envelope = signSnapEnvelope({ fingerprint: hashIdentity(identity), ufvk: identity }, secret);
  return NextResponse.json({
    ok: true,
    identity,
    envelope,
    txid,
    blockHeight: tx.blockHeight,
  });
}

function hashIdentity(s: string): string {
  return createHash("sha256").update(s).digest("hex").slice(0, 32);
}
