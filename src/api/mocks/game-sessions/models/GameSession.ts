import type {
  CommonUuid,
  ErrorResponse,
  GameSessionPlayer,
  GameSessionPlayerStatus,
  GameSessionResource,
  GameSessionStatus,
} from '@/api/generated'
import { deepFreeze } from '@/object-utils'
import { toRaw } from 'vue'

export class GameSession {
  private resource: GameSessionResource

  constructor(resource: GameSessionResource) {
    this.resource = toRaw(resource)
  }

  get data(): GameSessionResource {
    return this.resource
  }

  setName(name: string): GameSessionResource | ErrorResponse {
    this.resource.name = name
    return this.data
  }

  async setStatus(status: GameSessionStatus): Promise<GameSessionResource | ErrorResponse> {
    switch (status) {
      case 'in_progress':
        this.resumeTracking()
        break
      case 'paused':
      case 'completed':
        this.stopTracking(status)
        break
    }
    this.resource.status = status
    return this.data
  }

  async switchPlayerMove(playerUuid: CommonUuid): Promise<GameSessionResource | ErrorResponse> {
    const player = this.resource.players.find((p) => p.uuid === playerUuid)
    if (!player) {
      return { error: 'PLAYER_NOT_FOUND', message: 'Player not found', statusCode: 404 }
    }

    if (player.status !== 'ready_to_move' && !this.shouldStartNewTurn()) {
      return { error: 'ALREADY_MOVED', message: 'Player already made a move this turn', statusCode: 400 }
    }

    this.endAllCurrentMoves()
    this.startNewMoveFor(playerUuid)
    return this.data
  }

  endPlayerMove(playerUuid: CommonUuid): GameSessionResource | ErrorResponse {
    const player = this.resource.players.find((p) => p.uuid === playerUuid)
    if (!player) return { error: 'PLAYER_NOT_FOUND', message: 'Player not found', statusCode: 404 }

    this.endLastMove(player)
    return this.data
  }

  // ---------------------------
  // Private helpers
  // ---------------------------

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

  private stopTracking(status: GameSessionStatus) {
    this.resource.players = this.resource.players.map((p) => this.endLastMove(p))
  }

  private endLastMove(player: GameSessionPlayer, newStatus?: GameSessionPlayerStatus): GameSessionPlayer {
    const copy = structuredClone(player)
    const lastMove = copy.moves.at(-1)
    if (lastMove && !lastMove.endTimestamp) {
      lastMove.endTimestamp = new Date().toISOString()
      const duration = new Date(lastMove.endTimestamp).getTime() - new Date(lastMove.startTimestamp).getTime()
      copy.previousTotalTimeMs += duration
    }
    if (newStatus) copy.status = newStatus
    return copy
  }

  private endAllCurrentMoves() {
    for (const player of this.resource.players) {
      if (player.status === 'tracking') {
        this.endLastMove(player, 'turn_completed')
      }
    }
  }

  private startNewMoveFor(playerUuid: CommonUuid) {
    const shouldStartNewTurn = this.shouldStartNewTurn()
    if (shouldStartNewTurn) {
      this.resource.players.forEach((p) => (p.status = 'ready_to_move'))
      this.resource.currentTurnIndex++
    }

    const player = this.resource.players.find((p) => p.uuid === playerUuid)
    if (!player) return

    player.moves.push({
      startTimestamp: new Date().toISOString(),
      endTimestamp: null,
      moveIndex: this.resource.currentMoveIndex + 1,
      turnIndex: this.resource.currentTurnIndex,
    })
    player.status = 'tracking'
  }

  private shouldStartNewTurn(): boolean {
    return this.resource.players.every((p) => p.status !== 'ready_to_move')
  }
}
