import { NextResponse } from "next/server";

import type { ChainStatus } from "@/lib/types";

const SCANNER_URL = process.env.SCANNER_URL ?? "http://localhost:8080";
const TIP_TIMEOUT_MS = 8_000;
const FRESH_MS = 60_000;
const MAX_STALE_MS = 5 * 60_000;

export const dynamic = "force-dynamic";

let cached: { chain: ChainStatus; fetchedAt: number } | null = null;

async function readTip(): Promise<ChainStatus> {
  const response = await fetch(`${SCANNER_URL}/status`, {
    signal: AbortSignal.timeout(TIP_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("scanner unavailable");

  return (await response.json()) as ChainStatus;
}

export async function GET() {
  const now = Date.now();

  if (cached && now - cached.fetchedAt < FRESH_MS) {
    return NextResponse.json(cached.chain);
  }

  try {
    const chain = await readTip();
    cached = { chain, fetchedAt: now };
    return NextResponse.json(chain);
  } catch {
    if (cached && now - cached.fetchedAt < MAX_STALE_MS) {
      return NextResponse.json({ ...cached.chain, stale: true });
    }

    return NextResponse.json(
      { error: "The chain tip is currently unreachable." },
      { status: 503 },
    );
  }
}
