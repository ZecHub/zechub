'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { API, getTournamentCode } from '@/lib/tournament';
import { Button } from '@/components/ui/button';

export default function FinalPanel() {
  const sp = useSearchParams();
  const router = useRouter();
  const isTournament = sp.get('mode') === 'tournament';
  const levels = Number(sp.get('levels') || 0); // 0..3 (lo pasamos desde SummaryModal)
  const code = getTournamentCode();

  const eligible = isTournament && levels >= 1;
  const prize = useMemo(() => (
    levels >= 3 ? 0.0007 :
    levels >= 2 ? 0.0004 :
    levels >= 1 ? 0.0001 : 0
  ), [levels]);

  const [ua, setUa] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; txid?: string; error?: string } | null>(null);

  async function claim() {
    if (!code) { setResult({ ok:false, error:'Missing ticket' }); return; }
    if (!/^u[0-9a-z]{30,}$/i.test(ua)) { setResult({ ok:false, error:'Invalid UA' }); return; }
    setSending(true); setResult(null);
    try {
      const res = await fetch(`${API}/api/tournament/payout`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ code, to: ua }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) setResult({ ok:true, txid: json.txid });
      else setResult({ ok:false, error: json?.error || 'payout_failed' });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-black p-6 text-white" style={{ borderColor:'#F9C400' }}>
      <h2 className="text-xl font-semibold mb-2">Tournament Result</h2>
      <div className="text-sm mb-4">
        Levels passed: <span className="font-mono">{levels}</span> / 3
      </div>

      {eligible ? (
        <>
          <div className="text-sm mb-2">
            🎉 You’re eligible for a reward of <span className="font-mono">{prize.toFixed(4)} ZEC</span>.
          </div>
          <label className="text-xs opacity-80">Your Unified Address (UA)</label>
          <input
            className="mt-1 w-full rounded border bg-black/40 p-2 text-sm"
            style={{ borderColor:'#F9C400' }}
            placeholder="u1..."
            value={ua}
            onChange={e => setUa(e.target.value.trim())}
          />
          <Button
            className="mt-3 w-full rounded-xl border text-black"
            style={{ background:'#F9C400', borderColor:'#F9C400' }}
            disabled={sending || !ua}
            onClick={claim}
          >
            {sending ? 'Sending…' : 'Claim Reward'}
          </Button>

          {result?.ok && (
            <div className="mt-3 text-xs text-emerald-400">
              Reward sent. TXID <span className="font-mono">{result.txid || '(pending)'}</span>
              <div className="opacity-70">Memo: <span className="font-mono">Zyberques-Winner</span></div>
            </div>
          )}
          {result && !result.ok && (
            <div className="mt-3 text-xs text-amber-400">
              {result.error}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-sm opacity-80 mb-3">
            No reward this time. Try again!
          </div>
          <Button
            className="w-full rounded-xl border text-black"
            style={{ background:'#F9C400', borderColor:'#F9C400' }}
            onClick={() => router.push('/tournament/pay')}
          >
            Insert Coin
          </Button>
        </>
      )}
    </div>
  );
}
