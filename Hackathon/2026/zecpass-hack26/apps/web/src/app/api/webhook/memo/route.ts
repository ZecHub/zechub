/**
 * POST /api/webhook/memo — Internal memo verification webhook
 */
import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { safeCompare } from '@/lib/zk';

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-webhook-secret');
    if (!apiKey || !safeCompare(apiKey, config.webhookSecret())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    // Store memo event for client polling
    console.log('[Webhook] Memo event received:', body.challenge_id, body.status);
    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook processing failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
