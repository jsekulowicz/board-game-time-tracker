import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from '../fixtures/gameSessionFixtures'
import { gameSessionStatusAPI } from '../api/gameSessionStatus'
import { type GameSession } from '@/features/game-session/types'
import { waitForMs } from '@/helpers/concurrency.js'
import { gameSessionPlayerMoveAPI } from '../api/gameSessionPlayerMove'

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessionsMock = ref<GameSession[]>([])

    if (gameSessionsMock.value.length === 0) {
      gameSessionsMock.value = [getGameSessionFixture()]
    }

    async function getGameSessionPersistedMock(uuid: string): Promise<GameSession | undefined> {
      await waitForMs(100)
      return gameSessionsMock.value.find((session: GameSession) => session.uuid === uuid)
    }

    async function setGameSessionStatus(
      uuid: string,
      status: GameSession['status'],
    ): Promise<GameSession | void> {
      const gameSessionIndex = gameSessionsMock.value.findIndex((session) => session.uuid === uuid)
      const gameSession = gameSessionsMock.value[gameSessionIndex]

      if (!gameSession) {
        return
      }

      gameSessionsMock.value[gameSessionIndex] = await gameSessionStatusAPI.setGameSessionStatus(
        gameSession,
        status,
      )

      return gameSessionsMock.value[gameSessionIndex]
    }

    async function endPlayerMove(uuid: string, playerUuid: string): Promise<GameSession | void> {
      const gameSessionIndex = gameSessionsMock.value.findIndex((session) => session.uuid === uuid)
      const gameSession = gameSessionsMock.value[gameSessionIndex]

      if (!gameSession) {
        return
      }

      gameSessionsMock.value[gameSessionIndex] = await gameSessionPlayerMoveAPI.endPlayerMove(
        gameSession,
        playerUuid,
      )

      return gameSessionsMock.value[gameSessionIndex]
    }

    return { getGameSessionPersistedMock, setGameSessionStatus, endPlayerMove, gameSessionsMock }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['gameSessionsMock'],
    },
  },
)
