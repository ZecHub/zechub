import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { pollMemoHandler } from "@siwz/next-auth/memo";
import { verifyMemoChallenge, type MemoExplorer, type RecentMemo } from "@siwz/core";

export const dynamic = "force-dynamic";

const SECRET = process.env.NEXTAUTH_SECRET ?? "";

// Transparent is the default; only wire shielded when LIGHTWALLET_RPC_* is set.
const shieldedExplorer: MemoExplorer | undefined =
  process.env.LIGHTWALLET_RPC_URL && process.env.LIGHTWALLET_RPC_TOKEN
    ? { getRecentMemosToAddress: fetchLightwalletMemos }
    : undefined;

const handler = pollMemoHandler({ secret: SECRET, shieldedExplorer });

async function fetchLightwalletMemos(address: string, limit?: number): Promise<RecentMemo[]> {
  const url = process.env.LIGHTWALLET_RPC_URL!;
  const lwToken = process.env.LIGHTWALLET_RPC_TOKEN!;
  const res = await fetch(`${url.replace(/\/$/, "")}/memos`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${lwToken}` },
    body: JSON.stringify({ address, limit: limit ?? 50 }),
  });
  if (!res.ok) throw new Error(`lightwallet-rpc /memos returned ${res.status}`);
  const json = (await res.json()) as { memos?: RecentMemo[] };
  return json.memos ?? [];
}

export async function POST(req: Request) {
  if (process.env.SIWZ_DEMO === "1") return demoMatch(req);
  return handler(req);
}

// SIWZ_DEMO=1 short-circuit: synthesise the observation from the token.
async function demoMatch(req: Request): Promise<Response> {
  let body: { token?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad JSON" }, { status: 400 });
  }
  const token = typeof body.token === "string" ? body.token : "";
  if (!token) return NextResponse.json({ error: "token required" }, { status: 400 });
  const parts = token.split(".");
  if (parts.length !== 2) {
    return NextResponse.json({ error: "malformed token" }, { status: 400 });
  }
  let recipient: string;
  let mode: "transparent-amount" | "shielded-memo";
  let amountZatoshi: bigint;
  let nonce: string;
  try {
    const payloadJson = Buffer.from(
      parts[0]!.replace(/-/g, "+").replace(/_/g, "/"),
      "base64",
    ).toString("utf8");
    const payload = JSON.parse(payloadJson) as {
      to?: string;
      z?: string;
      m?: string;
      n?: string;
    };
    recipient = payload.to!;
    amountZatoshi = BigInt(payload.z!);
    mode = payload.m === "sm" ? "shielded-memo" : "transparent-amount";
    nonce = payload.n ?? "";
  } catch {
    return NextResponse.json({ error: "malformed token payload" }, { status: 400 });
  }
  const result = await verifyMemoChallenge({
    secret: SECRET,
    token,
    observedAmountZatoshi: amountZatoshi,
    observedRecipient: recipient,
    observedMemo: mode === "shielded-memo" ? `SIWZ:${nonce}` : undefined,
  });
  if (!(result.ok && result.identity)) {
    return NextResponse.json(
      { ok: false, retryable: false, error: result.error },
      { status: 400 },
    );
  }
  const envelope = createHmac("sha256", SECRET)
    .update(`memo::${result.identity}`)
    .digest("hex");
  return NextResponse.json({
    ok: true,
    identity: result.identity,
    envelope,
    txid: `demo-${Date.now().toString(16)}`,
    mode,
  });
}
