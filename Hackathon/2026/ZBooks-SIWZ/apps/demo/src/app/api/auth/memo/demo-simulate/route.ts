import { NextResponse } from "next/server";
import { primeDemoFixture, primeDemoMemoFixture } from "@/lib/explorer";
import { randomBytes } from "node:crypto";

export const dynamic = "force-dynamic";

// DEMO-mode only. Primes the mock explorer with a tx/memo matching the
// supplied token so the poll endpoint sees it and signs the user in.
export async function POST(req: Request) {
  if (process.env.SIWZ_DEMO !== "1") {
    return NextResponse.json(
      { error: "demo-simulate is only available when SIWZ_DEMO=1" },
      { status: 403 },
    );
  }

  let body: { token?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const token = typeof body.token === "string" ? body.token : "";
  const parts = token.split(".");
  if (parts.length !== 2) return NextResponse.json({ error: "malformed token" }, { status: 400 });

  let recipient: string;
  let amountZatoshi: bigint;
  let mode: "transparent-amount" | "shielded-memo";
  let nonce: string | undefined;
  try {
    const payloadJson = Buffer.from(
      parts[0]!.replace(/-/g, "+").replace(/_/g, "/"),
      "base64",
    ).toString("utf8");
    const payload = JSON.parse(payloadJson) as {
      to?: unknown;
      z?: unknown;
      n?: unknown;
      m?: unknown;
    };
    if (typeof payload.to !== "string") throw new Error("missing to");
    if (typeof payload.z !== "string") throw new Error("missing z");
    recipient = payload.to;
    amountZatoshi = BigInt(payload.z);
    mode = payload.m === "sm" ? "shielded-memo" : "transparent-amount";
    if (mode === "shielded-memo") {
      if (typeof payload.n !== "string") throw new Error("missing n (nonce) for shielded-memo");
      nonce = payload.n;
    }
  } catch (err) {
    return NextResponse.json({ error: `bad token payload: ${(err as Error).message}` }, { status: 400 });
  }

  let txid: string | null;
  if (mode === "transparent-amount") {
    txid = primeDemoFixture(
      { serviceAddress: recipient, amountZatoshi },
      () => randomBytes(32).toString("hex"),
    );
  } else {
    txid = primeDemoMemoFixture(
      { memo: `SIWZ:${nonce!}`, amountZatoshi },
      () => randomBytes(32).toString("hex"),
    );
  }
  if (!txid) {
    return NextResponse.json(
      { error: "mock explorer unavailable" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, txid, mode });
}
