'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import Logo from '@/components/Intro/Logo';
import CodeRain from '@/components/Intro/CodeRain';
import Typewriter from '@/components/Intro/Typewriter';
import PlayButton from '@/components/Intro/PlayButton';

const introLines = [
  'Establishing connection with Zcash…',
  'Authenticating Runner…',
  'Access granted.',
  'Your mission: Connect nodes. Break codes. Master the maze.',
];

export default function IntroPage() {
  return <IntroBody />;
}

function IntroBody() {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [canPlay, setCanPlay] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Watchdog por si algo se retrasa
  useEffect(() => {
    const t = window.setTimeout(() => setCanPlay(true), 12000);
    return () => window.clearTimeout(t);
  }, []);

  const handleDoneTyping = () => setCanPlay(true);

  const goMenu = () => {
    if (exiting) return;
    setExiting(true);
    const delay = reduce ? 50 : 550;
    window.setTimeout(() => router.push('/menu'), delay);
  };

  const onPlay = () => {
    if (!canPlay) setCanPlay(true);
    goMenu();
  };

  const onSkip = () => {
    setCanPlay(true);
    const btn = document.querySelector<HTMLButtonElement>('[data-testid="zq-play"]');
    btn?.focus();
  };

  return (
    <main className="relative min-h-dvh bg-black overflow-hidden">
      {/* Fondo animado */}
      <CodeRain className="z-0" density={0.6} speed={exiting ? 1.8 : 1.0} />

      {/* Contenido principal */}
      <AnimatePresence mode="wait">
        {!exiting && (
          <motion.section
            key="intro-content"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? {} : { opacity: 0, y: -12, scale: 1.02 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
          >
            <Logo glow />

            <Typewriter
              lines={introLines}
              charSpeedMs={18}
              lineDelayMs={350}
              onDone={handleDoneTyping}
            />

            {/* Revelado del PLAY al terminar o al saltar */}
            <AnimatePresence>
              {canPlay && (
                <motion.div
                  key="play-wrap"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <PlayButton className="mt-2" onClick={onPlay} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chip final con borde verde */}
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#00FF9C]/50 bg-[#00FF9C]/10 px-3 py-1.5 text-[12px] text-[#D1FFEC] shadow-[0_0_18px_rgba(0,255,156,0.18)]">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[#00FF9C]"
                />
                Educational demo to learn about the Zcash ecosystem
              </span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </main>
  );
}
