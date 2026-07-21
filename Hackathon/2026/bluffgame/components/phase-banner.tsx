"use client";

import { AnimatePresence, motion } from "framer-motion";

export type GamePhase = "dealing" | "playing" | "bluff-phase";

const PHASE_LABEL: Record<GamePhase, string> = {
  dealing: "Dealing",
  playing: "Playing",
  "bluff-phase": "Bluff Phase",
};

const PHASE_COLOR: Record<GamePhase, string> = {
  dealing: "text-accent-blue border-accent-blue/40 bg-accent-blue/10",
  playing: "text-text-primary border-card-border bg-game-elevated/80",
  "bluff-phase": "text-accent-red border-accent-red/40 bg-accent-red/10",
};

interface PhaseBannerProps {
  phase: GamePhase;
}

export default function PhaseBanner({ phase }: PhaseBannerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full border ${PHASE_COLOR[phase]}`}
      >
        {PHASE_LABEL[phase]}
      </motion.div>
    </AnimatePresence>
  );
}
