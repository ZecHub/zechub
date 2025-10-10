"use client";

import { useTriviaStore } from "@/store";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import ExplanationTooltip from "./ExplanationTooltip";

type QuestionCardProps = {
  question: string;
  choices: string[];
  selectedIndex: number | null;
  state: "idle" | "correct" | "incorrect";
  correctIndex: number;
  explain?: string;
  showWhy?: boolean;
};

const COLORS = {
  green: "#00FF9C",   // correcto
  cyan: "#00E5FF",
  magenta: "#FF3DBE", // incorrecto elegido
  yellow: "#F9C400",  // selección/énfasis
  white15: "rgba(255,255,255,0.15)",
};

export default function QuestionCard({
  question,
  choices,
  selectedIndex,
  state,
  correctIndex,
  explain,
  showWhy = true,
}: QuestionCardProps) {
  const reduce = useReducedMotion();
  const { selectChoice, confirm, next, answerState } = useTriviaStore();

  // Contenedor de la tarjeta con borde verde (pedidos de UI)
  const cardBorderStyle = useMemo(
    () => ({
      borderColor: COLORS.green,
      boxShadow: "0 0 16px rgba(0,255,156,0.18)",
    }),
    []
  );

  // Estilo por opción según estado
  const getOptionStyle = (i: number) => {
    if (state === "correct") {
      const isChosen = selectedIndex === i;
      return {
        borderColor: isChosen ? COLORS.green : COLORS.white15,
        boxShadow: isChosen ? "0 0 16px rgba(0,255,156,0.28)" : undefined,
      };
    }
    if (state === "incorrect") {
      const isChosen = selectedIndex === i;
      const isAnswer = correctIndex === i;
      return {
        borderColor: isChosen ? COLORS.magenta : isAnswer ? COLORS.green : COLORS.white15,
        boxShadow: isAnswer
          ? "0 0 16px rgba(0,255,156,0.28)"
          : isChosen
          ? "0 0 16px rgba(255,61,190,0.28)"
          : undefined,
      };
    }
    // IDLE
    const isSelected = selectedIndex === i;
    return {
      borderColor: isSelected ? COLORS.yellow : COLORS.white15,
      boxShadow: isSelected ? "0 0 12px rgba(249,196,0,0.22)" : undefined,
    };
  };

  // A11y feedback textual
  const liveText =
    answerState === "correct"
      ? "Correct answer."
      : answerState === "incorrect"
      ? "Incorrect answer. The correct option is highlighted."
      : undefined;

  // Motion
  const variants = {
    hidden: reduce ? {} : { y: 8, opacity: 0 },
    show: reduce ? {} : { y: 0, opacity: 1, transition: { duration: 0.18, ease: "easeOut" } },
  };

  const showConfirm = state === "idle";
  const showNext = state !== "idle";

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="show"
      className="rounded-2xl border bg-black/60 backdrop-blur p-5 md:p-6"
      style={cardBorderStyle}
      aria-live="polite"
    >
      <h2 className="text-lg md:text-xl font-semibold mb-4">{question}</h2>

      <div className="grid gap-3">
        {choices.map((c, i) => (
          <button
            key={i}
            type="button"
            className="w-full text-left rounded-xl border p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F9C400]/60 hover:bg-white/5"
            style={getOptionStyle(i)}
            disabled={state !== "idle"} // bloquear cambios tras confirmar
            onClick={() => selectChoice(i)}
          >
            <div className="flex items-start gap-3">
              <span className="font-mono text-sm opacity-70 min-w-[1.2rem]">{i + 1}.</span>
              <span className="text-sm md:text-base">{c}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Acciones y feedback inferior */}
      <div className="mt-4 flex items-center gap-3">
        {/* Confirmar (solo antes de confirmar) */}
        {showConfirm && (
          <button
            type="button"
            onClick={() => confirm()}
            disabled={selectedIndex == null}
            className="rounded-lg px-4 py-2 border text-black disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: COLORS.yellow, borderColor: COLORS.yellow }}
            aria-disabled={selectedIndex == null}
          >
            Confirm
          </button>
        )}

        {/* Tooltip educativo (solo tras confirmar) */}
        {showNext && showWhy && explain && (
          <ExplanationTooltip text={explain} />
        )}

        {/* NEXT (clickable con mouse después de confirmar) */}
        {showNext && (
          <button
            type="button"
            onClick={() => next()}
            className="rounded-lg px-4 py-2 border hover:bg-white/10"
            style={{ borderColor: COLORS.cyan }}
            aria-label="Next question"
          >
            Next
          </button>
        )}

        {/* Texto de estado */}
        <span className="text-xs opacity-80 ml-auto" aria-live="polite">
          {state === "correct" && "Correct! 🔐"}
          {state === "incorrect" && "Incorrect. See the explanation and continue."}
          {state === "idle" && "Use 1–4 to choose and Enter to confirm."}
        </span>
      </div>

      {/* feedback a11y oculto para lectores */}
      {liveText && (
        <p className="sr-only" role="status">
          {liveText}
        </p>
      )}
    </motion.section>
  );
}
