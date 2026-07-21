/**
 * @module wallet
 * ZingoLib wallet interface — MOCK IMPLEMENTATION for hackathon demo.
 *
 * This module provides a stub implementation that reads from a local JSON file.
 * For production, replace this with real ZingoLib FFI bindings.
 *
 * HOW TO SWAP IN REAL ZINGOLIB BINDINGS:
 * ─────────────────────────────────────
 * Option A: Use the `zingolib` npm package (when available)
 *   import { Wallet } from 'zingolib';
 *   const wallet = new Wallet({ dataDir: '/data/zingolib', network: 'mainnet' });
 *
 * Option B: Spawn a Rust binary as a child process
 *   import { execFile } from 'child_process';
 *   const result = execFile('./zingolib-cli', ['memos', '--since', since.toISOString()]);
 *
 * Option C: Use ZingoLib's gRPC/REST interface
 *   Call the ZingoLib daemon's native API endpoints.
 *
 * The interface (ZecMemo, getRecentMemos, getBalance) stays the same regardless of backend.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

interface ZecMemo {
  tx_id: string;
  memo_text: string;
  received_at: string;
  amount_zat: number;
}

interface MockData {
  memos: ZecMemo[];
  balance: { shielded: number; transparent: number };
  synced: boolean;
  block_height: number;
}

function loadMockData(): MockData {
  try {
    const filePath = join(__dirname, '..', 'zingolib-mock-data.json');
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as MockData;
  } catch (err) {
    try {
      const filePath = join(process.cwd(), 'zingolib-mock-data.json');
      const raw = readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as MockData;
    } catch (fallbackErr) {
      console.error('[ZingoLib Mock] Error reading zingolib-mock-data.json:', {
        dirError: err instanceof Error ? err.message : err,
        cwdError: fallbackErr instanceof Error ? fallbackErr.message : fallbackErr,
        dirname: typeof __dirname !== 'undefined' ? __dirname : 'undefined',
        cwd: process.cwd()
      });
      return {
        memos: [],
        balance: { shielded: 0, transparent: 0 },
        synced: false,
        block_height: 0,
      };
    }
  }
}

/**
 * Get recent shielded memos received by the ZecPass address.
 * In production, this calls ZingoLib FFI to read actual blockchain memos.
 */
export async function getRecentMemos(since?: Date): Promise<ZecMemo[]> {
  const data = loadMockData();
  if (!since) return data.memos;
  return data.memos.filter((m) => new Date(m.received_at) > since);
}

/**
 * Get wallet balance (shielded + transparent).
 */
export async function getBalance(): Promise<{ shielded: number; transparent: number }> {
  const data = loadMockData();
  return data.balance;
}

/**
 * Check if the wallet is fully synced with the blockchain.
 */
export async function isWalletSynced(): Promise<boolean> {
  const data = loadMockData();
  return data.synced;
}

/**
 * Get the current block height.
 */
export async function getBlockHeight(): Promise<number> {
  const data = loadMockData();
  return data.block_height;
}
