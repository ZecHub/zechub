import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server, Socket } from "socket.io";
import crypto from "crypto";
import type { Game, Player, LastClaim } from "./types/game.js";
import * as zcashPool from "./lib/zcash-pool.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

/* =====================================================================
   CONSTANTS
   ===================================================================== */

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
const VALID_TYPES = new Set(VALUES);

const TURN_TIMEOUT_MS = 30_000;          // 30s per turn
const RECONNECT_GRACE_MS = 90_000;       // 90s to reconnect in-game
const LOBBY_DISCONNECT_GRACE_MS = 30_000;// 30s to reconnect in lobby
const GAME_TTL_MS = 60 * 60 * 1000;     // 1h before stale cleanup
const MAX_EVENTS_PER_SEC = 15;

/* =====================================================================
   GAME STATE
   ===================================================================== */

// Server-only game object extends the shared Game type with a timer ref
interface ServerGame extends Game {
  turnTimer: ReturnType<typeof setTimeout> | undefined;
}

const games = new Map<string, ServerGame>();

/* =====================================================================
   RATE LIMITING
   ===================================================================== */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const isRateLimited = (socketId: string): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(socketId);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(socketId, { count: 1, resetAt: now + 1000 });
    return false;
  }
  entry.count++;
  return entry.count > MAX_EVENTS_PER_SEC;
};

/* =====================================================================
   HELPERS
   ===================================================================== */

const generatePlayerCode = () =>
  crypto.randomBytes(4).toString("hex").toUpperCase();

const createDeck = (): string[] => {
  const deck: string[] = [];
  for (const s of SUITS) for (const v of VALUES) deck.push(`${v}${s}`);
  return deck.sort(() => Math.random() - 0.5);
};

const dealCards = (count: number): string[][] => {
  const deck = createDeck();
  const hands: string[][] = Array.from({ length: count }, () => []);
  deck.forEach((c, i) => hands[i % count].push(c));
  return hands;
};

const sanitizeName = (name: unknown): string | null => {
  if (typeof name !== "string") return null;
  const trimmed = name.trim().slice(0, 20);
  return trimmed.length > 0 ? trimmed : null;
};

const getPlayerIndex = (game: ServerGame, socketId: string) =>
  game.players.findIndex((p) => p.id === socketId);

// Generates a fresh zcashd deposit address for a player in a staked game and
// emits it to just that player. No-op for free (stakeUsd === 0) games.
const provisionDeposit = async (
  game: ServerGame,
  player: Player,
  socket: Socket
): Promise<void> => {
  if (game.stakeUsd <= 0) return;

  try {
    const { address, stakeZec } = await zcashPool.addDepositSlot(game.id, player.playerCode);
    player.depositAddress = address;
    socket.emit("deposit-address", { address, stakeZec, stakeUsd: game.stakeUsd });
  } catch (err) {
    console.error(`[deposit] failed to provision slot for ${player.playerCode}:`, err);
    socket.emit(
      "error",
      `Could not create deposit address: ${err instanceof Error ? err.message : String(err)}`
    );
  }
};

// Strip server-only `turnTimer` field before broadcasting
const toClient = (game: ServerGame): Game => {
  const { turnTimer, ...rest } = game;
  void turnTimer;
  return rest;
};

/* =====================================================================
   WINNER / TURN LOGIC
   ===================================================================== */

const checkWinner = (game: ServerGame): boolean => {
  if (game.winner !== undefined) return true;

  if (
    game.potentialWinner !== undefined &&
    game.turn === game.potentialWinner
  ) {
    const player = game.players[game.turn];
    if (player.hand.length === 0) {
      game.winner = game.turn;
      game.status = "ended";
      game.log.push(`${player.name} has won the game!`);
      return true;
    }
    game.potentialWinner = undefined;
  }
  return false;
};

// Fires the on-chain payout once a staked game has a confirmed winner.
// No-op for free games, and safe to call redundantly — payoutWinner()
// itself is idempotent against a game's stored payoutTxid.
const maybeTriggerPayout = (io: Server, game: ServerGame) => {
  if (game.winner === undefined || game.stakeUsd <= 0 || game.payoutTxid) return;

  const winner = game.players[game.winner];
  zcashPool
    .payoutWinner(game.id, winner.playerCode)
    .then((txid) => {
      game.payoutTxid = txid;
      game.log.push(`Payout sent to ${winner.name} (txid ${txid})`);
      io.to(game.id).emit("game-updated", toClient(game));
    })
    .catch((err) => {
      console.error(`[payout] failed for game ${game.id}:`, err);
      io.to(game.id).emit(
        "error",
        `Payout failed: ${err instanceof Error ? err.message : String(err)}`
      );
    });
};

