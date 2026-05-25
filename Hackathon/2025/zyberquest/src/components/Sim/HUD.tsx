'use client'

import { useSimStore } from '@/store/simStore'

export default function HUD() {
  const { timeLeft, score, streak, hintsLeft, isPaused, togglePause, difficulty } = useSimStore()
  const t = Math.max(0, Math.ceil(timeLeft))

  return (
    <header className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
      <div className="rounded border border-white/10 bg-black/30 px-3 py-2">
        <span className="opacity-70">Time:</span> {t}s
      </div>
      <div className="rounded border border-white/10 bg-black/30 px-3 py-2">
        <span className="opacity-70">Score:</span> {score}
      </div>
      <div className="rounded border border-white/10 bg-black/30 px-3 py-2">
        <span className="opacity-70">Streak:</span> {streak}
      </div>
      <div className="rounded border border-white/10 bg-black/30 px-3 py-2">
        <span className="opacity-70">Hints:</span> {hintsLeft}
      </div>
      <div className="rounded border border-white/10 bg-black/30 px-3 py-2 flex items-center justify-end">
        <button
          onClick={togglePause}
          disabled={!difficulty}
          className="rounded border border-white/20 px-2 py-1 hover:border-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)] disabled:opacity-40"
          aria-pressed={isPaused}
          title="Pause/Resume (P)"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </header>
  )
}
