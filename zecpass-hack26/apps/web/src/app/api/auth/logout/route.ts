/**
 * POST /api/auth/logout — Revoke session
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { decodeToken } from '@/lib/jwt';
import { SessionService } from '@/services/SessionService';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('zecpass_token')?.value;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : cookieToken;

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    await connectDB();
    const sessionService = new SessionService();
    await sessionService.revoke(decoded.session_id, decoded.zk_proof_hash);

    const response = NextResponse.json({ revoked: true });
    response.cookies.delete('zecpass_token');
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
