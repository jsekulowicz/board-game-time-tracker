import type { Game, Player } from '@/types'

export enum GameSessionStatus {
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export interface GameSession {
  uuid: string
  name: string
  game: Game
  status: GameSessionStatus
  players: GameSessionPlayer[]
  currentPlayerUuids: string[]
  createdAt: string
  updatedAt: string | null
}

export interface PlayerTurn {
  startTimestamp: string
  endTimestamp: string | null
  turnIndex: number
}

export interface GameSessionPlayer extends Player {
  turns?: PlayerTurn[]
  previousTotalTimeMs: number
}
