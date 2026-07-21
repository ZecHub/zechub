import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { inferMemoChallengeMode, issueMemoChallenge, parseAddress } from "@siwz/core";
import { inspectUfvk } from "@/lib/ufvk";
import { SIWZ_NETWORK } from "@/lib/auth";
import {
  getDefaultExplorer,
  getShieldedExplorer,
  isMockExplorer,
} from "@/lib/explorer";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const SERVICE_ADDRESS = process.env.SIWZ_SERVICE_ADDRESS;
const DEMO_MODE = process.env.SIWZ_DEMO === "1";

// Addresses with public test-keys in this repo's source. Refuse to use
// them as service addresses so a misconfigured deploy can't drain funds.
const KNOWN_LEAKED_ADDRESSES = new Set([
  "t1QzwK7oMTdr4XF32s5RAtK9Eq45NFtdSbo",
  "t1MKNc8vbN8ybMUJFcdKf6i4bRTKvtQCxpH",
  // Derived from FIXED_PRIV (Uint8Array(32).fill(7)) in the @siwz/core test
  // suite. The private key ships in the npm tarball; anyone can sweep this.
  "t1Hxw6JqWMnhDK5jRCieg5bFHM2qt7UtQvu",
]);

export async function POST(req: Request) {
  // Cheap unauthenticated endpoint, easy to abuse for DoS amplification.
  // 20 issues per minute per IP is plenty for a real user re-trying a flaky
  // wallet send a few times.
  const ip = clientIp(req);
  const gate = rateLimit({ key: `memo-issue:${ip}`, max: 20, windowMs: 60_000 });
  if (!gate.allowed) {
    return NextResponse.json(
      { error: "Too many sign-in attempts. Slow down and try again shortly." },
      { status: 429, headers: { "retry-after": String(gate.retryAfterSeconds) } },
    );
  }

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return NextResponse.json({ error: "server misconfigured: missing NEXTAUTH_SECRET" }, { status: 500 });
  if (!SERVICE_ADDRESS) {
    return NextResponse.json({
      error:
        "Server misconfigured: SIWZ_SERVICE_ADDRESS is not set. " +
        "Generate one with `node scripts/gen-service-address.mjs` " +
        "(or paste a t1…/zs…/u1… address from your wallet) into apps/demo/.env.local, " +
        "then restart the dev server.",
    }, { status: 500 });
  }
  if (KNOWN_LEAKED_ADDRESSES.has(SERVICE_ADDRESS)) {
    return NextResponse.json({
      error:
        `Refusing to use ${SERVICE_ADDRESS} as a service address — its private key is in this repo's source. ` +
        `Any funds sent there can be swept by anyone who reads the code. ` +
        `Generate a fresh one with: node scripts/gen-service-address.mjs`,
    }, { status: 500 });
  }

  let mode: "transparent-amount" | "shielded-memo";
  try {
    mode = inferMemoChallengeMode(SERVICE_ADDRESS);
  } catch (err) {
    return NextResponse.json({
      error: `SIWZ_SERVICE_ADDRESS is not a valid Zcash address: ${(err as Error).message}`,
    }, { status: 500 });
  }

  // Transparent-amount mode binds a sign-in only to the payment amount, drawn
  // from a small space and with no per-token replay store, so it is not
  // auth-grade. Require a shielded service address (the SIWZ:<nonce> memo is the
  // real binding) unless an operator explicitly opts in.
  if (mode === "transparent-amount" && process.env.SIWZ_ALLOW_TRANSPARENT_AUTH !== "1") {
    return NextResponse.json({
      error:
        "Transparent-amount sign-in is disabled because it is weak (small amount-nonce space, no replay protection). " +
        "Use a shielded service address (zs.../u1...) so the encrypted memo carries the nonce, " +
        "or set SIWZ_ALLOW_TRANSPARENT_AUTH=1 to opt in for testing.",
    }, { status: 400 });
  }

  // Shielded mode needs a memo-decrypting backend (mock, daemon, or wrapper).
  if (mode === "shielded-memo") {
    const shieldedExplorer = getShieldedExplorer();
    if (!shieldedExplorer) {
      return NextResponse.json({
        error:
          "Service address is shielded (sapling/unified) but no shielded-capable explorer is configured. " +
          "Set ZCASH_RPC_URL (+ ZCASH_RPC_USER/PASS) for your daemon's HTTP RPC, " +
          "or set ZCASH_CLI_PATH to your zcash-cli binary. " +
          "See docs/siwz/memo-challenge.md for the full setup.",
      }, { status: 500 });
    }
    if (!shieldedExplorer.getRecentMemosToAddress) {
      return NextResponse.json({
        error:
          "The configured explorer doesn't implement getRecentMemosToAddress. " +
          "This indicates a misconfiguration — see docs/siwz/memo-challenge.md.",
      }, { status: 500 });
    }
  } else {
    void getDefaultExplorer();
  }

  // Identity precedence: ufvk → previousAnonId → fresh anon.
  let body: { ufvk?: unknown; previousAnonId?: unknown } = {};
  try {
    body = await req.json().catch(() => ({}));
  } catch {
    /* empty body is fine */
  }
  const ufvkRaw = typeof body.ufvk === "string" ? body.ufvk.trim() : "";
  const previousAnonIdRaw = typeof body.previousAnonId === "string" ? body.previousAnonId.trim() : "";
  let identity: string | undefined;
  if (ufvkRaw) {
    const inspection = inspectUfvk(ufvkRaw);
    if (!inspection.valid) return NextResponse.json({ error: inspection.reason }, { status: 400 });
    // Hash so the raw UFVK never enters the signed token, and so the
    // client can store the resulting anon id for one-click re-auth.
    identity = `anon:${createHash("sha256").update(ufvkRaw).digest("hex").slice(0, 32)}`;
  } else if (previousAnonIdRaw) {
    if (!/^anon:[0-9a-f]{8,128}$/i.test(previousAnonIdRaw)) {
      return NextResponse.json({
        error: "previousAnonId must match anon:<hex>",
      }, { status: 400 });
    }
    identity = previousAnonIdRaw;
  }

  const challenge = await issueMemoChallenge({
    secret,
    serviceAddress: SERVICE_ADDRESS,
    network: SIWZ_NETWORK,
    identity,
    label: "ZBooks",
    message:
      mode === "shielded-memo"
        ? "Sign in to ZBooks. Your wallet will pre-fill the memo from this URI; sending the memo proves the sign-in is yours."
        : "Sign in to ZBooks. Send this exact amount from the wallet you want to authenticate as.",
    ttlSeconds: 600,
  });

  return NextResponse.json({
    mode: challenge.mode,
    uri: challenge.uri,
    amountZec: challenge.amountZec,
    amountZatoshi: challenge.amountZatoshi,
    memo: challenge.memo,
    serviceAddress: challenge.serviceAddress,
    serviceAddressType: parseAddress(challenge.serviceAddress).type,
    token: challenge.token,
    expiresAt: challenge.expiresAt,
    demoMode: DEMO_MODE,
  });
}
