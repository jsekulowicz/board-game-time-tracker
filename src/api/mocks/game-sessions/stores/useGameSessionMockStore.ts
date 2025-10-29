import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from 'mocks/game-sessions/fixtures/gameSessionFixtures'
import { GameSession } from '../models/GameSession'
import type { ErrorResponse, GameSessionStatus } from '@/api/generated'

const NOT_FOUND_ERROR: ErrorResponse = {
  error: 'NOT_FOUND',
  message: 'Game session not found',
  statusCode: 404,
}

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessions = ref<GameSession[]>([])

    if (gameSessions.value.length === 0) {
      gameSessions.value = [new GameSession(getGameSessionFixture())]
    }

    function getSession(uuid: string): { session: GameSession } | { error: ErrorResponse } {
      const session = gameSessions.value.find((s) => s.data.uuid === uuid) as GameSession
      if (!session) {
        return { error: NOT_FOUND_ERROR }
      }

      return { session }
    }

    async function setGameSessionStatus(uuid: string, status: GameSessionStatus): Promise<GameSession | ErrorResponse> {
      const result = getSession(uuid)
      if ('error' in result) {
        return result.error
      }
      return result.session.setStatus(status)
    }

    async function switchPlayerMove(uuid: string, playerUuid: string): Promise<GameSession | ErrorResponse> {
      const result = getSession(uuid)
      if ('error' in result) {
        return result.error
      }
      return result.session.switchPlayerMove(playerUuid)
    }

    async function setGameSessionName(uuid: string, name: string): Promise<GameSession | ErrorResponse> {
      const result = getSession(uuid)
      if ('error' in result) {
        return result.error
      }
      return result.session.setName(name)
    }

    function getGameSessionPersistedMock(uuid: string): GameSession | ErrorResponse {
      const result = getSession(uuid)
      if ('error' in result) {
        return result.error
      }
      return result.session
    }

    return {
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
      pick: ['gameSessions'],
    },
  },
)
