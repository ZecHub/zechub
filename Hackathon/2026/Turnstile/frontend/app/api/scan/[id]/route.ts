import { NextResponse } from "next/server";

const SCANNER_URL = process.env.SCANNER_URL ?? "http://localhost:8080";
const POLL_TIMEOUT_MS = 10_000;

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!/^[a-f0-9]{1,32}$/.test(id)) {
    return NextResponse.json({ error: "Unknown scan." }, { status: 400 });
  }

  try {
    const response = await fetch(`${SCANNER_URL}/scan/${id}`, {
      signal: AbortSignal.timeout(POLL_TIMEOUT_MS),
      cache: "no-store",
    });

    const body = await response.json();
    return NextResponse.json(body, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "The scan service is unavailable." },
      { status: 503 },
    );
  }
}
