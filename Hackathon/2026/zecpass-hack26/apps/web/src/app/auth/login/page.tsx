'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChallengeQR } from '@/components/ChallengeQR';
import { Loader2, CheckCircle, XCircle, Copy, Clock, Send } from 'lucide-react';

type Step = 'init' | 'challenge' | 'waiting' | 'manual' | 'success' | 'error';

function LoginContent() {
  const searchParams = useSearchParams();
  const appId = searchParams.get('app_id') || process.env.NEXT_PUBLIC_ZECPASS_APP_ID || '';
  const redirectUri = searchParams.get('redirect_uri') || '/dashboard';

  const [step, setStep] = useState<Step>('init');
  const [challenge, setChallenge] = useState<{ challenge_id: string; zecpass_address: string; memo_payload: string; expires_at: number; qr_uri: string } | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const requestChallenge = useCallback(async () => {
    try {
      setStep('challenge');
      const res = await fetch('/api/auth/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_id: appId, scope: ['identity'], redirect_uri: redirectUri }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create challenge');

      const memoBase64 = btoa(data.memo_payload);
      setChallenge({
        challenge_id: data.challenge_id,
        zecpass_address: data.zecpass_address,
        memo_payload: data.memo_payload,
        expires_at: data.expires_at,
        qr_uri: `zcash:${data.zecpass_address}?amount=0.0001&memo=${memoBase64}`,
      });
      setCountdown(data.expires_at - Math.floor(Date.now() / 1000));
      setStep('waiting');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStep('error');
    }
  }, [appId, redirectUri]);

  // Countdown timer
  useEffect(() => {
    if (step !== 'waiting' || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); setStep('error'); setError('Challenge expired'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step, countdown]);

  // SSE polling for challenge status
  useEffect(() => {
    if (step !== 'waiting' || !challenge) return;
    const eventSource = new EventSource(`/api/auth/challenge/${challenge.challenge_id}/status`);
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === 'used') {
          if (data.access_token) {
            document.cookie = `zecpass_token=${data.access_token}; path=/; max-age=${data.expires_in || 86400}; SameSite=Lax`;
          }
          setStep('success');
          // Set cookie and redirect
          setTimeout(() => { window.location.href = redirectUri; }, 2000);
        }
      } catch {}
    };
    eventSource.onerror = () => { eventSource.close(); };
    return () => eventSource.close();
  }, [step, challenge, redirectUri]);

  const handleManualVerify = async () => {
    if (!challenge || !txId) return;
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challenge_id: challenge.challenge_id, tx_id: txId, memo: challenge.memo_payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      document.cookie = `zecpass_token=${data.access_token}; path=/; max-age=${data.expires_in}; SameSite=Lax`;
      setStep('success');
      setTimeout(() => { window.location.href = redirectUri; }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setStep('error');
    }
  };

  const copyMemo = () => {
    if (challenge) {
      navigator.clipboard.writeText(challenge.memo_payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-4">
          <span className="text-black font-bold text-xl">Z</span>
        </div>
        <h1 className="text-2xl font-bold">Sign in with Zcash</h1>
        <p className="text-text-secondary text-sm mt-1">Privacy-preserving authentication</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['Challenge', 'Verify', 'Connected'].map((label, i) => {
          const stepIndex = step === 'init' ? -1 : step === 'challenge' ? 0 : step === 'waiting' || step === 'manual' ? 1 : 2;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${i <= stepIndex ? 'gradient-gold text-black' : 'bg-bg-tertiary text-text-muted'}`}>
                {i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${i <= stepIndex ? 'text-text-primary' : 'text-text-muted'}`}>{label}</span>
              {i < 2 && <div className={`w-8 h-px ${i < stepIndex ? 'bg-zec-gold' : 'bg-border-primary'}`} />}
            </div>
          );
        })}
      </div>

      <Card className="glass">
        <CardContent className="p-6">
          {step === 'init' && (
            <div className="text-center space-y-4">
              <p className="text-text-secondary">Send a shielded memo to prove you own a Zcash address — without revealing it.</p>
              <Button size="lg" className="w-full" onClick={requestChallenge}>Generate Challenge</Button>
            </div>
          )}

          {step === 'challenge' && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-zec-gold" />
            </div>
          )}

          {step === 'waiting' && challenge && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="warning"><Clock className="h-3 w-3 mr-1" />{minutes}:{seconds.toString().padStart(2, '0')}</Badge>
                <Badge variant="outline">Waiting for memo...</Badge>
              </div>

              <ChallengeQR uri={challenge.qr_uri} size={200} />

              <div className="space-y-2">
                <p className="text-xs text-text-muted">Or copy the memo payload manually:</p>
                <div className="flex gap-2">
                  <code className="flex-1 p-2 rounded-lg bg-bg-secondary text-xs font-mono text-text-secondary truncate border border-border-primary">{challenge.memo_payload}</code>
                  <Button variant="outline" size="icon" onClick={copyMemo}>
                    {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-text-muted">Send to: <span className="font-mono text-text-secondary">{challenge.zecpass_address.slice(0, 20)}...</span></p>
              </div>

              <div className="border-t border-border-primary pt-4 space-y-2">
                <p className="text-xs text-text-muted">Already sent? Paste your tx_id:</p>
                <div className="flex gap-2">
                  <input type="text" value={txId} onChange={(e) => setTxId(e.target.value)} placeholder="Paste transaction ID..." className="flex-1 px-3 py-2 rounded-lg bg-bg-secondary border border-border-primary text-sm focus:outline-none focus:border-zec-gold/50" />
                  <Button variant="outline" size="icon" onClick={handleManualVerify} disabled={!txId}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold">Authentication Successful!</h3>
              <p className="text-sm text-text-secondary">Redirecting to your app...</p>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center mx-auto">
                <XCircle className="h-8 w-8 text-error" />
              </div>
              <h3 className="text-lg font-semibold">Authentication Failed</h3>
              <p className="text-sm text-text-secondary">{error}</p>
              <Button variant="outline" onClick={() => { setStep('init'); setError(''); }}>Try Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      <Suspense fallback={
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-zec-gold" />
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
