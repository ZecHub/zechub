"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import PlayerHand from "./player-hand"

interface LastClaim {
  player: number
  count: number
  type: string
}

interface PlayDialogProps {
  playerHand: string[]
  log?: string[]
  onSubmit: (count: number, cardType: string, selectedCards: string[]) => void
  onClose: () => void
  lastClaim: LastClaim | null
}

const CARD_TYPES = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"]

export default function PlayDialog({ playerHand, onSubmit, onClose, lastClaim }: PlayDialogProps) {
  const [count, setCount] = useState(1)
  const [cardType, setCardType] = useState("A")
  const [selectedCards, setSelectedCards] = useState<string[]>([])

  // Server-authoritative: once a claim is on the table, you must match its rank
  const allowedCardTypes = lastClaim ? [lastClaim.type] : CARD_TYPES

  useEffect(() => {
    if (allowedCardTypes.length === 1) {
      setCardType(allowedCardTypes[0])
    } else if (!allowedCardTypes.includes(cardType)) {
      setCardType(allowedCardTypes[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastClaim])

  const toggleSelectCard = (cardId: string) => {
    setSelectedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((c) => c !== cardId)
        : prev.length < count
        ? [...prev, cardId]
        : prev
    )
  }

  const handleSubmit = () => {
    if (selectedCards.length !== count) return
    const cardsToPlay = selectedCards.map((c) => c.split("-")[0])
    onSubmit(count, cardType, cardsToPlay)
    onClose()
    setSelectedCards([])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-card border border-card-border bg-game-surface p-5 sm:p-7 flex flex-col gap-5"
      >
        <h2 className="font-mono text-xl sm:text-2xl font-bold text-text-primary text-center">
          Declare as:
        </h2>

        {/* Count selection */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2 text-center">
            How many cards?
          </p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => {
                  setCount(n)
                  setSelectedCards([])
                }}
                className={`w-10 h-10 rounded-md font-mono text-sm font-bold transition active:scale-95 ${
                  count === n
                    ? "bg-accent-blue text-white"
                    : "bg-game-elevated text-text-muted border border-card-border hover:text-text-primary"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Rank picker — horizontal scroll row of chips */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2 text-center">
            Rank
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
            {allowedCardTypes.map((type) => (
              <button
                key={type}
                onClick={() => setCardType(type)}
                className={`min-w-10 h-10 px-2 rounded-md font-mono text-sm font-bold transition active:scale-95 ${
                  cardType === type
                    ? "bg-accent-blue text-white"
                    : "bg-game-elevated text-text-muted border border-card-border hover:text-text-primary"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Player hand — pick cards to play face-down */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted mb-2 text-center">
            Select {count} card{count > 1 ? "s" : ""} ({selectedCards.length}/{count})
          </p>
          <div className="relative min-h-[130px] flex items-center justify-center">
            <PlayerHand
              cards={playerHand}
              selectable
              selectedCards={selectedCards}
              onSelectCard={toggleSelectCard}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedCards.length !== count}
            className={`px-6 py-2.5 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold transition active:scale-[0.97] ${
              selectedCards.length === count
                ? "bg-accent-green text-black"
                : "bg-accent-green/20 text-accent-green/50 cursor-not-allowed"
            }`}
          >
            Play
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
