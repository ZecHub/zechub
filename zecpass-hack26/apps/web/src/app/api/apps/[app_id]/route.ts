/**
 * GET/DELETE /api/apps/[app_id] — Get or deactivate an app
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyToken } from '@/lib/jwt';
import { Session } from '@/models/Session';
import { AppRegistryService } from '@/services/AppRegistryService';

async function getSessionFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('zecpass_token')?.value;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : cookieToken;
  if (!token) return null;

  try {
    const payload = await verifyToken(token);
    await connectDB();
    const session = await Session.findOne({ jwt_jti: payload.jti, revoked: false });
    if (!session || !session.isValid()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ app_id: string }> }
) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { app_id } = await params;
    await connectDB();
    const appService = new AppRegistryService();
    const app = await appService.getApp(app_id);
    if (!app) return NextResponse.json({ error: 'App not found' }, { status: 404 });
    return NextResponse.json(app);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch app';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ app_id: string }> }
) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const { app_id } = await params;
    await connectDB();
    const appService = new AppRegistryService();
    await appService.deactivate(app_id, session.zk_proof_hash);
    return NextResponse.json({ deactivated: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Deactivation failed';
    const status = message.includes('Unauthorized') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
