"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ChallengeFlashProps {
  result: "caught" | "honest" | null;
  detail?: string;
  cards?: string[];
}

const isRedSuit = (card: string) => card.includes("♥") || card.includes("♦");

/** Dramatic full-screen flash + reveal text when a Bluff! call resolves. */
export default function ChallengeFlash({ result, detail, cards }: ChallengeFlashProps) {
  const isCaught = result === "caught";

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed inset-0 z-[250] flex flex-col items-center justify-center"
          style={{
            backgroundColor: isCaught ? "rgba(255,45,85,0.22)" : "rgba(0,230,118,0.18)",
          }}
        >
          <span
            className="absolute inset-0"
            style={{
              backgroundColor: isCaught ? "var(--accent-red)" : "var(--accent-green)",
              animation: "bluff-flash 0.9s ease-out forwards",
            }}
          />
          <motion.h1
            initial={{ scale: 0.8, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative font-mono text-4xl sm:text-6xl font-bold tracking-tight ${
              isCaught ? "text-accent-red" : "text-accent-green"
            }`}
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.8)" }}
          >
            {isCaught ? "BLUFF CAUGHT" : "HONEST PLAY"}
          </motion.h1>
          {detail && (
            <p className="relative mt-3 font-sans text-sm sm:text-base text-text-primary/90 bg-black/40 px-4 py-1.5 rounded-full">
              {detail}
            </p>
          )}

          {cards && cards.length > 0 && (
            <div className="relative flex gap-2 mt-5">
              {cards.map((card, i) => {
                const suit = card.slice(-1);
                const rank = card.slice(0, -1);
                return (
                  <motion.div
                    key={`${card}-${i}`}
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="flex flex-col items-center justify-center rounded-card border w-12 h-16 sm:w-14 sm:h-20"
                    style={{
                      background: "var(--card-face)",
                      borderColor: "var(--card-border)",
                      color: isRedSuit(card) ? "var(--suit-red)" : "#0a0a0f",
                    }}
                  >
                    <span className="font-mono text-sm sm:text-base font-bold leading-none">{rank}</span>
                    <span className="text-base sm:text-lg leading-none">{suit}</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
