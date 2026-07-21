import { NextResponse } from "next/server";
import { listKeys } from "@/lib/db";
import { syncUfvk, type SyncOutcome } from "@/lib/sync";

export const dynamic = "force-dynamic";
// Vercel Hobby allows up to 60s with explicit maxDuration. With a warm
// lightwallet-rpc cache, awaiting both UFVK syncs finishes in 3-5s.
export const maxDuration = 60;

// Session-independent UFVK sync. Designed to be hit by Vercel Cron (or any
// external scheduler: cron-job.org, GitHub Actions, plain curl) so the books
// stay current even when no admin is signed in. Authorized by bearer token
// matching CRON_SECRET; refuses otherwise.
export async function GET(req: Request) {
  return handle(req);
}

// Some schedulers POST, some GET. Accept both. Body is ignored.
export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET not set on the server. Refusing to run an unauthenticated sync." },
      { status: 500 },
    );
  }
  const expected = `Bearer ${secret}`;
  const got = req.headers.get("authorization") ?? "";
  if (got.length !== expected.length || got !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const keys = await listKeys();
  // Await with Promise.allSettled so one stuck UFVK can't block the others
  // and so the lambda stays alive until every per-tx Turso write completes.
  // Previous shape used syncUfvkInBackground (fire-and-forget) which dies
  // mid-loop when Vercel tears down the function after returning the response.
  const settled = await Promise.allSettled(keys.map((k) => syncUfvk(k.id)));
  const outcomes = settled.map((r, i) => ({
    id: keys[i]!.id,
    ok: r.status === "fulfilled" && (r.value as SyncOutcome).ok,
    error: r.status === "rejected"
      ? (r.reason as Error)?.message
      : r.status === "fulfilled" ? (r.value as SyncOutcome).error : undefined,
  }));
  const succeeded = outcomes.filter((o) => o.ok).length;
  return NextResponse.json({
    ok: true,
    keys: keys.length,
    succeeded,
    failed: keys.length - succeeded,
    outcomes,
    at: new Date().toISOString(),
  });
}
