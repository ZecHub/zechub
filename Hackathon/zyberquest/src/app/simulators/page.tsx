'use client'

import HUD from '@/components/Sim/HUD'
import XORBoard from '@/components/Sim/XORBoard'
import SummaryModal from '@/components/Sim/SummaryModal'
import { useSimStore } from '@/store/simStore'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'

export default function SimulatorsPage() {
  const {
    difficulty,
    isPaused,
    timeLeft,
    justSolved,
    decreaseTime,
    endRound,
    togglePause,
    start,
    reset,
  } = useSimStore()

  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const [localDiff, setLocalDiff] =
    useState<'beginner' | 'intermediate' | 'advanced'>('beginner')

  const fadeSlide = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const restartCurrent = () => {
    if (!difficulty) return
    lastTsRef.current = null // resetea acumulador del timer
    start(difficulty)        // nueva runSeed, tiempo completo, unpausa
  }
  const goToMenu = () => {
    reset()
    router.push('/simulators')
  }

  // Teclas globales (sin ESC)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === 'p') togglePause()
      if (k === 'r' && difficulty) restartCurrent()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePause, difficulty])

  // Timer (solo cuando hay partida)
  useEffect(() => {
    if (!difficulty) return
    const loop = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      if (!isPaused) decreaseTime(dt)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
    }
  }, [difficulty, isPaused, decreaseTime])

  // Expiración y cierre tras solve
  useEffect(() => { if (difficulty && timeLeft <= 0) endRound('expired') }, [difficulty, timeLeft, endRound])
  useEffect(() => {
    if (!difficulty || !justSolved) return
    const t = setTimeout(() => endRound('solved'), 650)
    return () => clearTimeout(t)
  }, [difficulty, justSolved, endRound])

  return (
    <main className="relative min-h-[100dvh] text-white overflow-hidden bg-[var(--zx-ink)]">
      {/* code-rain sutil + scanline en intro */}
      {!difficulty && (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
            <div className="absolute inset-0 bg-[length:2px_16px] bg-repeat-y bg-[linear-gradient(to_bottom,rgba(255,61,190,0.22)_1px,transparent_1px)] animate-zx-rain" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[length:100%_2px]" />
        </>
      )}

      {/* INTRO */}
      {!difficulty && (
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16">
          <motion.h1
            initial="hidden" animate="show" variants={fadeSlide}
            className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--zx-magenta)]"
          >
            Simulators — Play as a Hacker
          </motion.h1>

          <div className="grid items-start gap-10 md:grid-cols-2 mt-10">
            {/* Columna izquierda: card principal + qué es XOR */}
            <div className="flex flex-col gap-8">
              <motion.div initial="hidden" animate="show" variants={fadeSlide}>
                <div
                  className="rounded-2xl border p-6 md:p-7"
                  style={{
                    borderColor: 'var(--zx-magenta)',
                    background:
                      'linear-gradient(180deg, rgba(255,61,190,0.18) 0%, rgba(255,61,190,0.10) 60%, rgba(10,13,10,0.60) 100%)',
                  }}
                >
                  <p className="text-base md:text-lg">
                    Intercept the cipher. Flip bits on <span className="font-mono">B</span> so that{' '}
                    <span className="font-mono">A XOR B</span> reveals the hidden pattern.
                    <br className="hidden md:block" />
                    <span className="text-sm md:text-base opacity-90">
                      Scoring — <b>Perfect Clean</b>: letters lit + background cleared (100%).{' '}
                      <b>Decrypted</b>: letters lit only (70%).
                    </span>
                  </p>

                  {/* Dificultad */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {(['beginner','intermediate','advanced'] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setLocalDiff(d)}
                        className={[
                          'px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]',
                          localDiff === d
                            ? 'bg-[var(--zx-magenta)] text-black'
                            : 'bg-black/40 border border-white/15 hover:border-[var(--zx-yellow)]',
                        ].join(' ')}
                        aria-pressed={localDiff === d}
                      >
                        {d === 'beginner' ? 'Beginner' : d === 'intermediate' ? 'Intermediate' : 'Advanced'}
                      </button>
                    ))}
                  </div>

                  {/* Start + Back to Main Menu */}
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => start(localDiff)}
                      className="inline-flex items-center justify-center rounded-lg border px-6 py-3 font-semibold text-white border-[var(--zx-magenta)] hover:bg-[var(--zx-yellow)] hover:text-black focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
                      title="Enter to start"
                    >
                      Start • {localDiff === 'beginner' ? 'Beginner' : localDiff === 'intermediate' ? 'Intermediate' : 'Advanced'}
                    </button>

                    <button
                      onClick={() => router.push('/menu')}
                      className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-3 text-sm hover:border-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
                      title="Go to games menu"
                    >
                      Back to Main Menu
                    </button>
                  </div>

                  {/* Shortcuts (sin ESC) */}
                  <div className="mt-5 rounded-lg border border-white/15 bg-black/30 p-3">
                    <div className="text-xs text-[var(--zx-yellow)] font-medium mb-1">Controls</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-xs md:text-sm">
                      <div>1) Keyboard &amp; mouse.</div>
                      <div>2) P Pause / Resume</div>
                      <div>3) R Restart</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ¿Qué es XOR? */}
              <motion.div initial="hidden" animate="show" variants={fadeSlide}>
                <div
                  className="rounded-2xl border p-6 md:p-7"
                  style={{
                    borderColor: 'var(--zx-magenta)',
                    background: 'linear-gradient(180deg, rgba(0,229,255,0.06) 0%, rgba(10,13,10,0.6) 100%)',
                  }}
                >
                  <h2 className="text-lg font-semibold text-[var(--zx-magenta)]">What is XOR cipher?</h2>
                  <p className="mt-2 text-sm md:text-base opacity-90">
                    XOR is a bitwise operation: a bit becomes <span className="font-mono">1</span> only when the inputs differ.
                    In this simulator, you toggle <span className="font-mono">B</span> so that <span className="font-mono">A XOR B</span> matches a target mask (letters).
                  </p>
                  <ul className="mt-3 text-sm list-disc pl-5 space-y-1 opacity-90">
                    <li><b>Rows/columns strategy:</b> lock full rows to reduce search space.</li>
                    <li><b>Even vs odd flips:</b> flipping twice cancels; once reveals.</li>
                    <li><b>Hints:</b> reveal a correct row (–10 points).</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }}
              aria-hidden="true"
            >
              <div className="relative mx-auto w-[88%] md:w	full">
                <div
                  className="absolute -inset-6 rounded-3xl blur-2xl"
                  style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(255,61,190,.35), transparent)' }}
                />
                <Image
                  src="/simulador/cryptanalyst.png"
                  alt=""
                  width={880}
                  height={880}
                  priority
                  className="relative z-10 w-full h-auto"
                />
                <div className="pointer-events-none absolute right-6 top-6 h-4 w-20 rounded-full bg-[var(--zx-yellow)]/70 blur-md" />
                <div className="pointer-events-none absolute left-10 bottom-10 h-3 w-12 rounded-full bg-[var(--zx-yellow)]/60 blur-sm" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* JUEGO */}
      {difficulty && (
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
          <HUD />

          {/* Overlay de pausa con 3 opciones (sin mencionar ESC) */}
          {isPaused && (
            <div className="fixed inset-0 z-40 grid place-items-center bg-black/75 backdrop-blur-sm">
              <div className="w-[min(520px,92vw)] rounded-2xl border border-white/10 bg-black/80 p-6 text-center">
                <div className="text-xl font-semibold text-[var(--zx-magenta)] mb-2">Paused</div>
                <p className="opacity-80 mb-4 text-sm">
                  Use <kbd className="border px-1">P</kbd> to resume, or <kbd className="border px-1">R</kbd> to restart. 
                  You can also use the button below to go back to the menu.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={togglePause}
                    className="rounded-md bg-[var(--zx-magenta)] px-4 py-2 font-medium text-black hover:ring-2 hover:ring-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
                    title="P"
                  >
                    Resume (P)
                  </button>
                  <button
                    onClick={restartCurrent}
                    className="rounded-md border border-white/20 px-4 py-2 hover:border-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
                    title="R"
                  >
                    Restart (R)
                  </button>
                  <button
                    onClick={goToMenu}
                    className="rounded-md border border-white/20 px-4 py-2 hover:border-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
                    title="Go to menu"
                  >
                    Go to Menu
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <XORBoard />
          </div>
        </section>
      )}

      <SummaryModal />

      <style jsx>{`
        @keyframes zx-rain { from { transform: translateY(-16px); } to { transform: translateY(0); } }
        .animate-zx-rain { animation: zx-rain .8s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .animate-zx-rain { animation: none !important; } }
      `}</style>
    </main>
  )
}
