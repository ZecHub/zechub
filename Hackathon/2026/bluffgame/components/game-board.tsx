"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import type { Socket } from "socket.io-client";
import type { Game, LastClaim } from "@/types/game";
import { Copy, Check as CheckIcon, HelpCircle } from "lucide-react";
import PlayerHand from "./player-hand";
import ActionPanel from "./action-panel";
import TurnTimer from "./turn-timer";
import EmoteBar from "./emote-bar";
import HowToPlayModal from "./how-to-play-modal";
import PhaseBanner, { type GamePhase } from "./phase-banner";
import ChallengeFlash from "./challenge-flash";

interface GameBoardProps {
  game: Game;
  playerIndex: number;
  socket: Socket;
  gameId: string;
}

interface EmoteState {
  emoji: string;
  key: number;
}

interface ChallengeResult {
  outcome: "caught" | "honest";
  detail: string;
  cards: string[];
}

const logLineClass = (entry: string) => {
  if (entry.includes("LIED")) return "text-accent-red";
  if (entry.includes("HONEST")) return "text-accent-green";
  if (entry.includes("won the game")) return "text-accent-green font-bold";
  if (entry.includes("passed") || entry.includes("timed out")) return "text-accent-yellow";
  if (entry.includes("joined") || entry.includes("left") || entry.includes("host")) return "text-text-muted";
  return "text-text-primary/80";
};

