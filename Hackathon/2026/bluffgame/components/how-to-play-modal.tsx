"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface HowToPlayModalProps {
  open: boolean;
  onClose: () => void;
}

const RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

const STEPS = [
  {
    title: "1. Play face-down",
    body: "On your turn, select 1-4 cards and declare a rank — truthfully or as a bluff. Only you know what you actually played.",
  },
  {
    title: "2. Others react",
    body: "Each opponent can PASS, or call BLUFF! if they think you're lying about the rank.",
  },
  {
    title: "3. Bluff called",
    body: "Cards flip face-up. If the claim was a lie, the liar picks up the whole pile. If it was honest, the challenger picks it up instead.",
  },
  {
    title: "4. Race to empty",
    body: "First player to play their last card and survive any challenge wins the round.",
  },
];

export default function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-card border border-card-border bg-game-surface p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-mono text-2xl font-bold text-text-primary tracking-tight">
              How to Play
            </h2>
            <p className="font-sans text-sm text-text-muted mt-1 mb-6">
              Bluff — eliminate your hand by playing cards face-down. Lie if you have to.
            </p>

            {/* Rank hierarchy strip */}
            <div className="mb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">
                Ranks (highest to lowest)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {RANKS.map((r) => (
                  <span
                    key={r}
                    className="font-mono text-xs font-bold rounded-md border border-card-border bg-game-elevated text-text-primary px-2 py-1"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              {STEPS.map((step) => (
                <div key={step.title}>
                  <h3 className="font-mono text-sm font-bold text-accent-blue">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-text-primary/90 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Action bar preview */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2">
                Your actions
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="font-mono text-[11px] uppercase tracking-wider rounded-md bg-accent-blue/15 text-accent-blue border border-accent-blue/30 px-3 py-1.5">
                  Play Cards
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider rounded-md bg-accent-red/15 text-accent-red border border-accent-red/30 px-3 py-1.5 font-bold">
                  Bluff!
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider rounded-md bg-transparent text-accent-yellow border border-accent-yellow/40 px-3 py-1.5">
                  Pass
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-7 w-full py-3 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-accent-green/15 text-accent-green border border-accent-green/40 hover:bg-accent-green/25 active:scale-[0.98] transition"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
