/**
 * GET /api/auth/session — Validate session token
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { VerificationService } from '@/services/VerificationService';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('zecpass_token')?.value;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : cookieToken;

    if (!token) {
      return NextResponse.json({ valid: false, error: 'No token provided' }, { status: 401 });
    }

    await connectDB();
    const verificationService = new VerificationService();
    const result = await verificationService.validateSession(token);

    if (!result.valid) {
      return NextResponse.json(result, { status: 401 });
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Session validation failed';
    return NextResponse.json({ valid: false, error: message }, { status: 401 });
  }
}