export default function GameBoard({
  game,
  playerIndex,
  socket,
  gameId,
}: GameBoardProps) {
  const [emotes, setEmotes] = useState<Record<number, EmoteState>>({});
  const [copied, setCopied] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [dealing, setDealing] = useState(true);
  const [challengeResult, setChallengeResult] = useState<ChallengeResult | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const emoteTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const emoteCounter = useRef(0);
  const prevLogLength = useRef(game.log.length);
  const prevLastClaim = useRef<LastClaim | null>(game.lastClaim);

  // Brief "Dealing" phase whenever the board first mounts (fresh game / rematch)
  useEffect(() => {
    setDealing(true);
    const t = setTimeout(() => setDealing(false), 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, game.log.length === 0]);

  // Subscribe to emote events only (game state lives in parent)
  useEffect(() => {
    const onEmote = ({ playerIndex: pi, emoji }: { playerIndex: number; emoji: string }) => {
      emoteCounter.current += 1;
      setEmotes((prev) => ({ ...prev, [pi]: { emoji, key: emoteCounter.current } }));

      if (emoteTimers.current[pi]) clearTimeout(emoteTimers.current[pi]);
      emoteTimers.current[pi] = setTimeout(() => {
        setEmotes((prev) => {
          const next = { ...prev };
          delete next[pi];
          return next;
        });
      }, 2500);
    };

    socket.on("emote-received", onEmote);
    return () => { socket.off("emote-received", onEmote); };
  }, [socket]);

  // Detect a newly-resolved Bluff! challenge from the log feed and flash the result
  useEffect(() => {
    if (game.log.length > prevLogLength.current) {
      const newEntries = game.log.slice(prevLogLength.current);
      const challengeEntry = newEntries.find((e) => e.includes("challenged"));
      if (challengeEntry && prevLastClaim.current) {
        const outcome = challengeEntry.includes("LIED") ? "caught" : "honest";
        setChallengeResult({
          outcome,
          detail: `${prevLastClaim.current.count} × ${prevLastClaim.current.type}`,
          cards: prevLastClaim.current.cards,
        });
        const t = setTimeout(() => setChallengeResult(null), 2200);
        return () => clearTimeout(t);
      }
    }
    prevLogLength.current = game.log.length;
    prevLastClaim.current = game.lastClaim;
  }, [game.log, game.lastClaim]);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [game.log]);

  const phase: GamePhase = dealing ? "dealing" : game.lastClaim ? "bluff-phase" : "playing";

  const copyGameId = async () => {
    await navigator.clipboard.writeText(gameId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const me = game.players[playerIndex];
  const isMyTurn = game.turn === playerIndex;

  const canCheck =
    !!game.lastClaim &&
    game.lastClaim.player !== playerIndex &&
    isMyTurn;

  const playCards = (count: number, type: string, selected: string[]) => {
    if (!isMyTurn) return;
    socket.emit("play-cards", { gameId, selected, count, type });
  };

  const pass = () => {
    if (!isMyTurn) return;
    socket.emit("pass", { gameId });
  };

  const check = () => {
    if (!canCheck) return;
    socket.emit("check", { gameId });
  };

  const getSeatStyle = (seatOrder: number, totalOpponents: number) => {
    const radiusX = game.players.length <= 3 ? 35 : game.players.length <= 6 ? 40 : 45;
    const radiusY = 32;
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;
    const angleStep = (endAngle - startAngle) / (totalOpponents - 1 || 1);
    const angle = startAngle + seatOrder * angleStep;
    return {
      left: `calc(50% + ${Math.cos(angle) * radiusX}%)`,
      top: `calc(50% + ${Math.sin(angle) * radiusY}%)`,
      transform: "translate(-50%, -50%)",
    };
  };

  const tableShape =
    game.players.length <= 3
      ? "rounded-[40%]"
      : game.players.length <= 6
      ? "rounded-[48%]"
      : "rounded-[55%]";

  const opponents = useMemo(
    () => game.players.filter((_, i) => i !== playerIndex),
    [game.players, playerIndex]
  );

  return (
    <div className="min-h-screen w-full bg-game-bg text-text-primary px-2 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col relative overflow-x-hidden">
      <ChallengeFlash
        result={challengeResult?.outcome ?? null}
        detail={challengeResult?.detail}
        cards={challengeResult?.cards}
      />
      <HowToPlayModal open={howToPlayOpen} onClose={() => setHowToPlayOpen(false)} />

      {/* ── HEADER ── */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <div className="flex items-center gap-3 bg-game-elevated/90 backdrop-blur-md px-4 py-2 rounded-full border border-card-border shadow-lg">
          <span className="font-mono text-[10px] sm:text-xs text-text-muted uppercase tracking-widest">Code</span>
          <span className="font-mono text-accent-yellow text-sm sm:text-base tracking-wider">
            {gameId}
          </span>
          <button
            onClick={copyGameId}
            className="flex items-center gap-1 bg-accent-yellow hover:brightness-110 text-black text-[10px] sm:text-xs px-3 py-1 rounded-full font-mono font-semibold uppercase tracking-wider transition active:scale-95"
          >
            {copied ? <CheckIcon className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <button
          onClick={() => setHowToPlayOpen(true)}
          title="How to play"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-game-elevated/90 border border-card-border text-text-muted hover:text-text-primary transition active:scale-95"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* ── GAME LOG ── */}
      <div className="absolute top-16 sm:top-4 left-2 sm:left-4 w-44 sm:w-64 md:w-80 z-40">
        <div className="backdrop-blur-lg bg-game-surface/90 border border-card-border shadow-xl rounded-card p-2 sm:p-3">
          <h3 className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] mb-1 sm:mb-2 text-text-muted">
            Game Log
          </h3>
          <div
            ref={logRef}
            className="max-h-[90px] sm:max-h-[120px] overflow-y-auto space-y-1 pr-1"
          >
            {game.log.map((entry, i) => (
              <div
                key={i}
                className={`font-mono text-[9px] sm:text-[10px] leading-tight bg-black/30 px-2 py-1 rounded ${logLineClass(entry)}`}
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="flex-1 flex items-center justify-center relative">
        <div
          className={`
            relative w-full max-w-[1000px] aspect-[9/5] sm:aspect-[16/9]
            ${tableShape}
            shadow-[0_40px_80px_rgba(0,0,0,0.85)]
            border-[10px] border-[#241a10]
            bg-[radial-gradient(circle_at_center,#103a24_0%,#0b2b1b_45%,#071c12_80%)]
            overflow-hidden
          `}
        >
          {/* Felt texture & lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_25px_60px_rgba(0,0,0,0.85)] pointer-events-none" />
          <div className="absolute inset-0 rounded-[inherit] border-[6px] border-black/30 shadow-[inset_0_0_25px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Center: phase + pile + timer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center gap-2">
            <PhaseBanner phase={phase} />

            <TurnTimer
              turnDeadline={game.turnDeadline}
              isMyTurn={isMyTurn}
              currentPlayerName={game.players[game.turn]?.name ?? ""}
            />

            <p className="font-mono text-[10px] sm:text-xs md:text-sm text-text-muted">
              Pile: {game.pile.length} cards
            </p>

            {/* Card stack visual */}
            <div className="relative w-10 h-16 sm:w-16 sm:h-24 md:w-20 md:h-28">
              {game.pile.slice(0, 5).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full rounded-lg border shadow-md"
                  style={{
                    top: i * 2,
                    left: i * 2,
                    transform: `rotate(${i * 2}deg)`,
                    background: "var(--card-back)",
                    borderColor: "var(--card-border)",
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 8px)",
                  }}
                />
              ))}
            </div>

            {game.lastClaim && (
              <p className="font-mono text-xs sm:text-sm md:text-base font-bold text-text-primary">
                {game.players[game.lastClaim.player]?.name} played{" "}
                {game.lastClaim.count} × {game.lastClaim.type}
              </p>
            )}
          </div>

          {/* Opponent seats */}
          {opponents.map((player, i) => {
            const globalIndex = game.players.indexOf(player);
            const isTurn = game.turn === globalIndex;
            const emote = emotes[globalIndex];

            return (
              <div
                key={player.playerCode}
                className="absolute flex flex-col items-center gap-1"
                style={getSeatStyle(i, opponents.length)}
              >
                {/* Floating emote */}
                {emote && (
                  <div
                    key={emote.key}
                    className="text-2xl animate-bounce absolute -top-8"
                  >
                    {emote.emoji}
                  </div>
                )}

                <div
                  className={`px-2 py-1 rounded-lg font-sans text-[9px] sm:text-xs uppercase tracking-wide flex items-center gap-1 border ${
                    isTurn
                      ? "bg-accent-blue text-white border-accent-blue font-bold"
                      : "bg-black/60 border-card-border text-text-primary"
                  } ${!player.isConnected ? "opacity-50" : ""}`}
                >
                  {!player.isConnected && (
                    <span className="text-[8px] text-accent-red">●</span>
                  )}
                  {player.name}
                  {!player.isConnected && (
                    <span className="text-[8px] text-accent-red/80 ml-1 font-mono">DC</span>
                  )}
                </div>

                <div className="relative w-8 h-12 sm:w-12 sm:h-16 md:w-14 md:h-20">
                  {Array.from({
                    length: Math.min(player.hand.length, 20),
                  }).map((_, c) => (
                    <div
                      key={c}
                      className="absolute w-full h-full rounded-lg border shadow-md"
                      style={{
                        left: c * 5,
                        background: "var(--card-back)",
                        borderColor: "var(--card-border)",
                        backgroundImage:
                          "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 8px)",
                      }}
                    />
                  ))}
                </div>

                <span className="font-mono text-[9px] text-text-muted">
                  {player.hand.length} cards
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM ZONE: hand + action bar ── */}
      <div className="w-full bg-game-surface/60 border-t border-card-border pt-2 pb-20 overflow-visible">
        <p className="text-center font-mono text-[11px] text-text-muted mb-1 uppercase tracking-wide">
          Your hand · {me.hand.length} cards
        </p>
        <PlayerHand cards={me.hand} />
      </div>

      {/* ── FIXED ACTION BAR ── */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <ActionPanel
          onPass={pass}
          gameLog={game.log}
          onPlayCards={playCards}
          onCheck={check}
          canCheck={canCheck}
          isCurrentPlayer={isMyTurn}
          playerHand={me.hand}
          lastClaim={game.lastClaim}
        />
        <EmoteBar socket={socket} gameId={gameId} />
      </div>

      {/* My emote bubble */}
      {emotes[playerIndex] && (
        <div
          key={emotes[playerIndex].key}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 text-4xl animate-bounce pointer-events-none"
        >
          {emotes[playerIndex].emoji}
        </div>
      )}
    </div>
  );
}
