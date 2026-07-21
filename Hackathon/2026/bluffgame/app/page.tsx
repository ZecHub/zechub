"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSocket } from "./socket";
import { Loader2, Target, Rocket, HelpCircle } from "lucide-react";
import HowToPlayModal from "@/components/how-to-play-modal";

export default function Home() {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [stakeUsd, setStakeUsd] = useState(0);
  const [loading, setLoading] = useState<null | "create" | "join">(null);
  const [error, setError] = useState<string | null>(null);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  const router = useRouter();
  const socket = getSocket();

  const createGame = () => {
    if (!name.trim()) return setError("Enter your name");
    setError(null);
    setLoading("create");

    if (!socket.connected) socket.connect();

    socket.emit("create-game", { name: name.trim(), maxPlayers, stakeUsd });

    socket.once("game-created", ({ gameId: gid, playerCode }) => {
      setLoading(null);
      router.push(`/game/${gid}?playerCode=${playerCode}`);
    });

    socket.once("error", (msg: string) => {
      setLoading(null);
      setError(msg);
    });
  };

  const joinGame = () => {
    if (!name.trim()) return setError("Enter your name");
    if (!gameId.trim()) return setError("Enter a game ID");
    setError(null);
    setLoading("join");

    if (!socket.connected) socket.connect();

    socket.emit("join-game", { gameId: gameId.trim().toLowerCase(), name: name.trim() });

    socket.once("joined-game", ({ gameId: gid, playerCode }) => {
      setLoading(null);
      router.push(`/game/${gid}?playerCode=${playerCode}`);
    });

    socket.once("error", (msg: string) => {
      setLoading(null);
      setError(msg);
    });
  };

  const Spinner = () => <Loader2 className="w-5 h-5 animate-spin" />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-game-bg relative px-4 py-10">
      <HowToPlayModal open={howToPlayOpen} onClose={() => setHowToPlayOpen(false)} />

      <div className="relative bg-game-surface border border-card-border shadow-2xl rounded-card p-8 w-full max-w-md space-y-5">
        <div className="text-center space-y-2 relative">
          <h1 className="font-mono text-4xl font-bold text-text-primary tracking-tight">
            Bluff Arena
          </h1>
          <p className="font-sans text-text-muted text-sm">Outsmart. Bluff. Win.</p>
          <button
            onClick={() => setHowToPlayOpen(true)}
            className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-game-elevated border border-card-border text-text-muted hover:text-text-primary transition active:scale-95"
            title="How to play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Name input */}
        <div>
          <label className="font-sans text-sm text-text-muted">Your Name</label>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            className="mt-1 w-full p-3 rounded-lg bg-black/40 border border-card-border text-text-primary placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-blue transition font-sans"
          />
        </div>

        {/* Max players */}
        <div>
          <label className="font-sans text-sm text-text-muted">Max Players (for new game)</label>
          <div className="flex gap-2 mt-1">
            {[2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setMaxPlayers(n)}
                className={`flex-1 py-2 rounded-lg font-mono text-sm font-semibold transition ${
                  maxPlayers === n
                    ? "bg-accent-blue text-white"
                    : "bg-black/40 border border-card-border text-text-muted hover:bg-white/10"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Stake amount */}
        <div>
          <label className="font-sans text-sm text-text-muted">Stake per player (USD, 0 = free game)</label>
          <div className="flex gap-2 mt-1">
            {[0, 5, 10, 25].map((amount) => (
              <button
                key={amount}
                onClick={() => setStakeUsd(amount)}
                className={`flex-1 py-2 rounded-lg font-mono text-sm font-semibold transition ${
                  stakeUsd === amount
                    ? "bg-accent-yellow text-black"
                    : "bg-black/40 border border-card-border text-text-muted hover:bg-white/10"
                }`}
              >
                {amount === 0 ? "Free" : `$${amount}`}
              </button>
            ))}
          </div>
          {stakeUsd > 0 && (
            <p className="mt-2 font-sans text-xs text-accent-yellow/80">
              Real ZEC staking (testnet) — you&apos;ll get a deposit address after creating the game.
            </p>
          )}
        </div>

        {/* Create game */}
        <button
          onClick={createGame}
          disabled={loading !== null}
          className="w-full py-3 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-accent-blue text-white flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.97] transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading === "create" ? <Spinner /> : <Target className="w-4 h-4" />}
          Create New Game
        </button>

        <div className="flex items-center gap-3 text-text-muted text-sm font-sans">
          <div className="flex-1 h-px bg-card-border" />
          OR
          <div className="flex-1 h-px bg-card-border" />
        </div>

        {/* Join game */}
        <div>
          <label className="font-sans text-sm text-text-muted">Game ID</label>
          <input
            placeholder="Enter game ID to join"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="mt-1 w-full p-3 rounded-lg bg-black/40 border border-card-border text-text-primary placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-blue transition font-sans"
          />
        </div>

        <button
          onClick={joinGame}
          disabled={loading !== null}
          className="w-full py-3 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-accent-green text-black flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.97] transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading === "join" ? <Spinner /> : <Rocket className="w-4 h-4" />}
          Join Game
        </button>

        {error && (
          <p className="text-center font-sans text-sm text-accent-red bg-accent-red/10 border border-accent-red/20 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <p className="text-center font-sans text-xs text-text-dim pt-1">
          Play with friends in real-time multiplayer
        </p>
      </div>
    </div>
  );
}
