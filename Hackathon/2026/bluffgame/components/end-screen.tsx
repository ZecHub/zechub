"use client";

import type { Socket } from "socket.io-client";
import type { Game } from "@/types/game";
import { Trophy, Layers, ExternalLink, Loader2 } from "lucide-react";
import Confetti from "./confetti";

interface EndScreenProps {
  game: Game;
  playerIndex: number;
  isHost: boolean;
  socket: Socket;
  gameId: string;
}

export default function EndScreen({
  game,
  playerIndex,
  isHost,
  socket,
  gameId,
}: EndScreenProps) {
  const winner = game.winner !== undefined ? game.players[game.winner] : null;
  const iWon = game.winner === playerIndex;

  const handleRematch = () => {
    socket.emit("rematch", { gameId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-game-bg">
      {iWon && <Confetti />}

      <div className="relative z-10 w-full max-w-sm mx-4 bg-game-surface border border-card-border shadow-2xl rounded-card p-8 space-y-6 text-center">
        {/* Trophy / result */}
        <div className="space-y-2">
          <div className="flex justify-center">
            {iWon ? (
              <Trophy className="w-14 h-14 text-accent-yellow" />
            ) : (
              <Layers className="w-14 h-14 text-text-muted" />
            )}
          </div>
          <h2 className="font-mono text-3xl font-bold text-text-primary">
            {iWon ? "You Won!" : `${winner?.name ?? "?"} Won!`}
          </h2>
          <p className="font-sans text-text-muted text-sm">
            {iWon
              ? "Congratulations — you ran out of cards first!"
              : "Better luck next round!"}
          </p>
        </div>

        {/* Payout */}
        {game.stakeUsd > 0 && (
          <div className="bg-black/30 border border-accent-yellow/20 rounded-card p-4 space-y-1 text-center">
            {game.payoutTxid ? (
              <>
                <p className="font-mono text-[10px] text-accent-yellow uppercase tracking-wider">
                  Pool paid out on-chain
                </p>
                <a
                  href={`${process.env.NEXT_PUBLIC_ZCASH_EXPLORER_BASE_URL ?? "https://testnet.zcashexplorer.app/transactions"}/${game.payoutTxid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-accent-blue hover:brightness-125 underline break-all"
                >
                  {game.payoutTxid}
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </>
            ) : (
              <p className="font-mono text-[11px] text-text-muted flex items-center justify-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" />
                Settling payout on-chain…
              </p>
            )}
          </div>
        )}

        {/* Final card counts */}
        <div className="bg-black/30 border border-card-border rounded-card p-4 space-y-2 text-left">
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2">
            Final standings
          </p>
          {[...game.players]
            .sort((a, b) => a.hand.length - b.hand.length)
            .map((player, rank) => (
              <div
                key={player.playerCode}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-text-dim w-4">{rank + 1}.</span>
                  <span
                    className={`font-sans text-sm font-medium ${
                      player.hand.length === 0
                        ? "text-accent-yellow"
                        : "text-text-primary"
                    }`}
                  >
                    {player.name}
                  </span>
                  {player.hand.length === 0 && (
                    <Trophy className="w-3.5 h-3.5 text-accent-yellow" />
                  )}
                </div>
                <span className="font-mono text-xs text-text-muted">
                  {player.hand.length} cards left
                </span>
              </div>
            ))}
        </div>

        {/* Actions */}
        {isHost ? (
          <div className="space-y-2">
            <button
              onClick={handleRematch}
              className="w-full py-3 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-accent-green text-black hover:brightness-110 active:scale-[0.97] transition"
            >
              Play Again
            </button>
            <p className="font-sans text-xs text-text-muted">
              Same players, new game
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-1">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-accent-blue rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="font-sans text-text-muted text-sm">
              Waiting for host to restart…
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
