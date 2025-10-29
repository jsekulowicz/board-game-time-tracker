import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from 'mocks/game-sessions/fixtures/gameSessionFixtures'
import { GameSession } from '../models/GameSession'
import type { ErrorResponse, GameSessionResource, GameSessionStatus } from '@/api/generated'

type GameSessionMethodReturnType = GameSessionResource | ErrorResponse

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessions = ref<GameSession[]>([])

    if (gameSessions.value.length === 0) {
      gameSessions.value = [new GameSession(getGameSessionFixture())]
    }

    function getSession(uuid: string): GameSession | ErrorResponse {
      const session = gameSessions.value.find((s) => s.data?.uuid === uuid) as GameSession
      if (!session) {
        return { error: 'GAME_SESSION_NOT_FOUND', message: `Could not find session ${uuid}`, statusCode: 404 }
      }
      return session
    }

    function setGameSessionStatus(uuid: string, status: GameSessionStatus): GameSessionMethodReturnType {
      const result = getSession(uuid)
      if ('error' in result) {
        return result
      }

      return result.setStatus(status)
    }

    function switchPlayerMove(uuid: string, playerUuid: string): GameSessionMethodReturnType {
      const result = getSession(uuid)
      if ('error' in result) {
        return result
      }
      return result.switchPlayerMove(playerUuid)
    }

    function setGameSessionName(uuid: string, name: string): GameSessionMethodReturnType {
      const result = getSession(uuid)
      if ('error' in result) {
        return result
      }
      return result.setName(name)
    }

    function getGameSessionPersistedMock(uuid: string): GameSessionMethodReturnType {
      const result = getSession(uuid)
      if ('error' in result) {
        return result
      }
      return result.data
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
