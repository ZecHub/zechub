"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTriviaStore } from "@/store";

type SummaryModalProps = { open: boolean };

const LABEL_BY_DIFF = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const;

const NEXT_BY_DIFF = {
  beginner: "intermediate",
  intermediate: "advanced",
  advanced: null,
} as const;

type Diff = keyof typeof LABEL_BY_DIFF;

function normalize(d: unknown): Diff {
  return (d === "beginner" || d === "intermediate" || d === "advanced") ? d : "beginner";
}

// ===== Helpers (tracking local por nivel; no hace llamadas de red) =====
const LS_KEY = "tournament_progress_v1";
function readProg(): Record<string, { correct: number; total: number }> {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
}
function saveProg(obj: Record<string, { correct: number; total: number }>) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(obj)); } catch {}
}
function trackLevelResult(diff: Diff, correct: number, total: number) {
  const p = readProg();
  p[diff] = { correct, total };
  saveProg(p);
}
function finalizeTournamentLevels(): { levelsPassed: number; scoreHint: number } {
  const p = readProg();
  let passed = 0;
  let score = 0;
  for (const d of ["beginner","intermediate","advanced"] as Diff[]) {
    const r = p[d];
    if (r && r.total > 0) {
      if (r.correct >= r.total) passed += 1;
      score += r.correct;
    }
  }
  return { levelsPassed: passed, scoreHint: score };
}

export default function SummaryModal({ open }: SummaryModalProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const isTournament = sp.get("mode") === "tournament";

  const {
    startGame,
    getSummary,
    record,
    resetToIntro,
    difficulty,
    setDifficulty,
  } = useTriviaStore();

  if (!open) return null;

  const stats = getSummary();
  const diff = normalize(difficulty);
  const label = LABEL_BY_DIFF[diff];
  const nextDiff = NEXT_BY_DIFF[diff];
  const isEndOfRun = nextDiff === null; // fin de Advanced

  // Track por-nivel siempre (no condiciona hooks)
  try { trackLevelResult(diff, stats.correct, stats.total); } catch {}

  // Cálculo de premio solo si torneo y fin de run (no muta UI aún)
  let finalPrize = 0; // ZEC
  if (isTournament && isEndOfRun) {
    const agg = finalizeTournamentLevels();
    if (agg.levelsPassed >= 3) finalPrize = 0.0007;
    else if (agg.levelsPassed >= 2) finalPrize = 0.0004;
    else if (agg.levelsPassed >= 1) finalPrize = 0.0001;
  }

  // Acciones DEMO
  const handleContinueNext = () => {
    if (!nextDiff) return;
    setDifficulty(nextDiff as any);
    queueMicrotask(() => startGame());
  };

  const handlePlayAgain = () => {
    startGame();
  };

  const handleBackToMenu = () => {
    resetToIntro();
    router.push("/trivias"); // menú DEMO
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div
        className="w-full max-w-md rounded-2xl border bg-black p-6 text-white"
        style={{ borderColor: "#F9C400", boxShadow: "0 0 24px rgba(249,196,0,0.25)" }}
      >
        <h3 className="text-lg font-semibold mb-2">Summary</h3>

        <div className="mb-1 text-xs opacity-80">
          Difficulty: <span className="font-mono">{label}</span>
        </div>
        <div className="mb-3 text-xs opacity-80">
          Record: <span className="font-mono">{record}</span>
        </div>

        <ul className="text-sm space-y-1 mb-4">
          <li>Score: <span className="font-mono">{stats.score}</span></li>
          <li>Correct: <span className="font-mono">{stats.correct}</span> / {stats.total}</li>
          <li>Best streak: <span className="font-mono">{stats.bestStreak}</span></li>
          <li>Avg time: <span className="font-mono">{stats.avgTimeSec.toFixed(1)}s</span></li>
        </ul>

        {/* Rama DEMO */}
        {!isTournament && (
          <div className="flex flex-wrap gap-3">
            {nextDiff ? (
              <button
                className="rounded-lg px-4 py-2 border text-black"
                style={{ background: "#F9C400", borderColor: "#F9C400" }}
                onClick={handleContinueNext}
              >
                Continue to {LABEL_BY_DIFF[nextDiff as Diff]}
              </button>
            ) : (
              <button
                className="rounded-lg px-4 py-2 border hover:bg-white/10"
                style={{ borderColor: "#F9C400" }}
                onClick={handlePlayAgain}
              >
                Play again
              </button>
            )}

            <button
              className="rounded-lg px-4 py-2 border hover:bg-white/10"
              style={{ borderColor: "#F9C400" }}
              onClick={handleBackToMenu}
            >
              Back to menu
            </button>
          </div>
        )}

        {/* Rama TORNEO */}
        {isTournament && (
          <div className="mt-3 space-y-3">
            <div className="text-sm">
              {isEndOfRun ? (
                <>
                  <div className="mb-1">
                    Final result:{" "}
                    <span className="font-mono">
                      {finalPrize > 0 ? `${finalPrize} ZEC` : "No reward"}
                    </span>
                  </div>
                  {finalPrize > 0 ? (
                    <div className="text-xs opacity-80">
                      You are eligible for a reward. Payout UI is not active yet.
                    </div>
                  ) : (
                    <div className="text-xs opacity-80">
                      Not eligible this run. Insert coin to try again.
                    </div>
                  )}
                </>
              ) : (
                <div className="text-xs opacity-80">
                  Tournament mode: continue to the next level.
                </div>
              )}
            </div>

            {/* Campo wallet + mensaje fijo (sin alerts, sin envío) */}
            {isEndOfRun && finalPrize > 0 && (
              <div className="rounded-lg border border-white/15 p-3">
                <label className="text-xs opacity-80">Your Zcash address</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none"
                  placeholder="u... / zs... / t1..."
                />
                <p className="mt-2 text-xs text-amber-400">
                  In progress — coming soon
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-lg px-4 py-2 border opacity-50 cursor-not-allowed"
                  style={{ borderColor: "#F9C400" }}
                  disabled
                >
                  Claim reward (disabled)
                </button>
              </div>
            )}

            {/* Navegación torneo */}
            <div className="flex flex-wrap gap-3">
              {nextDiff ? (
                <button
                  className="rounded-lg px-4 py-2 border text-black"
                  style={{ background: "#F9C400", borderColor: "#F9C400" }}
                  onClick={() => {
                    setDifficulty(nextDiff as any);
                    queueMicrotask(() => startGame());
                  }}
                >
                  Continue to {LABEL_BY_DIFF[nextDiff as Diff]}
                </button>
              ) : (
              <button
                className="rounded-lg px-4 py-2 border hover:bg-white/10"
                style={{ borderColor: "#F9C400" }}
                onClick={() => {
                  resetToIntro();
                  router.push("/"); // landing: insertar coin otra vez
                }}
              >
                Insert coin again
              </button>

              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
