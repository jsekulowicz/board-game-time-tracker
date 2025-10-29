import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from 'mocks/game-sessions/fixtures/gameSessionFixtures'
import { GameSession } from '../models/GameSession'
import type { ErrorResponse, GameSessionStatus } from '@/api/generated'

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessions = ref<GameSession[]>([])

    if (gameSessions.value.length === 0) {
      gameSessions.value = [new GameSession(getGameSessionFixture())]
    }

    function findSession(uuid: string): GameSession | undefined {
      return gameSessions.value.find((session) => session.data.uuid === uuid)
    }

    async function setGameSessionStatus(uuid: string, status: GameSessionStatus): Promise<GameSession | ErrorResponse> {
      const session = findSession(uuid)
      if (!session) {
        return { error: 'NOT_FOUND', message: 'Game session not found', statusCode: 404 }
      }

      return session.setStatus(status)
    }

    async function switchPlayerMove(uuid: string, playerUuid: string): Promise<GameSession | ErrorResponse> {
      const session = findSession(uuid)
      if (!session) {
        return { error: 'NOT_FOUND', message: 'Game session not found', statusCode: 404 }
      }

      return session.switchPlayerMove(playerUuid)
    }

    async function setGameSessionName(uuid: string, name: string): Promise<GameSession | ErrorResponse> {
      const session = findSession(uuid)
      if (!session) {
        return { error: 'NOT_FOUND', message: 'Game session not found', statusCode: 404 }
      }

      return session.setName(name)
    }

    function getGameSessionPersistedMock(uuid: string): GameSession | undefined {
      return findSession(uuid)
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
