'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSimStore } from '@/store/simStore'

export default function SummaryModal() {
  const { lastSummary, reset, start } = useSimStore()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => { setOpen(!!lastSummary) }, [lastSummary])

  const timeUsed = useMemo(() => {
    if (!lastSummary) return 0
    return Math.max(0, Math.round(lastSummary.timeTotal - lastSummary.timeLeft))
  }, [lastSummary])

  const highScore = useMemo(() => {
    if (!lastSummary || typeof window === 'undefined') return 0
    return Number(localStorage.getItem('zyberquest_highscore_xor') || '0')
  }, [lastSummary])

  if (!open || !lastSummary) return null

  const label = (d: 'beginner'|'intermediate'|'advanced') =>
    d === 'beginner' ? 'Beginner' : d === 'intermediate' ? 'Intermediate' : 'Advanced'

  // Cierra modal y ejecuta acción en el siguiente frame
  const closeThen = (fn: () => void) => {
    setOpen(false)
    reset()
    requestAnimationFrame(() => fn())
  }

  const playAgain = () => {
    closeThen(() => start(lastSummary.difficulty))
  }

  const nextLevel =
    lastSummary.difficulty === 'beginner' ? 'intermediate' :
    lastSummary.difficulty === 'intermediate' ? 'advanced' :
    null as 'intermediate' | 'advanced' | null

  const goNext = () => {
    if (!nextLevel) return
    closeThen(() => start(nextLevel))
  }

  const backToMenu = () => {
    closeThen(() => router.push('/simulators'))
  }

  const gradeText = lastSummary.grade
    ? lastSummary.grade === 'perfect'
      ? 'Perfect Clean (100%)'
      : 'Decrypted (70%)'
    : '—'

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm">
      <div className="w-[min(640px,92vw)] rounded-2xl border border-white/10 bg-black/80 p-6">
        <h3 className="text-xl font-semibold text-[var(--zx-magenta)]">Decryption Summary</h3>

        <div className="mt-4 grid gap-2 text-sm">
          <Row label="Mode" value="Visual XOR" />
          <Row label="Difficulty" value={label(lastSummary.difficulty)} />
          <Row label="Outcome" value={cap(lastSummary.outcome)} />
          <Row label="Grade" value={gradeText} />
          <Row label="Solved in" value={`${timeUsed}s`} />
          <Row label="Score" value={String(lastSummary.score)} />
          <Row label="Best Streak" value={String(lastSummary.streakAfter)} />
          <Row label="High score (XOR)" value={String(highScore)} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={playAgain}
            className="rounded-md bg-[var(--zx-magenta)] px-4 py-2 font-medium text-black hover:ring-2 hover:ring-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
          >
            Play again ({label(lastSummary.difficulty)})
          </button>

          {nextLevel && (
            <button
              onClick={goNext}
              className="rounded-md border border-white/20 px-4 py-2 hover:border-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
            >
              Next level → {label(nextLevel)}
            </button>
          )}

          <button
            onClick={backToMenu}
            className="ml-auto rounded-md border border-white/20 px-4 py-2 hover:border-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="opacity-70">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
