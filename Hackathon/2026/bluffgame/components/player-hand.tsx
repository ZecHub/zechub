"use client";

import { motion } from "framer-motion";

interface PlayerHandProps {
  cards: string[];
  selectable?: boolean;
  selectedCards?: string[];
  onSelectCard?: (cardId: string) => void;
}

const isRedSuit = (card: string) => card.includes("♥") || card.includes("♦");

export default function PlayerHand({
  cards,
  selectable = false,
  selectedCards = [],
  onSelectCard,
}: PlayerHandProps) {
  const total = cards.length;
  const middle = (total - 1) / 2;
  // Fan spread: rotate + translateX per card, overlapping ~30% (CLAUDE.md card spec)
  const stepRotate = total > 1 ? Math.min(6, 60 / total) : 0;
  const stepX = total > 1 ? Math.min(34, 340 / total) : 0;

  return (
    <div className="relative w-full h-[120px] sm:h-[140px] flex justify-center">
      {cards.map((card, index) => {
        const cardId = `${card}-${index}`;
        const isSelected = selectedCards.includes(cardId);
        const suit = card.slice(-1);
        const rank = card.slice(0, -1);
        const offset = index - middle;
        const rotate = offset * stepRotate;
        const x = offset * stepX;

        return (
          <motion.div
            key={cardId}
            onClick={() => selectable && onSelectCard?.(cardId)}
            initial={{ opacity: 0, y: -40, rotate: -5 }}
            animate={{
              opacity: 1,
              y: isSelected ? -12 : 0,
              x,
              rotate: isSelected ? 0 : rotate,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: index * 0.05 }}
            whileHover={selectable ? { y: -6, transition: { duration: 0.2, ease: "easeOut" } } : undefined}
            className="absolute bottom-0 origin-bottom"
            style={{ zIndex: index }}
          >
            <div
              className={`card--face relative flex flex-col items-center justify-center
                w-[64px] h-[92px] sm:w-[80px] sm:h-[110px] rounded-card border
                ${selectable ? "cursor-pointer" : ""}`}
              style={{
                background: "var(--card-face)",
                borderColor: isSelected ? "var(--accent-blue)" : "var(--card-border)",
                borderWidth: isSelected ? 2 : 1,
                boxShadow: isSelected ? "0 0 0 2px var(--accent-blue), 0 8px 20px rgba(0,0,0,0.5)" : "0 4px 10px rgba(0,0,0,0.4)",
                color: isRedSuit(card) ? "var(--suit-red)" : "#0a0a0f",
              }}
            >
              <div className="absolute top-1.5 left-2 flex flex-col items-start leading-none">
                <span className="font-mono text-sm sm:text-base font-bold">{rank}</span>
                <span className="text-xs sm:text-sm">{suit}</span>
              </div>
              <div className="absolute bottom-1.5 right-2 flex flex-col items-end leading-none rotate-180">
                <span className="font-mono text-sm sm:text-base font-bold">{rank}</span>
                <span className="text-xs sm:text-sm">{suit}</span>
              </div>
              <span className="text-2xl sm:text-3xl">{suit}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
