import { create } from "zustand";
import type { TriviaQuestion } from "@/lib/triviaSchema";
import { prepareTrivia } from "@/lib/triviaLoader";

export type Difficulty = "easy" | "medium" | "hard";
export type Status = "idle" | "playing" | "paused" | "ended";
export type AnswerState = "idle" | "correct" | "incorrect";

type SessionSummary = {
  score: number;
  correct: number;
  total: number;
  bestStreak: number;
  avgTimeSec: number;
  dateISO: string;
};

type TriviaState = {
  difficulty: Difficulty;
  perQuestionTime: number;

  status: Status;
  questions: TriviaQuestion[];
  index: number;
  total: number;

  score: number;
  streak: number;
  bestStreak: number;
  correctCount: number;

  timeLeft: number;

  selectedIndex: number | null;
  answerState: AnswerState;
  lastCorrect: boolean | null;

  _elapsedTotal: number;
  _questionTimes: number[];

  record: number;
  history: SessionSummary[];

  setDifficulty: (d: Difficulty) => void;
  startGame: () => void;
  continueToNextLevel: () => boolean;
  selectChoice: (i: number) => void;
  confirm: () => void;
  next: () => void;
  tick: (dt: number) => void;
  pause: () => void;
  resume: () => void;
  endGame: () => void;
  resetToIntro: () => void;

  getSummary: () => SessionSummary;
};

const HISTORY_KEY = "zyberquest_trivia_history";
const RECORD_KEY  = "zyberquest_trivia_record";

function loadHistory(): SessionSummary[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}
function saveHistory(h: SessionSummary[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 10))); } catch {}
}
function loadRecord(): number {
  if (typeof window === "undefined") return 0;
  try { return Number(localStorage.getItem(RECORD_KEY) || "0") || 0; } catch { return 0; }
}
function saveRecord(v: number) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(RECORD_KEY, String(v)); } catch {}
}

const TIME_BY_DIFF = { easy: 35, medium: 30, hard: 25 } as const;
const NEXT_BY_DIFF = { easy: "medium", medium: "hard", hard: null } as const;

function safeTime(d: Difficulty) {
  const t = TIME_BY_DIFF[d];
  return Number.isFinite(t) && t > 0 ? t : 30;
}
const safeNum = (n: number) => (Number.isFinite(n) ? n : 0);

