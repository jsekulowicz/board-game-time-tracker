import { toRaw } from 'vue'
import type { GameSessionResource, GameSessionStatus, CommonUuid, ErrorResponse } from '@/api/generated'
import { gameSessionStatusAPI } from '../gameSessionStatus'
import { gameSessionPlayerMoveAPI } from '../gameSessionPlayerMove'

export class GameSession {
  private resource: GameSessionResource

  constructor(resource: GameSessionResource) {
    this.resource = structuredClone(toRaw(resource))
  }

  get data(): GameSessionResource {
    return structuredClone(this.resource)
  }

  setName(name: string): GameSession | ErrorResponse {
    if (!name || name.trim() === '') {
      return { error: 'INVALID_NAME', message: 'Name cannot be empty', statusCode: 400 }
    }

    this.resource.name = name
    return this
  }

  async setStatus(status: GameSessionStatus): Promise<GameSession | ErrorResponse> {
    try {
      this.resource = await gameSessionStatusAPI.setGameSessionStatus(this.resource, status)
      return this
    } catch (e: any) {
      return { error: 'SET_STATUS_FAILED', message: e?.message || 'Failed to set status', statusCode: 500 }
    }
  }

  async switchPlayerMove(playerUuid: CommonUuid): Promise<GameSession | ErrorResponse> {
    const playerExists = this.resource.players.some((p) => p.uuid === playerUuid)
    if (!playerExists) {
      return { error: 'PLAYER_NOT_FOUND', message: `Player ${playerUuid} not found`, statusCode: 404 }
    }

    try {
      this.resource = await gameSessionPlayerMoveAPI.switchPlayerMove(this.resource, playerUuid)
      return this
    } catch (e: any) {
      return { error: 'SWITCH_MOVE_FAILED', message: e?.message || 'Failed to switch move', statusCode: 500 }
    }
  }

  endPlayerMove(playerUuid: CommonUuid): GameSession | ErrorResponse {
    const playerIndex = this.resource.players.findIndex((p) => p.uuid === playerUuid)
    if (playerIndex === -1) {
      return { error: 'PLAYER_NOT_FOUND', message: `Player ${playerUuid} not found`, statusCode: 404 }
    }

    this.resource.players[playerIndex] = gameSessionPlayerMoveAPI.getPlayerWithLastMoveEnded(this.resource.players[playerIndex])
    return this
  }
}
