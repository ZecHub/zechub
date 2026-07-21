/**
 * GET /api/auth/challenge/[challenge_id]/status — SSE for real-time verification
 */
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ChallengeService } from '@/services/ChallengeService';
import { startMemoWatcher } from '@/jobs/memo-watcher';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ challenge_id: string }> }
) {
  const { challenge_id } = await params;
  const encoder = new TextEncoder();
  startMemoWatcher();

  const stream = new ReadableStream({
    async start(controller) {
      const challengeService = new ChallengeService();
      let closed = false;

      const send = (data: string) => {
        if (!closed) {
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }
      };

      const poll = async () => {
        try {
          await connectDB();
          const status = await challengeService.getStatus(challenge_id);

          if (status.status === 'used') {
            const { AuditLog } = await import('@/models/AuditLog');
            const { Session } = await import('@/models/Session');
            const { signToken } = await import('@/lib/jwt');
            const { config } = await import('@/lib/config');

            const log = await AuditLog.findOne({
              event_type: 'auth_success',
              'metadata.challenge_id': challenge_id,
            });

            if (log && log.session_id) {
              const session = await Session.findOne({ session_id: log.session_id });
              if (session && session.isValid()) {
                const access_token = await signToken({
                  session_id: session.session_id,
                  app_id: session.app_id,
                  scope: session.scope,
                  zk_proof_hash: session.zk_proof_hash,
                });

                const { decodeToken } = await import('@/lib/jwt');
                const decoded = decodeToken(access_token);
                if (decoded && decoded.jti) {
                  session.jwt_jti = decoded.jti;
                  await session.save();
                }

                send(JSON.stringify({
                  ...status,
                  access_token,
                  expires_in: config.sessionTtlSeconds,
                }));

                closed = true;
                controller.close();
                return;
              }
            }
          }

          send(JSON.stringify(status));

          if (status.status === 'used' || status.status === 'expired') {
            closed = true;
            controller.close();
            return;
          }
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Error';
          send(JSON.stringify({ error: msg }));
        }
      };

      await poll();
      const interval = setInterval(async () => {
        if (closed) { clearInterval(interval); return; }
        await poll();
      }, 3000);

      request.signal.addEventListener('abort', () => {
        closed = true;
        clearInterval(interval);
        try { controller.close(); } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
