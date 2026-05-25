'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AddressBox from './AddressBox';
import MemoBox from './MemoBox';
import QrBox from './QrBox';
import NetworkBar from './NetworkBar';
import { FALLBACK_UA, buildZcashURI } from '@/lib/coin';
import { useToast } from '@/components/ui/use-toast';

type NewCoinResponse = {
  code?: string;
  address?: string;
  zcashURI?: string;
  expiresAt?: string;
};

type StatusValue = 'PENDING' | 'CONFIRMED' | 'EXPIRED';

type StatusResponse = {
  status: StatusValue;
  confirmations?: number;
  blockHeight?: number;
  txid?: string | null;
};

const POLL_MS = 5_000;
const SLOW_WARN_MS = 30 * 60 * 1000;
const PRICE_LABEL = '0.001 ZEC';
const FORCE_DELAY_MS = 60_000; // mostrar botón a los 60s

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://192.168.100.12:3001';

export default function PayPanel() {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [data, setData]       = useState<NewCoinResponse | null>(null);

  const ua   = data?.address || FALLBACK_UA;
  const memo = data?.code    || '';

  const uri = useMemo(() => {
    if (data?.zcashURI) return data.zcashURI;
    if (ua && memo) return buildZcashURI(ua, memo);
    return '';
  }, [data?.zcashURI, ua, memo]);

  const [status, setStatus] = useState<StatusValue>('PENDING');
  const [confirmations, setConfirmations] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);

  const createdRef  = useRef(false);
  const pollRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const slowWarnRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [forceVisible, setForceVisible] = useState(false);

  // ===== Nueva sesión
  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;

    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API}/api/coin/new`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error((await res.text().catch(() => '')) || `HTTP ${res.status}`);
        const json = (await res.json()) as NewCoinResponse;
        setData(json);

        // Debug útil para verificar QR y memo:
        console.log('[pay] memo(code)=', json.code);
        console.log('[pay] zcashURI =', json.zcashURI);

        setForceVisible(false);
        setTimeout(() => setForceVisible(true), FORCE_DELAY_MS);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError(e?.message || 'Failed to start payment session');
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  async function manualNewSession() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/api/coin/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });
      const json = (await res.json()) as NewCoinResponse;
      setData(json);
      setStatus('PENDING');
      setConfirmations(0);
      setForceVisible(false);
      setTimeout(() => setForceVisible(true), FORCE_DELAY_MS);

      console.log('[pay] memo(code)=', json.code);
      console.log('[pay] zcashURI =', json.zcashURI);
    } catch (e: any) {
      setError(e?.message || 'manual new session failed');
    } finally {
      setLoading(false);
    }
  }

  // ===== Polling de estado
  useEffect(() => {
    if (!memo) return;
    if (status === 'CONFIRMED' || status === 'EXPIRED') return;

    if (!slowWarnRef.current) {
      slowWarnRef.current = setTimeout(() => {
        if (status === 'PENDING') {
          toast({
            title: 'Network is slower than usual',
            description: 'Keep this tab open. We’ll confirm as soon as the payment is detected.',
          });
        }
      }, SLOW_WARN_MS);
    }

    async function fetchStatus() {
      try {
        const res = await fetch(`${API}/api/coin/status?code=${encodeURIComponent(memo)}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Status HTTP ${res.status}`);
        const json = (await res.json()) as StatusResponse;

        if (typeof json.blockHeight === 'number') setBlockHeight(json.blockHeight);
        if (typeof json.confirmations === 'number') {
          setConfirmations(Math.max(0, Math.min(1, json.confirmations)));
        }

        if (json.status === 'CONFIRMED') {
          setStatus('CONFIRMED');
          setConfirmations(1);
          try { sessionStorage.setItem('tournament_code', memo); } catch {}
        } else if (json.status === 'EXPIRED') {
          setStatus('EXPIRED');
        } else {
          setStatus('PENDING');
        }
      } catch {
        // retry next tick
      }
    }

    fetchStatus();
    pollRef.current = setInterval(fetchStatus, POLL_MS);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = null;
      if (slowWarnRef.current) {
        clearTimeout(slowWarnRef.current);
        slowWarnRef.current = null;
      }
    };
  }, [memo, status, toast]);

  // ===== Redirección cuando confirma
  useEffect(() => {
    if (status === 'CONFIRMED' && memo) {
      try { sessionStorage.setItem('tournament_code', memo); } catch {}
      const t = setTimeout(() => {
        router.push(`/tournament/trivia?code=${encodeURIComponent(memo)}`);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [status, memo, router]);

  const expiresHuman = useMemo(() => {
    if (!data?.expiresAt) return null;
    const d = new Date(data.expiresAt);
    return Number.isNaN(d.getTime())
      ? null
      : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [data?.expiresAt]);

  const canPlay = status === 'CONFIRMED';

  async function forceConfirm() {
    if (!memo) return;
    try {
      const res = await fetch(`${API}/api/coin/force-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ code: memo }),
      });
      if (res.status === 409) {
        toast({
          title: 'We have not seen your payment yet',
          description: 'Please wait a bit more or ensure your wallet sent the tx.',
        });
        return;
      }
      if (!res.ok) throw new Error(`force HTTP ${res.status}`);
      setStatus('CONFIRMED');
      setConfirmations(1);
    } catch {
      toast({
        title: 'Could not force confirmation',
        description: 'Try again in a few seconds.',
      });
    }
  }

  return (
    <Card className="flex w-full flex-col gap-4 border-zinc-800/60 bg-zinc-950/60" role="form" aria-describedby="payment-desc">
      <CardHeader>
        <CardTitle className="text-xl">Tournament — Insert Coin</CardTitle>
        <p id="payment-desc" className="text-sm text-zinc-400">
          Pay to enter the tournament mode. Keep this page open.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {/* Price */}
        <div className="grid grid-cols-2 items-center gap-3">
          <div className="text-zinc-400">Price</div>
          <div className="justify-self-end font-mono">{PRICE_LABEL}</div>
        </div>

        {/* Status line */}
        <div className="min-h-5 text-xs" aria-live="polite">
          {loading && <span role="status" className="text-zinc-400">Initializing payment session…</span>}
          {!loading && error && <span role="alert" className="text-amber-400">{error}</span>}
          {!loading && !error && status === 'PENDING' && (
            <span className="text-zinc-500">Waiting for on-chain confirmation…</span>
          )}
          {!loading && !error && status === 'CONFIRMED' && (
            <span className="text-emerald-400">Coin inserted ✓ Redirecting…</span>
          )}
          {!loading && !error && status === 'EXPIRED' && (
            <span className="text-amber-400">Session expired. Refresh to start a new one.</span>
          )}
          {!loading && !error && expiresHuman && (
            <span className="ml-2 text-zinc-500">
              (expires ~<span className="font-mono">{expiresHuman}</span>)
            </span>
          )}
        </div>

        {/* New session debug */}
        <Button type="button" variant="secondary" onClick={manualNewSession}>
          New Session (debug)
        </Button>

        {/* Address & Memo */}
        <AddressBox address={ua} loading={loading} />
        <MemoBox memo={memo} loading={loading || !memo} />

        {/* QR */}
        <QrBox zcashURI={uri} loading={loading || !memo} />

        {/* Network / Progress */}
        <NetworkBar blockHeight={blockHeight} etaSecondsPerBlock={75} confirmations={confirmations} />

        {/* CTA principal */}
        <Button
          type="button"
          className="w-full"
          disabled={!canPlay}
          aria-disabled={!canPlay}
          aria-live="polite"
          onClick={() => router.push(`/tournament/trivia?code=${encodeURIComponent(memo)}`)}
        >
          {canPlay ? 'PLAY' : 'Waiting for confirmation…'}
        </Button>

        {/* Fallback humano: aparece a los 60s */}
        {status === 'PENDING' && memo && forceVisible && (
          <Button type="button" variant="outline" className="w-full" onClick={forceConfirm}>
            Payment ready
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
