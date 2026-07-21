import { NextRequest, NextResponse } from 'next/server';
import { getFastifyUrl } from '@/config/api';

const BACKEND = getFastifyUrl();

function authHeader(req: NextRequest): Record<string, string> {
  const token = req.headers.get('Authorization');
  return token ? { Authorization: token } : {};
}

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${BACKEND}/api/user/game`, { headers: { ...authHeader(req) } });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 503 });
  }
}

// No PUT — game state is written only by the server engine (/api/rpg/run/*).
