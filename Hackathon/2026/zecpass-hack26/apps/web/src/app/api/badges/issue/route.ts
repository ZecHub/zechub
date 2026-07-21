/**
 * POST /api/badges/issue — Issue a ZK badge (requires app auth)
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import { App } from '@/models/App';
import { VerificationService } from '@/services/VerificationService';
import { BadgeService } from '@/services/BadgeService';

const IssueBadgeSchema = z.object({
  holder_session_token: z.string().min(1),
  badge_type: z.string().min(1),
  badge_label: z.string().min(1),
  proof_data: z.record(z.unknown()).optional().default({}),
});

export async function POST(request: NextRequest) {
  try {
    // Validate app authentication
    const app_id = request.headers.get('x-app-id');
    const app_secret = request.headers.get('x-app-secret');

    if (!app_id || !app_secret) {
      return NextResponse.json(
        { error: 'App authentication required. Provide X-App-Id and X-App-Secret headers.' },
        { status: 401 }
      );
    }

    await connectDB();
    const app = await App.findOne({ app_id, active: true });
    if (!app) {
      return NextResponse.json({ error: 'App not found or inactive.' }, { status: 401 });
    }

    const isValidSecret = await app.verifySecret(app_secret);
    if (!isValidSecret) {
      return NextResponse.json({ error: 'Invalid app secret.' }, { status: 401 });
    }

    // Validate request body
    const body = await request.json();
    const parsed = IssueBadgeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const verificationService = new VerificationService();
    const session = await verificationService.validateSession(parsed.data.holder_session_token);
    if (!session.valid || !session.zk_proof_hash) {
      return NextResponse.json({ error: 'Invalid holder session token' }, { status: 401 });
    }

    const badgeService = new BadgeService();
    const badge = await badgeService.issue(app_id, session.zk_proof_hash, parsed.data.badge_type, parsed.data.badge_label, parsed.data.proof_data);
    return NextResponse.json({ badge_id: badge.badge_id, badge_type: badge.badge_type, badge_label: badge.badge_label, issued_at: badge.issued_at }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Badge issuance failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
