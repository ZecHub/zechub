export interface Player {
  id: string;           // socket.id — updated on reconnect
  name: string;
  hand: string[];
  isActive: boolean;
  playerCode: string;
  isConnected: boolean;
  lastSeen: number;
  zecPayoutAddress?: string;   // where THEY get paid if they win
  depositAddress?: string;     // unique address they must send the stake to
  depositConfirmed: boolean;   // server-confirmed on-chain
}

export interface LastClaim {
  player: number;
  count: number;
  type: string;
  cards: string[];
}

export type GameStatus = "lobby" | "playing" | "ended";

export interface Game {
  id: string;
  status: GameStatus;
  hostSocketId: string;
  hostPlayerCode: string;
  maxPlayers: number;
  players: Player[];
  pile: string[];
  turn: number;
  log: string[];
  lastClaim: LastClaim | null;
  winner?: number;
  potentialWinner?: number;
  passCount: number;
  turnDeadline: number;   // ms timestamp — 0 in lobby/ended
  createdAt: number;
  stakeUsd: number;            // e.g. 10 ($10 per player); 0 = free/no-stake game
  stakeZec?: number;           // locked in once the pool is created (USD->ZEC at creation time)
  poolReady: boolean;          // true once every player's deposit is confirmed
  payoutTxid?: string;         // set once the winner has been paid
}
