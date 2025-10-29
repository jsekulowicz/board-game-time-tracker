import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from 'mocks/game-sessions/fixtures/gameSessionFixtures'
import { GameSession } from '../models/GameSession'
import type { ErrorResponse, GameSessionResource, GameSessionStatus } from '@/api/generated'
import { GAME_SESSION_ERROR_CODES } from '../errors'

type GameSessionMethodReturnType = GameSessionResource | ErrorResponse

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessionResources = ref<GameSessionResource[]>([])

    if (gameSessionResources.value.length === 0) {
      gameSessionResources.value = [getGameSessionFixture()]
    }

    const gameSessions = computed(() => gameSessionResources.value.map((res) => new GameSession(res)))

    const NOT_FOUND_ERROR: ErrorResponse = {
      error: GAME_SESSION_ERROR_CODES.GAME_SESSION_NOT_FOUND,
      message: 'Could not find game session',
      statusCode: 404,
    }

    function getSession(uuid: string): GameSession | ErrorResponse {
      const resource = gameSessionResources.value.find((r) => r.uuid === uuid)
      if (!resource) {
        return NOT_FOUND_ERROR
      }

      return new GameSession(resource)
    }

    function updatePersistedResource(uuid: string, updated: GameSessionMethodReturnType) {
      if ('error' in updated) {
        return
      }

      const index = gameSessionResources.value.findIndex((r) => r.uuid === uuid)
      if (index >= 0) {
        gameSessionResources.value[index] = updated
      }
    }

    function setGameSessionStatus(uuid: string, status: GameSessionStatus): GameSessionMethodReturnType {
      const session = getSession(uuid)
      if ('error' in session) {
        return session
      }

      const updated = session.setStatus(status)
      updatePersistedResource(uuid, updated)
      return updated
    }

    function switchPlayerMove(uuid: string, playerUuid: string): GameSessionMethodReturnType {
      const session = getSession(uuid)
      if ('error' in session) {
        return session
      }

      const updated = session.switchPlayerMove(playerUuid)
      updatePersistedResource(uuid, updated)
      return updated
    }

    function setGameSessionName(uuid: string, name: string): GameSessionMethodReturnType {
      const session = getSession(uuid)
      if ('error' in session) {
        return session
      }

      const updated = session.setName(name)
      updatePersistedResource(uuid, updated)
      return updated
    }

    function getGameSessionPersistedMock(uuid: string): GameSessionMethodReturnType {
      const resource = gameSessionResources.value.find((r) => r.uuid === uuid)
      if (!resource) {
        return NOT_FOUND_ERROR
      }

      return resource
    }

    return {
      gameSessionResources,
      gameSessions,
      getGameSessionPersistedMock,
      setGameSessionStatus,
      setGameSessionName,
      switchPlayerMove,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['gameSessionResources'],
    },
  },
)