export const useTriviaStore = create<TriviaState>((set, get) => ({
  difficulty: "easy",
  perQuestionTime: TIME_BY_DIFF.easy,

  status: "idle",
  questions: [],
  index: 0,
  total: 10,

  score: 0,
  streak: 0,
  bestStreak: 0,
  correctCount: 0,

  timeLeft: TIME_BY_DIFF.easy,

  selectedIndex: null,
  answerState: "idle",
  lastCorrect: null,

  _elapsedTotal: 0,
  _questionTimes: [],

  record: loadRecord(),
  history: loadHistory(),

  setDifficulty: (d) => {
    const t = safeTime(d);
    set({ difficulty: d, perQuestionTime: t, timeLeft: t });
  },

  startGame: () => {
    const d = get().difficulty;
    const t = safeTime(d);
    const qs = prepareTrivia({ count: 10, difficulty: d as any });
    set({
      status: "playing",
      difficulty: d,
      perQuestionTime: t,
      timeLeft: t,

      questions: qs,
      index: 0,
      total: qs.length,

      score: 0,
      streak: 0,
      bestStreak: 0,
      correctCount: 0,

      selectedIndex: null,
      answerState: "idle",
      lastCorrect: null,

      _elapsedTotal: 0,
      _questionTimes: [],
    });
  },

  continueToNextLevel: () => {
    const curr = get().difficulty;
    const next = NEXT_BY_DIFF[curr];
    if (!next) return false;
    const t = safeTime(next);
    const qs = prepareTrivia({ count: 10, difficulty: next as any });
    set({
      status: "playing",
      difficulty: next,
      perQuestionTime: t,
      timeLeft: t,

      questions: qs,
      index: 0,
      total: qs.length,

      score: 0,
      streak: 0,
      bestStreak: 0,
      correctCount: 0,

      selectedIndex: null,
      answerState: "idle",
      lastCorrect: null,

      _elapsedTotal: 0,
      _questionTimes: [],
    });
    return true;
  },

  selectChoice: (i) => {
    const { status, answerState } = get();
    if (status !== "playing" || answerState !== "idle") return;
    set({ selectedIndex: i });
  },

  // 🔐 Robust: nunca NaN en score
  confirm: () => {
    const {
      status, answerState, selectedIndex, questions, index,
      streak, score, bestStreak, perQuestionTime, timeLeft, correctCount, _elapsedTotal, _questionTimes, difficulty
    } = get();
    if (status !== "playing" || answerState !== "idle" || selectedIndex == null) return;

    const correctIndex = questions[index].answerIndex;
    const isCorrect = selectedIndex === correctIndex;

    const MULT: Record<Difficulty, number> = { easy: 1, medium: 1.1, hard: 1.25 };
    const mult = MULT[difficulty] ?? 1;

    const prevScore = safeNum(score);
    const base  = isCorrect ? 100 : 0;
    const bonus = isCorrect ? (streak + 1) * 10 : 0;

    const elapsed = Math.max(0, safeNum(perQuestionTime) - safeNum(timeLeft));
    const newScore = Math.round(prevScore + (base + bonus) * mult);

    set({
      score: newScore,
      streak: isCorrect ? streak + 1 : 0,
      bestStreak: isCorrect ? Math.max(bestStreak, streak + 1) : bestStreak,
      answerState: isCorrect ? "correct" : "incorrect",
      lastCorrect: isCorrect,
      correctCount: isCorrect ? correctCount + 1 : correctCount,
      _elapsedTotal: _elapsedTotal + elapsed,
      _questionTimes: [..._questionTimes, elapsed],
    });
  },

  next: () => {
    const state = get();
    if (state.index + 1 >= state.questions.length) { get().endGame(); return; }
    const t = safeTime(state.difficulty);
    set({
      index: state.index + 1,
      timeLeft: t,
      perQuestionTime: t,
      selectedIndex: null,
      answerState: "idle",
      lastCorrect: null,
    });
  },

  tick: (dt) => {
    const { status, answerState, timeLeft, perQuestionTime, _elapsedTotal, _questionTimes } = get();
    if (status !== "playing" || answerState !== "idle") return;

    const clamped = Math.min(Math.max(dt, 0), 0.2);
    const t = Math.max(0, safeNum(timeLeft) - clamped);

    if (t === 0) {
      set({
        timeLeft: 0,
        answerState: "incorrect",
        lastCorrect: false,
        streak: 0,
        _elapsedTotal: _elapsedTotal + safeNum(perQuestionTime),
        _questionTimes: [..._questionTimes, safeNum(perQuestionTime)],
      });
      return;
    }
    set({ timeLeft: t });
  },

  pause: () => { if (get().status === "playing") set({ status: "paused" }); },
  resume: () => { if (get().status === "paused") set({ status: "playing" }); },

  endGame: () => {
    const { score, correctCount, total, bestStreak, _elapsedTotal, history, record } = get();
    const answered = Math.max(1, total);
    const summary: SessionSummary = {
      score: safeNum(score),
      correct: correctCount,
      total,
      bestStreak,
      avgTimeSec: _elapsedTotal / answered,
      dateISO: new Date().toISOString(),
    };
    const newHistory = [summary, ...history].slice(0, 10);
    saveHistory(newHistory);
    const newRecord = Math.max(record || 0, safeNum(score));
    saveRecord(newRecord);
    set({ status: "ended", history: newHistory, record: newRecord });
  },

  resetToIntro: () => {
    const d = get().difficulty;
    const t = safeTime(d);
    set({
      status: "idle",
      questions: [],
      index: 0,
      total: 10,
      score: 0,
      streak: 0,
      bestStreak: 0,
      correctCount: 0,
      timeLeft: t,
      perQuestionTime: t,
      selectedIndex: null,
      answerState: "idle",
      lastCorrect: null,
      _elapsedTotal: 0,
      _questionTimes: [],
    });
  },

  getSummary: () => {
    const { score, correctCount, total, bestStreak, _elapsedTotal } = get();
    const answered = Math.max(1, total);
    return {
      score: safeNum(score),
      correct: correctCount,
      total,
      bestStreak,
      avgTimeSec: _elapsedTotal / answered,
      dateISO: new Date().toISOString(),
    };
  },
}));
