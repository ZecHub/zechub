// System wallet adapter — zingo-cli via per-command exec (no RPC server exists).
// Each call runs: ${ZINGO_EXEC} <command> [args]  (default e.g. "docker exec zec-zingo zw")
// The wrapper spawns zingo-cli, syncs, executes one command, saves, exits — so calls
// are serialized here to avoid two processes fighting over the wallet data dir.
//
// Used only for the shielded ownership-verification flow:
//   - reading incoming memos at BACKEND_ZADDR (value_transfers)
//   - sending the code memo back to the claimed address (quicksend)
// If ZINGO_EXEC / BACKEND_ZADDR are unset, shielded verification is disabled (501).

import { execFile } from 'child_process';

export interface ReceivedNote {
  txid: string;
  amount: number;      // ZEC
  amountZat?: number;
  memo: string;        // plaintext (zingo decodes memos already)
  confirmations: number;
}

export function walletConfigured(): boolean {
  return Boolean(process.env.ZINGO_EXEC && process.env.BACKEND_ZADDR);
}

export function backendZaddr(): string {
  return process.env.BACKEND_ZADDR || '';
}

// ── Serialized exec ──────────────────────────────────────────────────────────
let queue: Promise<unknown> = Promise.resolve();

function zingoExec(args: string[]): Promise<string> {
  const run = () =>
    new Promise<string>((resolve, reject) => {
      const parts = (process.env.ZINGO_EXEC || '').split(/\s+/).filter(Boolean);
      if (!parts.length) return reject(new Error('ZINGO_EXEC not configured'));
      const [cmd, ...prefix] = parts;
      // Each invocation syncs the wallet before answering — allow plenty of time.
      execFile(cmd, [...prefix, ...args], { timeout: 120_000, maxBuffer: 32 * 1024 * 1024 },
        (err, stdout, stderr) => {
          if (err) return reject(new Error(`zingo ${args[0]}: ${err.message}\n${stderr}`));
          resolve(stdout);
        });
    });
  const result = queue.then(run, run);
  queue = result.catch(() => {});
  return result;
}

// zingo-cli surrounds its JSON with sync/save chatter — extract the JSON body.
function extractJson(raw: string): unknown {
  for (const [open, close] of [['[', ']'], ['{', '}']] as const) {
    const start = raw.indexOf(open);
    const end = raw.lastIndexOf(close);
    if (start !== -1 && end > start) {
      try { return JSON.parse(raw.slice(start, end + 1)); } catch { /* try next shape */ }
    }
  }
  return null;
}

// ── Wallet ops ───────────────────────────────────────────────────────────────

// zingo is single-wallet: value_transfers lists everything received by the wallet,
// which holds exactly one UA (BACKEND_ZADDR). The address argument is ignored.
export async function zListReceivedByAddress(_address: string, minConf = 1): Promise<ReceivedNote[]> {
  const raw = await zingoExec(['value_transfers']);
  const json = extractJson(raw);
  const list: any[] = Array.isArray(json) ? json
    : json && Array.isArray((json as any).value_transfers) ? (json as any).value_transfers
    : [];
  if (!json) console.warn('[wallet] value_transfers: no JSON found in output:\n' + raw.slice(0, 2000));

  return list
    .filter((v) => String(v.kind ?? '').toLowerCase().includes('receiv'))
    .filter((v) => minConf < 1 || !/pending|transmitted/i.test(String(v.status ?? 'confirmed')))
    .map((v) => ({
      txid: String(v.txid ?? ''),
      amountZat: Number(v.value ?? 0),
      amount: Number(v.value ?? 0) / 100_000_000,
      memo: Array.isArray(v.memos) ? v.memos.join('\n') : String(v.memo ?? ''),
      confirmations: /pending|transmitted/i.test(String(v.status ?? '')) ? 0 : 1,
    }));
}

// quicksend = propose + confirm in one shot. Returns the txid (or raw output if
// the txid can't be located — callers only log it).
export async function zSendMany(
  _fromAddress: string,
  recipients: Array<{ address: string; amount: number; memo?: string }>,
): Promise<string> {
  const txids: string[] = [];
  for (const r of recipients) {
    const zats = Math.round(r.amount * 100_000_000);
    const args = ['quicksend', r.address, String(zats)];
    if (r.memo) args.push(r.memo);
    const raw = await zingoExec(args);
    const m = raw.match(/[0-9a-f]{64}/i);
    txids.push(m ? m[0] : raw.trim().slice(0, 200));
  }
  return txids.join(',');
}

// zingo returns memos as plaintext; kept for interface compatibility with callers
// that expect hex (passes plaintext through untouched).
export function decodeMemoHex(memo: string): string {
  if (/^[0-9a-fA-F]+$/.test(memo) && memo.length % 2 === 0) {
    try {
      const buf = Buffer.from(memo, 'hex');
      let end = buf.length;
      while (end > 0 && buf[end - 1] === 0) end--;
      return buf.subarray(0, end).toString('utf8');
    } catch { /* fall through */ }
  }
  return memo;
}
