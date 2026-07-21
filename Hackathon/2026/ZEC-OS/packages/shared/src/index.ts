// Character
export type CharacterClass = 'miner' | 'shielder' | 'trader';

export interface Character {
  id: string;
  username: string;
  class: CharacterClass;
  level: number;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  zatoshis: number; // ZEC in zatoshis (1 ZEC = 100_000_000 zatoshis)
  gear: string[];
  createdAt: string;
}

// API responses
export interface CreateCharacterRequest {
  username: string;
  class: CharacterClass;
}

export interface CreateCharacterResponse {
  depositAddress: string;
  expiresAt: string; // ISO timestamp — address expires if unpaid
}

export interface CharacterKeyResponse {
  characterKey: string; // passphrase issued after payment confirmed
  character: Character;
}

export interface LoginRequest {
  characterKey: string;
}

export interface LoginResponse {
  sessionToken: string;
  character: Character;
}

// Leaderboard
export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  level: number;
  weekId: string;
}

export interface WeeklyLeaderboard {
  weekId: string;
  entries: LeaderboardEntry[];
  commitmentTxid?: string; // on-chain commitment, present after week close
  totalPrizeZatoshis?: number;
}

// Score submission
export interface ScoreSubmitRequest {
  sessionToken: string;
  score: number;
  weekId: string;
}

// Gambling mode (mirrors GAMBLING_MODE env var)
export type GamblingMode = 'off' | 'test' | 'live';

export interface ServerConfig {
  gamblingMode: GamblingMode;
  characterCreationFeeZatoshis: number; // default: 1_000_000 (0.01 ZEC)
  weeklyEntryFeeZatoshis: number;
}
