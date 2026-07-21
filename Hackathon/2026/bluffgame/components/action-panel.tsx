"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PlayDialog from "./play-dialog"

interface LastClaim {
  player: number
  count: number
  type: string
}

interface ActionPanelProps {
  onPass: () => void
  onPlayCards: (count: number, cardType: string, selectedCards: string[]) => void
  onCheck: () => void
  canCheck: boolean
  isCurrentPlayer: boolean
  playerHand: string[]
  gameLog: string[]
  lastClaim: LastClaim | null
}

export default function ActionPanel({
  onPass,
  onPlayCards,
  onCheck,
  canCheck,
  isCurrentPlayer,
  playerHand,
  gameLog,
  lastClaim,
}: ActionPanelProps) {
  const [showPlayDialog, setShowPlayDialog] = useState(false)

  if (!isCurrentPlayer) return null

  return (
    <div className="relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="flex items-center justify-center gap-2 sm:gap-3 bg-game-surface/90 backdrop-blur-xl border border-card-border shadow-2xl px-3 py-3 rounded-card"
      >
        {/* PLAY CARDS */}
        <motion.button
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          onClick={() => setShowPlayDialog(true)}
          className="h-12 px-4 sm:px-5 rounded-md font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.1em] bg-accent-blue text-white shadow-none active:scale-[0.97] transition"
        >
          Play Cards
        </motion.button>

        {/* BLUFF! */}
        <motion.button
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          onClick={onCheck}
          disabled={!canCheck}
          className={`h-12 px-5 sm:px-6 rounded-md font-mono text-sm sm:text-base font-bold uppercase tracking-[0.1em] transition active:scale-[0.97] ${
            canCheck
              ? "bg-accent-red text-white"
              : "bg-accent-red/20 text-accent-red/50 cursor-not-allowed"
          }`}
          style={{ opacity: canCheck ? 1 : 0.3 }}
        >
          Bluff!
        </motion.button>

        {/* PASS */}
        <motion.button
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          onClick={onPass}
          className="h-12 px-4 sm:px-5 rounded-md font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.1em] bg-transparent border border-accent-yellow text-accent-yellow active:scale-[0.97] transition"
        >
          Pass
        </motion.button>
      </motion.div>

      {showPlayDialog && (
        <PlayDialog
          playerHand={playerHand}
          log={gameLog}
          lastClaim={lastClaim}
          onSubmit={(count, type, selected) => {
            onPlayCards(count, type, selected)
            setShowPlayDialog(false)
          }}
          onClose={() => setShowPlayDialog(false)}
        />
      )}
    </div>
  )
}
