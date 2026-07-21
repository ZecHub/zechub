import { NextResponse } from "next/server";

import { ORCHARD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { inspectKey } from "@/lib/keys";
import { RateLimiter, clientIp } from "@/lib/rateLimit";

const SCANNER_URL = process.env.SCANNER_URL ?? "http://localhost:8080";
const START_TIMEOUT_MS = 10_000;

const limiter = new RateLimiter();

export async function POST(request: Request) {
  let payload: { ufvk?: unknown; birthday?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const ufvk = typeof payload.ufvk === "string" ? payload.ufvk.trim() : "";
  const problem = inspectKey(ufvk);

  if (problem === "spending-key") {
    return NextResponse.json(
      { error: "Turnstile never accepts spending keys. Nothing was scanned or stored." },
      { status: 400 },
    );
  }

  if (problem) {
    return NextResponse.json({ error: "That is not a unified full viewing key." }, { status: 400 });
  }

  const birthday =
    typeof payload.birthday === "number" && Number.isInteger(payload.birthday)
      ? payload.birthday
      : ORCHARD_ACTIVATION_HEIGHT;

  if (limiter.check(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many scans from this address. Try again in a few minutes." },
      { status: 429 },
    );
  }

  try {
    const response = await fetch(`${SCANNER_URL}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ufvk, birthday }),
      signal: AbortSignal.timeout(START_TIMEOUT_MS),
    });

    const body = await response.json();
    return NextResponse.json(body, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "The scan service is unavailable. Your key was not stored." },
      { status: 503 },
    );
  }
}
