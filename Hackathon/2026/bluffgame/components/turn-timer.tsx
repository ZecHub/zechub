"use client";

import { useEffect, useState } from "react";

interface TurnTimerProps {
  turnDeadline: number;
  isMyTurn: boolean;
  currentPlayerName: string;
}

export default function TurnTimer({
  turnDeadline,
  isMyTurn,
  currentPlayerName,
}: TurnTimerProps) {
  const [remaining, setRemaining] = useState(30);

  useEffect(() => {
    if (!turnDeadline) return;

    const tick = () => {
      const secs = Math.max(0, Math.ceil((turnDeadline - Date.now()) / 1000));
      setRemaining(secs);
    };

    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [turnDeadline]);

  const pct = Math.max(0, Math.min(1, remaining / 30));
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  const colorClass =
    remaining > 15
      ? "text-green-400"
      : remaining > 7
      ? "text-yellow-400"
      : "text-red-400";

  const strokeColor =
    remaining > 15 ? "#4ade80" : remaining > 7 ? "#facc15" : "#f87171";

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Circular countdown ring */}
      <div className="relative w-14 h-14">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
          {/* Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* Progress */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.25s linear, stroke 0.5s ease" }}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${colorClass} ${
            remaining <= 7 ? "animate-pulse" : ""
          }`}
        >
          {remaining}
        </span>
      </div>

      {/* Label */}
      <span
        className={`text-[11px] font-medium text-center px-2 max-w-[100px] truncate ${
          isMyTurn ? "text-yellow-300" : "text-gray-400"
        }`}
      >
        {isMyTurn ? "Your turn!" : `${currentPlayerName}'s turn`}
      </span>
    </div>
  );
}
