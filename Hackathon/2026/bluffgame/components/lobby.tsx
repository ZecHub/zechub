"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Socket } from "socket.io-client";
import type { Game } from "@/types/game";
import { Copy, Check, Rocket, HelpCircle, CircleCheck, Clock } from "lucide-react";
import HowToPlayModal from "./how-to-play-modal";

interface LobbyProps {
  game: Game;
  isHost: boolean;
  socket: Socket;
  gameId: string;
  playerCode?: string | null;
}

export default function Lobby({ game, isHost, socket, gameId, playerCode }: LobbyProps) {
  const [copied, setCopied] = useState(false);
  const [deposit, setDeposit] = useState<{ address: string; stakeZec: number } | null>(null);
  const [payoutInput, setPayoutInput] = useState("");
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  const me = game.players.find((p) => p.playerCode === playerCode);
  const staked = game.stakeUsd > 0;

  // Strip the host's playerCode so the link is a clean join URL
  const inviteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/game/${gameId}`
      : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const startGame = () => {
    socket.emit("start-game", { gameId });
  };

  useEffect(() => {
    const onDepositAddress = (data: { address: string; stakeZec: number; stakeUsd: number }) => {
      setDeposit({ address: data.address, stakeZec: data.stakeZec });
    };
    socket.on("deposit-address", onDepositAddress);
    return () => {
      socket.off("deposit-address", onDepositAddress);
    };
  }, [socket]);

  // Poll deposit confirmations every 10s while the pool isn't fully funded yet
  useEffect(() => {
    if (!staked || game.poolReady) return;
    socket.emit("check-deposits", { gameId });
    const interval = setInterval(() => {
      socket.emit("check-deposits", { gameId });
    }, 10_000);
    return () => clearInterval(interval);
  }, [staked, game.poolReady, socket, gameId]);

  const submitPayoutAddress = () => {
    if (!payoutInput.trim()) return;
    socket.emit("set-payout-address", { gameId, address: payoutInput.trim() });
  };

  const allPayoutAddressesSet = game.players.every((p) => !!p.zecPayoutAddress);
  const canStart =
    isHost &&
    game.players.length >= 2 &&
    (!staked || (game.poolReady && allPayoutAddressesSet));

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-game-bg px-4 py-10">
      <HowToPlayModal open={howToPlayOpen} onClose={() => setHowToPlayOpen(false)} />

      <div className="relative z-10 w-full max-w-md space-y-6 bg-game-surface border border-card-border shadow-2xl rounded-card p-8">
        {/* Header */}
        <div className="text-center space-y-1 relative">
          <h1 className="font-mono text-3xl font-bold text-text-primary tracking-tight">
            Bluff Arena
          </h1>
          <p className="font-sans text-text-muted text-sm">Waiting for players…</p>
          <button
            onClick={() => setHowToPlayOpen(true)}
            className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-game-elevated border border-card-border text-text-muted hover:text-text-primary transition active:scale-95"
            title="How to play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Game code */}
        <div className="bg-black/30 border border-card-border rounded-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
              Game Code
            </span>
            <span className="font-mono text-accent-yellow text-lg tracking-widest font-bold">
              {gameId}
            </span>
          </div>
          <button
            onClick={copyLink}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-game-elevated hover:bg-white/10 text-text-primary text-sm font-mono uppercase tracking-wide transition border border-card-border active:scale-[0.98]"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Link Copied" : "Copy Invite Link"}
          </button>
        </div>

        {/* Players list */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="font-sans text-sm text-text-primary font-medium">Players</span>
            <span className="font-mono text-xs text-text-muted">
              {game.players.length} / {game.maxPlayers}
            </span>
          </div>

          {game.players.map((player, i) => (
            <div
              key={player.playerCode}
              className="flex items-center gap-3 bg-black/30 border border-card-border rounded-card px-4 py-3"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-blue font-mono font-bold text-sm flex-shrink-0">
                {player.name.charAt(0).toUpperCase()}
              </div>

              <span className="font-sans text-text-primary font-medium flex-1 truncate uppercase tracking-wide text-sm">
                {player.name}
              </span>

              {/* Host badge */}
              {player.playerCode === game.hostPlayerCode && (
                <span className="font-mono text-[10px] bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/30 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Host
                </span>
              )}

              {/* Deposit status */}
              {staked && (
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 uppercase tracking-wide ${
                    player.depositConfirmed
                      ? "bg-accent-green/15 text-accent-green border-accent-green/30"
                      : "bg-white/5 text-text-muted border-card-border"
                  }`}
                >
                  {player.depositConfirmed ? (
                    <CircleCheck className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {player.depositConfirmed ? "Deposited" : "Pending"}
                </span>
              )}

              {/* Connected indicator */}
              <div
                className={`w-2 h-2 rounded-full ${
                  player.isConnected ? "bg-accent-green" : "bg-text-dim"
                }`}
              />

              {/* Slot number */}
              <span className="font-mono text-text-dim text-xs w-4 text-right">
                {i + 1}
              </span>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: game.maxPlayers - game.players.length }).map(
            (_, i) => (
              <div
                key={`empty-${i}`}
                className="flex items-center gap-3 bg-black/10 border border-dashed border-card-border rounded-card px-4 py-3 opacity-40"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 border border-dashed border-card-border flex items-center justify-center">
                  <span className="text-text-muted text-sm">?</span>
                </div>
                <span className="font-sans text-text-muted text-sm italic">
                  Waiting for player…
                </span>
              </div>
            )
          )}
        </div>

        {/* Staking: deposit + payout address */}
        {staked && (
          <div className="bg-black/30 border border-accent-yellow/20 rounded-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-accent-yellow uppercase tracking-wider font-medium">
                ZEC Stake
              </span>
              <span className="font-mono text-xs text-text-muted">
                ${game.stakeUsd} · {game.stakeZec ?? "…"} ZEC per player
              </span>
            </div>

            {deposit ? (
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <QRCodeSVG value={deposit.address} size={140} />
                </div>
                <p className="font-sans text-xs text-text-muted text-center">
                  Send exactly <span className="text-accent-yellow font-mono">{deposit.stakeZec} ZEC</span> to:
                </p>
                <code className="font-mono text-xs text-text-primary bg-black/40 border border-card-border rounded-lg px-3 py-2 break-all w-full text-center">
                  {deposit.address}
                </code>
              </div>
            ) : (
              <p className="font-sans text-xs text-text-muted text-center py-2">
                Generating your deposit address…
              </p>
            )}

            {!me?.zecPayoutAddress ? (
              <div className="space-y-2">
                <label className="font-sans text-xs text-text-muted">
                  Your payout address (where you get paid if you win)
                </label>
                <div className="flex gap-2">
                  <input
                    value={payoutInput}
                    onChange={(e) => setPayoutInput(e.target.value)}
                    placeholder="t1... or u1..."
                    className="flex-1 p-2 rounded-lg bg-black/40 border border-card-border text-text-primary text-sm font-mono placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-yellow transition"
                  />
                  <button
                    onClick={submitPayoutAddress}
                    className="px-4 py-2 rounded-lg bg-accent-yellow text-black text-sm font-mono font-semibold uppercase tracking-wide hover:brightness-110 active:scale-95 transition"
                  >
                    Set
                  </button>
                </div>
              </div>
            ) : (
              <p className="font-sans text-xs text-accent-green flex items-center gap-1.5">
                <CircleCheck className="w-3.5 h-3.5" />
                Payout address set — winnings go to{" "}
                <span className="font-mono">{me.zecPayoutAddress.slice(0, 10)}…</span>
              </p>
            )}

            <p className="font-sans text-xs text-text-muted text-center">
              {game.poolReady
                ? "Pool fully funded — ready to start"
                : "Waiting for all players to deposit and set a payout address…"}
            </p>
          </div>
        )}

        {/* Action area */}
        {isHost ? (
          <div className="space-y-2">
            <button
              onClick={startGame}
              disabled={!canStart}
              className={`w-full py-3 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold transition flex items-center justify-center gap-2 ${
                canStart
                  ? "bg-accent-green text-black hover:brightness-110 active:scale-[0.97]"
                  : "bg-white/5 text-text-muted cursor-not-allowed border border-card-border"
              }`}
            >
              {canStart && <Rocket className="w-4 h-4" />}
              {canStart
                ? "Start Game"
                : game.players.length < 2
                ? `Need ${2 - game.players.length} more player(s)`
                : "Waiting on stake deposits…"}
            </button>
            <p className="text-center font-sans text-xs text-text-muted">
              Share the invite link so friends can join
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3">
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
              Waiting for host to start…
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
