// store/simStore.ts
import { create } from 'zustand'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
type Outcome = 'solved' | 'expired'
export type Grade = 'perfect' | 'partial' // 100% vs 70%

const DIFF_TIME: Record<Difficulty, number> = {
  beginner: 90,
  intermediate: 75,
  advanced: 60,
}

export type Summary = {
  mode: 'xor'
  difficulty: Difficulty
  outcome: Outcome
  grade: Grade | null
  timeTotal: number
  timeLeft: number
  score: number
  streakAfter: number
  timestamp: number
}

type SimState = {
  difficulty: Difficulty | null
  timeLeft: number
  timeTotal: number
  score: number
  streak: number
  hintsLeft: number
  isPaused: boolean
  justSolved: boolean
  lastSummary: Summary | null
  lastGrade: Grade | null
  runSeed: number | null

  start: (difficulty: Difficulty) => void
  decreaseTime: (dtSec: number) => void
  solve: (multiplier?: number, grade?: Grade) => void
  endRound: (outcome: Outcome) => void
  useHint: () => void
  reset: () => void
  togglePause: () => void
}

const LS_KEY = 'zyberquest_simulators_runs_v1'

function persistRun(s: Summary) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(LS_KEY)
    const data: { runs: Summary[] } = raw ? JSON.parse(raw) : { runs: [] }
    data.runs.unshift(s)
    data.runs = data.runs.slice(0, 10)
    localStorage.setItem(LS_KEY, JSON.stringify(data))
    const hsKey = `zyberquest_highscore_xor`
    const prev = Number(localStorage.getItem(hsKey) || '0')
    if (s.score > prev) localStorage.setItem(hsKey, String(s.score))
  } catch {}
}

export const useSimStore = create<SimState>((set, get) => ({
  difficulty: null,
  timeLeft: 0,
  timeTotal: 0,
  score: 0,
  streak: 0,
  hintsLeft: 3,
  isPaused: false,
  justSolved: false,
  lastSummary: null,
  lastGrade: null,
  runSeed: null,

  start: (difficulty) =>
    set(() => ({
      difficulty,
      timeLeft: DIFF_TIME[difficulty],
      timeTotal: DIFF_TIME[difficulty],
      score: 0,
      hintsLeft: 3,
      isPaused: false,
      justSolved: false,
      lastSummary: null,
      lastGrade: null,
      runSeed: Date.now(), // nueva semilla en cada inicio/restart
    })),

  decreaseTime: (dtSec) =>
    set((s) => {
      if (!s.difficulty || s.isPaused) return {}
      const next = Math.max(0, s.timeLeft - dtSec)
      return { timeLeft: next }
    }),

  // multiplier: 1 (perfect) o 0.7 (partial)
  solve: (multiplier = 1, grade: Grade = 'perfect') =>
    set((s) => {
      if (!s.difficulty) return {}
      const base = 100
      const timeBonus = Math.max(0, Math.floor(s.timeLeft * 2))
      const streakBonus = s.streak * 10
      const round = Math.round((base + timeBonus) * multiplier) + streakBonus
      return {
        score: s.score + round,
        streak: s.streak + 1,
        justSolved: true,
        lastGrade: grade,
      }
    }),

  endRound: (outcome) =>
    set((s) => {
      if (!s.difficulty) return {}
      const summary: Summary = {
        mode: 'xor',
        difficulty: s.difficulty,
        outcome,
        grade: s.lastGrade,
        timeTotal: s.timeTotal,
        timeLeft: s.timeLeft,
        score: s.score,
        streakAfter: s.streak,
        timestamp: Date.now(),
      }
      persistRun(summary)
      const newStreak = outcome === 'expired' ? 0 : s.streak
      return {
        difficulty: null,
        isPaused: false,
        justSolved: false,
        lastSummary: summary,
        lastGrade: null,
        streak: newStreak,
      }
    }),

  useHint: () =>
    set((s) => ({
      hintsLeft: Math.max(0, s.hintsLeft - 1),
      score: Math.max(0, s.score - 10),
    })),

  reset: () =>
    set(() => ({
      difficulty: null,
      timeLeft: 0,
      timeTotal: 0,
      score: 0,
      hintsLeft: 3,
      isPaused: false,
      justSolved: false,
      lastSummary: null,
      lastGrade: null,
      streak: 0,
      runSeed: null,
    })),

  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),
}))