const advanceTurn = (io: Server, game: ServerGame) => {
  if (game.turnTimer) {
    clearTimeout(game.turnTimer);
    game.turnTimer = undefined;
  }

  if (game.status !== "playing" || game.winner !== undefined) return;

  // Skip persistently-disconnected players (up to a full cycle)
  let skips = 0;
  while (skips < game.players.length) {
    if (game.players[game.turn].isConnected) break;
    game.log.push(`${game.players[game.turn].name}'s turn skipped (disconnected)`);
    game.turn = (game.turn + 1) % game.players.length;
    skips++;
  }

  game.turnDeadline = Date.now() + TURN_TIMEOUT_MS;

  game.turnTimer = setTimeout(() => {
    game.turnTimer = undefined;
    const player = game.players[game.turn];
    game.log.push(`${player.name}'s turn timed out`);
    game.passCount++;

    if (game.passCount >= game.players.length && game.lastClaim) {
      game.log.push(`All players passed. Pile discarded (${game.pile.length} cards).`);
      game.pile = [];
      game.lastClaim = null;
      game.passCount = 0;
    }

    game.turn = (game.turn + 1) % game.players.length;
    if (!checkWinner(game)) advanceTurn(io, game);
    maybeTriggerPayout(io, game);

    io.to(game.id).emit("game-updated", toClient(game));
  }, TURN_TIMEOUT_MS);
};

