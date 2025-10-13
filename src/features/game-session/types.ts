import type { Game, Player } from '@/types'

export enum GameSessionStatus {
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export enum GameSessionPlayerStatus {
  PLAYING = 'playing',
  WAITING = 'waiting',
  PASSED = 'passed',
}

export interface GameSession {
  uuid: string
  name: string
  game: Game
  status: GameSessionStatus
  players: GameSessionPlayer[]
  currentTurnIndex: number
  createdAt: string
  updatedAt: string | null
}

export interface PlayerMove {
  startTimestamp: string
  endTimestamp: string | null
  moveIndex: number
  turnIndex: number
}

export interface GameSessionPlayer extends Player {
  moves: PlayerMove[]
  status: GameSessionPlayerStatus
  previousTotalTimeMs: number
  turnOrderIndex: number
}
