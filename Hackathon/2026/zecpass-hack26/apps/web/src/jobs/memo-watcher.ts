/**
 * @module jobs/memo-watcher
 * Singleton memo watcher job — polls ZingoLib for new memos.
 */

import { MemoPollingService } from '@/services/MemoPollingService';

let watcher: MemoPollingService | null = null;
let started = false;

/**
 * Start the memo watcher singleton.
 * Safe to call multiple times — only starts once.
 */
export function startMemoWatcher(): void {
  if (started) return;
  started = true;

  try {
    watcher = new MemoPollingService();
    watcher.start();
  } catch (error) {
    console.error('[MemoWatcher] Failed to start:', error);
    started = false;
  }
}

/**
 * Stop the memo watcher.
 */
export function stopMemoWatcher(): void {
  if (watcher) {
    watcher.stop();
    watcher = null;
    started = false;
  }
}
