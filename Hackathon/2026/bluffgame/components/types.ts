export interface PlayerState {
  id: string
  name: string
  hand: string[]
}

export interface LastClaim {
  playerId: string
  card: string
  count: number
}

export interface GameState {
  players: PlayerState[]
  pile: string[]
  turn: number
  log: string[]
  lastClaim: LastClaim | null
}
