'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTournamentCode, setTournamentCode } from '@/lib/tournament';

const ENTRY_PRICE_ZEC = 0.001 as const;

// Brand magenta (ajusta si tienes token de color propio)
const MAGENTA = '#FF1F8F';

const REWARD_TIERS = [
  { levels: 1, pct: 0.10, label: 'Win 1 level → 10%' },
  { levels: 2, pct: 0.40, label: 'Win 2 levels → 40%' },
  { levels: 3, pct: 0.70, label: 'Win all 3 levels → 70%' },
];

export default function TriviaIntro() {
  const router = useRouter();
  const sp = useSearchParams();
  const [code, setCode] = useState<string | null>(null);

  // Pobla desde sessionStorage o desde ?code=
  useEffect(() => {
    const fromUrl = sp.get('code');
    if (fromUrl) {
      setTournamentCode(fromUrl);
      setCode(fromUrl);
      return;
    }
    setCode(getTournamentCode());
  }, [sp]);

  const rewards = useMemo(
    () =>
      REWARD_TIERS.map(t => ({
        ...t,
        zec: +(ENTRY_PRICE_ZEC * t.pct).toFixed(6),
      })),
    []
  );

  const missingCode = !code;

  function handleStart() {
    if (missingCode) return;
    router.push(`/trivias?mode=tournament&code=${encodeURIComponent(code!)}`);
  }

  // Reutilizable: estilo de card con borde/glow/gradiente magenta
  const cardCx =
    'border bg-zinc-950/60 rounded-2xl shadow-[0_0_24px_rgba(255,31,143,0.15)] ' +
    'backdrop-blur';
  const cardStyle = {
    borderColor: MAGENTA,
    background:
      `radial-gradient(120% 120% at 100% 0%, rgba(255,31,143,0.10) 0%, rgba(0,0,0,0) 40%),` +
      `linear-gradient(180deg, rgba(255,31,143,0.06) 0%, rgba(0,0,0,0) 60%)`,
  } as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-3 text-center">
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight text-center font-display"
          style={{ color: MAGENTA }}
        >
          Tournament — Trivia
        </h1>
      </header>

      {/* Info centrada */}
      <Card className={`${cardCx} mx-auto max-w-3xl`} style={cardStyle} role="note" aria-live="polite">
        <CardContent className="p-5 md:p-6">
          <p className="mx-auto max-w-2xl text-sm md:text-base text-center text-zinc-200">
            Enter the <span className="font-medium" style={{ color: MAGENTA }}>educational trivia tournament</span>:
            <strong> 3 mandatory levels</strong> (same style as the demo modes). Your session is tied to your
            confirmed payment memo. <span className="text-emerald-400">1 coin → 1 run</span>.
          </p>
        </CardContent>
      </Card>

      {/* Grid de 2 cuadros con el mismo estilo */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Session / Profile */}
        <Card role="region" aria-labelledby="session-title" className={cardCx} style={cardStyle}>
          <CardHeader className="pb-3">
            <CardTitle id="session-title" className="text-base" style={{ color: MAGENTA }}>
              Session Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 items-center gap-2 text-sm">
              <span className="text-zinc-400">Memo (code)</span>
              <span className="truncate text-right font-mono">{code ?? '—'}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2 text-sm">
              <span className="text-zinc-400">Entry price</span>
              <span className="text-right font-mono">{ENTRY_PRICE_ZEC} ZEC</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2 text-sm">
              <span className="text-zinc-400">Attempts</span>
              <span className="text-right font-mono">1 coin → 1 run</span>
            </div>

            {missingCode && (
              <p role="alert" className="text-xs text-amber-400">
                We couldn’t find your memo. Go back to payment or open this page using the confirmation link.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Rewards / Limits */}
        <Card role="region" aria-labelledby="rewards-title" className={cardCx} style={cardStyle}>
          <CardHeader className="pb-3">
            <CardTitle id="rewards-title" className="text-base" style={{ color: MAGENTA }}>
              Rewards & Limits (Phase 1)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-2">
              {rewards.map(t => (
                <li key={t.levels} className="flex items-center justify-between">
                  <span className="text-zinc-200">{t.label}</span>
                  <span className="font-mono">{t.zec} ZEC</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-zinc-400">
              Rewards are funded by your entry (individual pool per run). Network fees are paid by the player.
              Maximum payout per run is limited to the tier above. You must complete the 3 levels in a single run.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3">
        <Button
          type="button"
          onClick={handleStart}
          disabled={missingCode}
          aria-disabled={missingCode}
          aria-label="Start tournament"
          className="min-w-44 rounded-xl border px-6 py-3 text-base font-medium text-white shadow-[0_0_28px_rgba(255,31,143,0.35)]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900
                     disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            borderColor: MAGENTA,
            background:
              `linear-gradient(135deg, ${MAGENTA} 0%, #8B5CF6 100%)`, // magenta → purple
          }}
        >
          Start Tournament
        </Button>
        <p className="text-xs text-zinc-500 text-center max-w-md">
          Scores will be recorded for the leaderboard when you finish all 3 levels.
        </p>
      </div>
    </div>
  );
}
