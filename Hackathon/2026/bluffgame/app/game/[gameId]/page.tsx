"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getSocket } from "@/app/socket";
import type { Game } from "@/types/game";
import GameBoard from "@/components/game-board";
import Lobby from "@/components/lobby";
import EndScreen from "@/components/end-screen";
import ReconnectingOverlay from "@/components/reconnecting-overlay";
import { Loader2, Ban, Rocket } from "lucide-react";

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const playerCode = searchParams.get("playerCode");

  const [game, setGame] = useState<Game | null>(null);
  const [joinName, setJoinName] = useState("");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const socket = getSocket();

  useEffect(() => {
    if (!socket.connected) socket.connect();

    if (playerCode) {
      // Returning player — re-identify (handles refresh / cold load)
      socket.emit("reconnect-player", { gameId, playerCode });
    } else {
      // Guest opening an invite link — just fetch lobby state to show the game name/info
      socket.emit("get-game-state", { gameId });
    }

    const onGameUpdated = (data: Game) => setGame(data);
    socket.on("game-updated", onGameUpdated);

    return () => {
      socket.off("game-updated", onGameUpdated);
    };
  }, [socket, gameId, playerCode]);

  const playerIndex = useMemo(() => {
    if (!game || !playerCode) return -1;
    return game.players.findIndex((p) => p.playerCode === playerCode);
  }, [game, playerCode]);

  const isHost = useMemo(
    () => !!game && game.hostPlayerCode === playerCode,
    [game, playerCode]
  );

  // ── Guest join handler ──
  const handleJoin = () => {
    if (!joinName.trim()) return setJoinError("Enter your name");
    setJoinError(null);
    setJoining(true);

    socket.emit("join-game", { gameId, name: joinName.trim() });

    socket.once("joined-game", ({ gameId: gid, playerCode: code }: { gameId: string; playerCode: string }) => {
      setJoining(false);
      // Update URL with the new playerCode without triggering a full navigation
      router.replace(`/game/${gid}?playerCode=${code}`);
    });

    socket.once("error", (msg: string) => {
      setJoining(false);
      setJoinError(msg);
    });
  };

  // ── Loading ──
  if (!game) {
    return (
      <div className="h-screen flex items-center justify-center bg-game-bg text-text-primary">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-accent-blue animate-spin" />
          <span className="font-mono text-sm text-text-muted uppercase tracking-wide">Loading game…</span>
        </div>
      </div>
    );
  }

  // ── Guest — show join form ──
  if (!playerCode || playerIndex === -1) {
    // Don't show join form if game is already in progress / ended
    const canJoin = game.status === "lobby" && game.players.length < game.maxPlayers;

    if (!canJoin) {
      return (
        <div className="h-screen flex items-center justify-center bg-game-bg">
          <div className="text-center space-y-2">
            <Ban className="w-10 h-10 text-accent-red mx-auto" />
            <p className="font-mono text-text-primary text-xl font-bold">
              {game.status !== "lobby" ? "Game already started" : "Game is full"}
            </p>
            <p className="font-sans text-text-muted text-sm">You can&apos;t join this game right now.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 rounded-md font-mono text-xs uppercase tracking-wider bg-accent-blue text-white hover:brightness-110 transition"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-screen flex items-center justify-center bg-game-bg px-4">
        <div className="relative z-10 w-full max-w-sm mx-4 bg-game-surface border border-card-border shadow-2xl rounded-card p-8 space-y-5">
          <div className="text-center space-y-1">
            <h1 className="font-mono text-2xl font-bold text-text-primary">Join Game</h1>
            <p className="font-sans text-text-muted text-sm">
              Game <span className="font-mono text-accent-yellow">{gameId}</span> ·{" "}
              {game.players.length}/{game.maxPlayers} players
            </p>
          </div>

          <div>
            <label className="font-sans text-sm text-text-muted">Your Name</label>
            <input
              placeholder="Enter your name"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              maxLength={20}
              autoFocus
              className="mt-1 w-full p-3 rounded-lg bg-black/40 border border-card-border text-text-primary placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-blue transition font-sans"
            />
          </div>

          {joinError && (
            <p className="font-sans text-sm text-accent-red bg-accent-red/10 border border-accent-red/20 rounded-lg py-2 px-3">
              {joinError}
            </p>
          )}

          <button
            onClick={handleJoin}
            disabled={joining}
            className="w-full py-3 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-accent-green text-black flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.97] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {joining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
            Join Game
          </button>

          {/* Current players preview */}
          <div className="space-y-1">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Already in lobby</p>
            {game.players.map((p) => (
              <div key={p.playerCode} className="flex items-center gap-2 font-sans text-sm text-text-primary/90">
                <div className="w-6 h-6 rounded-full bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-blue font-mono text-xs font-bold">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                {p.name}
                {p.playerCode === game.hostPlayerCode && (
                  <span className="font-mono text-xs text-accent-yellow">Host</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReconnectingOverlay socket={socket} gameId={gameId} playerCode={playerCode} />

      {game.status === "lobby" && (
        <Lobby game={game} isHost={isHost} socket={socket} gameId={gameId} playerCode={playerCode} />
      )}

      {game.status === "playing" && (
        <GameBoard game={game} playerIndex={playerIndex} socket={socket} gameId={gameId} />
      )}

      {game.status === "ended" && (
        <EndScreen game={game} playerIndex={playerIndex} isHost={isHost} socket={socket} gameId={gameId} />
      )}
    </>
  );
}
