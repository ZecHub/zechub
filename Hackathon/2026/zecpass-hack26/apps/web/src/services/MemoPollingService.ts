/**
 * @module services/MemoPollingService
 * Polls ZingoLib for new memos and processes ZecPass authentication memos.
 */

import { ZingolibClient } from '@/lib/zingolib';
import { parseMemoPayload } from '@/lib/challenge';
import { VerificationService } from './VerificationService';
import { config } from '@/lib/config';

export class MemoPollingService {
  private lastPolled: Date;
  private zingolib: ZingolibClient;
  private verificationService: VerificationService;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.lastPolled = new Date();
    this.zingolib = new ZingolibClient({
      baseUrl: config.zingolibServiceUrl,
      apiKey: config.zingolibApiKey(),
    });
    this.verificationService = new VerificationService();
  }

  async pollAndProcess(): Promise<void> {
    try {
      const memos = await this.zingolib.getRecentMemos(this.lastPolled);
      this.lastPolled = new Date();

      for (const memo of memos) {
        if (!memo.memo_text.startsWith('ZECPASS:v1:')) continue;
        const parsed = parseMemoPayload(memo.memo_text);
        if (!parsed) continue;

        try {
          await this.verificationService.processVerification(
            parsed.challenge_id, memo.memo_text, memo.tx_id
          );
          console.log(`[MemoWatcher] Verified challenge ${parsed.challenge_id}`);
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Unknown error';
          console.warn(`[MemoWatcher] Failed to verify ${parsed.challenge_id}: ${msg}`);
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      console.error(`[MemoWatcher] Poll failed: ${msg}`);
    }
  }

  start(): void {
    if (this.intervalId) return;
    console.log(`[MemoWatcher] Starting (interval: ${config.memoPollIntervalMs}ms)`);
    this.intervalId = setInterval(() => this.pollAndProcess(), config.memoPollIntervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('[MemoWatcher] Stopped');
    }
  }
}
