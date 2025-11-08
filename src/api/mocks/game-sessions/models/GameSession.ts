import type {
  CommonUuid,
  ErrorResponse,
  GameSessionPlayer,
  GameSessionPlayerStatus,
  GameSessionResource,
  GameSessionStatus,
} from '@/api/generated'
import { toRaw } from 'vue'
import { ALREADY_MOVED, PLAYER_NOT_FOUND, GAME_SESSION_NOT_IN_PROGRESS } from '../errors'

export class GameSession {
  private resource: GameSessionResource

  constructor(resource: GameSessionResource) {
    this.resource = toRaw(resource)
  }

  get data(): GameSessionResource {
    return structuredClone(toRaw(this.resource))
  }

  setName(name: string): GameSessionResource | ErrorResponse {
    this.resource.name = name
    return this.data
  }

  setStatus(status: GameSessionStatus): GameSessionResource | ErrorResponse {
    switch (status) {
      case 'in_progress':
        this.resumeTracking()
        break
      case 'paused':
      case 'ended':
        this.stopTracking()
        break
    }

    this.resource.status = status
    return this.data
  }

  switchPlayerMove(playerUuid: CommonUuid): GameSessionResource | ErrorResponse {
    const player = this.resource.players.find((p) => p.id === playerUuid)
    if (!player) {
      return PLAYER_NOT_FOUND
    }

    if (player.status !== 'ready_to_move' && !this.shouldStartNewTurn()) {
      return ALREADY_MOVED
    }

    if (!['in_progress', 'ready_to_track'].includes(this.resource.status)) {
      return GAME_SESSION_NOT_IN_PROGRESS
    }

    this.endAllCurrentMoves()
    this.startNewMoveFor(player)

    if (this.resource.status === 'ready_to_track') {
      this.resource.status = 'in_progress'
    }

    return this.data
  }

  private resumeTracking() {
    for (const player of this.resource.players) {
      if (player.status === 'tracking') {
        const lastMove = player.moves.at(-1)
        if (lastMove && lastMove.endTimestamp) {
          player.moves.push({
            startTimestamp: new Date().toISOString(),
            endTimestamp: null,
            moveIndex: lastMove.moveIndex + 1,
            turnIndex: lastMove.turnIndex,
          })
        }
      }
    }
  }

  private stopTracking() {
    this.resource.players.forEach((p) => this.endLastMove(p))
  }

  private endLastMove(player: GameSessionPlayer, newStatus?: GameSessionPlayerStatus): void {
    const lastMove = player.moves.at(-1)
    if (lastMove && !lastMove.endTimestamp) {
      lastMove.endTimestamp = new Date().toISOString()
      const duration = new Date(lastMove.endTimestamp).getTime() - new Date(lastMove.startTimestamp).getTime()
      player.previousTotalTimeMs += duration
    }
    if (newStatus) {
      player.status = newStatus
    }
  }

  private endAllCurrentMoves() {
    for (const player of this.resource.players) {
      if (player.status === 'tracking') {
        this.endLastMove(player, 'turn_ended')
      }
    }
  }

  private startNewMoveFor(player: GameSessionPlayer) {
    const shouldStartNewTurn = this.shouldStartNewTurn()
    if (shouldStartNewTurn) {
      this.resource.players.forEach((p) => (p.status = 'ready_to_move'))
      this.resource.currentTurnIndex++
    }

    if (!player) return

    player.moves.push({
      startTimestamp: new Date().toISOString(),
      endTimestamp: null,
      moveIndex: this.resource.currentMoveIndex + 1,
      turnIndex: this.resource.currentTurnIndex,
    })

    player.status = 'tracking'
    this.resource.currentMoveIndex = this.resource.currentMoveIndex + 1
  }

  private shouldStartNewTurn(): boolean {
    return this.resource.players.every((p) => p.status !== 'ready_to_move')
  }
}