/* =====================================================================
   BOOT
   ===================================================================== */

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  /* ===================================================================
     PERIODIC CLEANUP — stale non-playing games older than 1h
     =================================================================== */
  setInterval(() => {
    const now = Date.now();
    for (const [gameId, game] of games) {
      if (game.status !== "playing" && now - game.createdAt > GAME_TTL_MS) {
        if (game.turnTimer) clearTimeout(game.turnTimer);
        games.delete(gameId);
        console.log(`[cleanup] removed stale game ${gameId}`);
      }
    }
  }, 10 * 60 * 1000);

  /* ===================================================================
     SOCKET HANDLERS
     =================================================================== */

  io.on("connection", (socket) => {
    console.log(`[connect] ${socket.id}`);

    // Convenience wrapper that applies rate limiting
    const guard = (fn: () => void) => {
      if (isRateLimited(socket.id)) {
        socket.emit("error", "Rate limit exceeded");
        return;
      }
      fn();
    };

    /* -----------------------------------------------------------------
       CREATE GAME
       ----------------------------------------------------------------- */
    socket.on("create-game", ({ name, maxPlayers, stakeUsd }) =>
      guard(() => {
        const cleanName = sanitizeName(name);
        if (!cleanName) return socket.emit("error", "Invalid name");

        const max = Math.min(Math.max(Number(maxPlayers) || 2, 2), 6);
        const cleanStakeUsd = Math.max(Number(stakeUsd) || 0, 0);
        const gameId = Math.random().toString(36).substring(2, 8);
        const playerCode = generatePlayerCode();

        const player: Player = {
          id: socket.id,
          name: cleanName,
          hand: [],
          isActive: true,
          playerCode,
          isConnected: true,
          lastSeen: Date.now(),
          depositConfirmed: false,
        };

        const game: ServerGame = {
          id: gameId,
          status: "lobby",
          hostSocketId: socket.id,
          hostPlayerCode: playerCode,
          maxPlayers: max,
          players: [player],
          pile: [],
          turn: 0,
          log: [`${cleanName} created the game`],
          lastClaim: null,
          passCount: 0,
          turnDeadline: 0,
          createdAt: Date.now(),
          turnTimer: undefined,
          stakeUsd: cleanStakeUsd,
          poolReady: cleanStakeUsd === 0,
        };

        games.set(gameId, game);
        socket.join(gameId);

        socket.emit("game-created", { gameId, playerCode });

        if (cleanStakeUsd > 0) {
          zcashPool
            .createPool(gameId, cleanStakeUsd)
            .then((stakeZec) => {
              game.stakeZec = stakeZec;
              return provisionDeposit(game, player, socket);
            })
            .catch((err) => {
              console.error(`[stake] failed to create pool for ${gameId}:`, err);
              socket.emit(
                "error",
                `Could not set up staking pool: ${err instanceof Error ? err.message : String(err)}`
              );
            });
        }
      })
    );

    /* -----------------------------------------------------------------
       JOIN GAME
       ----------------------------------------------------------------- */
    socket.on("join-game", ({ gameId, name }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game) return socket.emit("error", "Game not found");
        if (game.status !== "lobby")
          return socket.emit("error", "Game has already started");
        if (game.players.length >= game.maxPlayers)
          return socket.emit("error", "Game is full");

        const cleanName = sanitizeName(name);
        if (!cleanName) return socket.emit("error", "Invalid name");

        const playerCode = generatePlayerCode();

        const player: Player = {
          id: socket.id,
          name: cleanName,
          hand: [],
          isActive: true,
          playerCode,
          isConnected: true,
          lastSeen: Date.now(),
          depositConfirmed: false,
        };

        game.players.push(player);
        game.log.push(`${cleanName} joined the game`);
        socket.join(gameId);

        io.to(gameId).emit("game-updated", toClient(game));
        socket.emit("joined-game", { gameId, playerCode });

        if (game.stakeUsd > 0) {
          provisionDeposit(game, player, socket).then(() => {
            io.to(gameId).emit("game-updated", toClient(game));
          });
        }
      })
    );

    /* -----------------------------------------------------------------
       RECONNECT PLAYER
       ----------------------------------------------------------------- */
    socket.on("reconnect-player", ({ gameId, playerCode }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game) return socket.emit("error", "Game not found");

        const player = game.players.find((p) => p.playerCode === playerCode);
        if (!player) return socket.emit("error", "Player not found");

        player.id = socket.id;
        player.isConnected = true;
        player.lastSeen = Date.now();

        if (player.playerCode === game.hostPlayerCode) {
          game.hostSocketId = socket.id;
        }

        socket.join(gameId);
        socket.emit("game-updated", toClient(game));
        io.to(gameId).emit("game-updated", toClient(game));

        console.log(`[reconnect] ${player.name} rejoined game ${gameId}`);
      })
    );

    /* -----------------------------------------------------------------
       GET GAME STATE
       ----------------------------------------------------------------- */
    socket.on("get-game-state", ({ gameId }) =>
      guard(() => {
        const game = games.get(gameId);
        if (game) socket.emit("game-updated", toClient(game));
      })
    );

    /* -----------------------------------------------------------------
       SET PAYOUT ADDRESS
       ----------------------------------------------------------------- */
    socket.on("set-payout-address", ({ gameId, address }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game) return socket.emit("error", "Game not found");

        const player = game.players.find((p) => p.id === socket.id);
        if (!player) return socket.emit("error", "Player not found in this game");

        const cleanAddress = typeof address === "string" ? address.trim() : "";
        if (!cleanAddress) return socket.emit("error", "Invalid payout address");

        try {
          zcashPool.setPayoutAddress(gameId, player.playerCode, cleanAddress);
          player.zecPayoutAddress = cleanAddress;
          io.to(gameId).emit("game-updated", toClient(game));
        } catch (err) {
          socket.emit("error", err instanceof Error ? err.message : String(err));
        }
      })
    );

    /* -----------------------------------------------------------------
       CHECK DEPOSITS (client polls this while stake pool is filling)
       ----------------------------------------------------------------- */
    socket.on("check-deposits", ({ gameId }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game || game.stakeUsd <= 0) return;

        zcashPool
          .pollDeposits(gameId)
          .then(({ poolReady, confirmations }) => {
            for (const player of game.players) {
              if (player.playerCode in confirmations) {
                player.depositConfirmed = confirmations[player.playerCode];
              }
            }
            game.poolReady = poolReady;
            io.to(gameId).emit("game-updated", toClient(game));
          })
          .catch((err) => {
            console.error(`[deposits] poll failed for ${gameId}:`, err);
            socket.emit(
              "error",
              `Could not check deposits: ${err instanceof Error ? err.message : String(err)}`
            );
          });
      })
    );

    /* -----------------------------------------------------------------
       START GAME (host only)
       ----------------------------------------------------------------- */
    socket.on("start-game", ({ gameId }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game) return socket.emit("error", "Game not found");
        if (game.hostSocketId !== socket.id)
          return socket.emit("error", "Only the host can start the game");
        if (game.status !== "lobby")
          return socket.emit("error", "Game already started");
        if (game.players.length < 2)
          return socket.emit("error", "Need at least 2 players to start");
        if (game.stakeUsd > 0) {
          if (!game.poolReady)
            return socket.emit("error", "Waiting for all deposits to confirm");
          if (game.players.some((p) => !p.zecPayoutAddress))
            return socket.emit("error", "Every player must set a payout address first");
        }

        const hands = dealCards(game.players.length);
        game.players.forEach((p, i) => (p.hand = hands[i]));

        game.status = "playing";
        game.turn = 0;
        game.log.push("--- Game started! ---");

        advanceTurn(io, game);
        io.to(gameId).emit("game-updated", toClient(game));
      })
    );

    /* -----------------------------------------------------------------
       PLAY CARDS
       ----------------------------------------------------------------- */
    socket.on("play-cards", ({ gameId, selected, count, type }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game || game.status !== "playing" || game.winner !== undefined)
          return;

        const playerIndex = getPlayerIndex(game, socket.id);
        if (playerIndex === -1 || playerIndex !== game.turn) return;

        // Validate count
        const parsedCount = Number(count);
        if (!Number.isInteger(parsedCount) || parsedCount < 1 || parsedCount > 4)
          return socket.emit("error", "Invalid card count");

        // Validate selected array
        if (!Array.isArray(selected) || selected.length !== parsedCount)
          return socket.emit("error", "Selection count mismatch");

        // Validate card type
        if (!VALID_TYPES.has(type))
          return socket.emit("error", "Invalid card type");

        // Validate each selected card exists in hand (handle duplicates safely)
        const handCopy = [...game.players[playerIndex].hand];
        const validated: string[] = [];
        for (const card of selected) {
          const idx = handCopy.indexOf(card);
          if (idx === -1) return socket.emit("error", "Card not in hand");
          handCopy.splice(idx, 1);
          validated.push(card);
        }

        // Clear turn timer before mutating state
        if (game.turnTimer) {
          clearTimeout(game.turnTimer);
          game.turnTimer = undefined;
        }

        const player = game.players[playerIndex];
        player.hand = handCopy;
        game.pile.push(...validated);

        game.lastClaim = { player: playerIndex, count: parsedCount, type, cards: validated };
        game.log.push(`${player.name} played ${parsedCount}× ${type}`);
        game.passCount = 0;

        if (player.hand.length === 0) {
          game.potentialWinner = playerIndex;
        }

        game.turn = (game.turn + 1) % game.players.length;
        if (!checkWinner(game)) advanceTurn(io, game);
        maybeTriggerPayout(io, game);

        io.to(gameId).emit("game-updated", toClient(game));
      })
    );

    /* -----------------------------------------------------------------
       CHECK
       ----------------------------------------------------------------- */
    socket.on("check", ({ gameId }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game || !game.lastClaim || game.status !== "playing" || game.winner !== undefined)
          return;

        const checkerIndex = getPlayerIndex(game, socket.id);
        if (checkerIndex === -1 || checkerIndex !== game.turn) return;

        if (game.turnTimer) {
          clearTimeout(game.turnTimer);
          game.turnTimer = undefined;
        }

        const claimerIndex = game.lastClaim.player;
        const claimer = game.players[claimerIndex];
        const checker = game.players[checkerIndex];

        const lied = game.lastClaim.cards.some(
          (c) => c.slice(0, -1) !== game.lastClaim!.type
        );

        if (lied) {
          claimer.hand.push(...game.pile);
          game.log.push(
            `${checker.name} challenged ${claimer.name} — LIED! ${claimer.name} takes ${game.pile.length} cards.`
          );
          game.turn = checkerIndex;
        } else {
          checker.hand.push(...game.pile);
          game.log.push(
            `${checker.name} challenged ${claimer.name} — HONEST! ${checker.name} takes ${game.pile.length} cards.`
          );
          game.turn = claimerIndex;
        }

        game.pile = [];
        game.lastClaim = null;
        game.passCount = 0;

        if (!checkWinner(game)) advanceTurn(io, game);
        maybeTriggerPayout(io, game);

        io.to(gameId).emit("game-updated", toClient(game));
      })
    );

    /* -----------------------------------------------------------------
       PASS
       ----------------------------------------------------------------- */
    socket.on("pass", ({ gameId }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game || game.status !== "playing" || game.winner !== undefined)
          return;

        const playerIndex = getPlayerIndex(game, socket.id);
        if (playerIndex === -1 || playerIndex !== game.turn) return;

        if (game.turnTimer) {
          clearTimeout(game.turnTimer);
          game.turnTimer = undefined;
        }

        game.log.push(`${game.players[playerIndex].name} passed`);
        game.passCount++;

        if (game.passCount >= game.players.length && game.lastClaim) {
          game.log.push(
            `All players passed. Pile discarded (${game.pile.length} cards).`
          );
          game.pile = [];
          game.lastClaim = null;
          game.passCount = 0;
        }

        game.turn = (game.turn + 1) % game.players.length;
        if (!checkWinner(game)) advanceTurn(io, game);
        maybeTriggerPayout(io, game);

        io.to(gameId).emit("game-updated", toClient(game));
      })
    );

    /* -----------------------------------------------------------------
       SEND EMOTE
       ----------------------------------------------------------------- */
    socket.on("send-emote", ({ gameId, emoji }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game) return;

        const playerIndex = getPlayerIndex(game, socket.id);
        if (playerIndex === -1) return;

        // Whitelist emojis
        const allowed = ["😂", "🤔", "😤", "👀"];
        if (!allowed.includes(emoji)) return;

        io.to(gameId).emit("emote-received", { playerIndex, emoji });
      })
    );

    /* -----------------------------------------------------------------
       REMATCH (host only)
       ----------------------------------------------------------------- */
    socket.on("rematch", ({ gameId }) =>
      guard(() => {
        const game = games.get(gameId);
        if (!game) return socket.emit("error", "Game not found");
        if (game.hostSocketId !== socket.id)
          return socket.emit("error", "Only the host can start a rematch");
        if (game.status !== "ended") return;

        if (game.turnTimer) {
          clearTimeout(game.turnTimer);
          game.turnTimer = undefined;
        }

        // Reset to lobby — keep players, clear game state
        game.status = "lobby";
        game.players.forEach((p) => (p.hand = []));
        game.pile = [];
        game.turn = 0;
        game.log = ["--- Rematch started! ---"];
        game.lastClaim = null;
        game.passCount = 0;
        game.winner = undefined;
        game.potentialWinner = undefined;
        game.turnDeadline = 0;

        io.to(gameId).emit("game-updated", toClient(game));
      })
    );

    /* -----------------------------------------------------------------
       DISCONNECT
       ----------------------------------------------------------------- */
    socket.on("disconnect", () => {
      console.log(`[disconnect] ${socket.id}`);

      for (const [, game] of games) {
        const player = game.players.find((p) => p.id === socket.id);
        if (!player) continue;

        player.isConnected = false;
        player.lastSeen = Date.now();

        if (game.status === "lobby") {
          // In lobby: remove after grace period if still disconnected
          setTimeout(() => {
            if (player.isConnected) return; // reconnected
            game.players = game.players.filter((p) => p.playerCode !== player.playerCode);
            game.log.push(`${player.name} left the lobby`);

            // Transfer host if needed
            if (
              game.hostPlayerCode === player.playerCode &&
              game.players.length > 0
            ) {
              game.hostSocketId = game.players[0].id;
              game.hostPlayerCode = game.players[0].playerCode;
              game.log.push(`${game.players[0].name} is now the host`);
            }

            if (game.players.length === 0) {
              games.delete(game.id);
            } else {
              io.to(game.id).emit("game-updated", toClient(game));
            }
          }, LOBBY_DISCONNECT_GRACE_MS);
        } else if (game.status === "playing") {
          // In game: broadcast disconnected state; auto-pass handled by turn timer
          io.to(game.id).emit("game-updated", toClient(game));

          // After extended grace: if still disconnected, keep them but just keep auto-passing
          // (players reconnect using their link; no forced removal during active game)
        }

        break; // socket.id is unique — one player per socket
      }
    });
  });

  /* ===================================================================
     START
     =================================================================== */
  const PORT = parseInt(process.env.PORT || "3000", 10);
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
