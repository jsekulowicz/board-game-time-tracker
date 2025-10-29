import { toRaw } from 'vue'
import type { GameSessionResource, GameSessionStatus, CommonUuid, ErrorResponse } from '@/api/generated'
import { gameSessionStatusAPI } from '../gameSessionStatus'
import { gameSessionPlayerMoveAPI } from '../gameSessionPlayerMove'
import { deepFreeze } from '@/object-utils'

export class GameSession {
  private resource: GameSessionResource

  constructor(resource: GameSessionResource) {
    this.resource = structuredClone(toRaw(resource))
  }

  get data(): GameSessionResource {
    return deepFreeze(this.resource)
  }

  setName(name: string): GameSession | ErrorResponse {
    if (!name || name.trim() === '') {
      return { error: 'INVALID_NAME', message: 'Name cannot be empty', statusCode: 400 }
    }

    this.resource.name = name
    return this
  }

  async setStatus(status: GameSessionStatus): Promise<GameSession | ErrorResponse> {
    const { resource, error } = await gameSessionStatusAPI.setGameSessionStatus(this.resource, status)
    if (error) {
      return error
    }

    this.resource = resource
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
