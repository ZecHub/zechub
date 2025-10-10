"use client";

type ScoreHUDProps = {
  score: number;
  streak: number;
  questionNumber: number;
  total: number;
  timeLeft: number; // en segundos
  maxTime: number;  // en segundos (constante por pregunta)
};

export default function ScoreHUD({
  score, streak, questionNumber, total, timeLeft, maxTime,
}: ScoreHUDProps) {
  const tMax = Math.max(1, Number.isFinite(maxTime) ? maxTime : 30);
  const tLeft = Math.min(tMax, Math.max(0, Number.isFinite(timeLeft) ? timeLeft : 0));
  const pct = 100 * (tLeft / tMax);

  return (
    <div className="grid grid-cols-3 gap-3 items-center">
      <div className="text-sm">
        <div className="opacity-70">Score</div>
        <div className="font-mono text-lg">{score}</div>
      </div>

      <div className="justify-self-center text-center">
        <div
          className="relative w-16 h-16 rounded-full grid place-items-center"
          style={{
            background: `conic-gradient(#F9C400 ${pct}%, rgba(255,255,255,0.1) 0)`,
          }}
          aria-label="Timer"
        >
          <div className="absolute inset-1 rounded-full bg-black grid place-items-center text-sm font-mono">
            {Math.ceil(tLeft)}
          </div>
        </div>
        <div className="text-xs opacity-70 mt-1">
          {questionNumber} / {total}
        </div>
      </div>

      <div className="text-right text-sm">
        <div className="opacity-70">Streak</div>
        <div className="font-mono text-lg">{streak}×</div>
      </div>
    </div>
  );
}
