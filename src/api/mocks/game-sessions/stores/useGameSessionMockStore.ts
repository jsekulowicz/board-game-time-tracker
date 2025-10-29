import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from 'mocks/game-sessions/fixtures/gameSessionFixtures'
import { GameSession } from '../models/GameSession'
import type { ErrorResponse, GameSessionResource, GameSessionStatus } from '@/api/generated'

type GameSessionMethodReturnType = GameSessionResource | ErrorResponse

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessionResources = ref<GameSessionResource[]>([])
    const gameSessions = ref<GameSession[]>([])

    if (gameSessionResources.value.length === 0) {
      gameSessions.value = [new GameSession(getGameSessionFixture())]
    }

    gameSessionResources.value.map((gsr) => new GameSession(gsr))

    function getSession(uuid: string): GameSession | ErrorResponse {
      const session = gameSessions.value.find((s) => s.data?.uuid === uuid) as GameSession
      if (!session) {
        return { error: 'GAME_SESSION_NOT_FOUND', message: `Could not find session ${uuid}`, statusCode: 404 }
      }
      return session
    }

    function setGameSessionStatus(uuid: string, status: GameSessionStatus): GameSessionMethodReturnType {
      const resultGet = getSession(uuid)
      if ('error' in resultGet) {
        return resultGet
      }

      const resultUpdate = resultGet.setStatus(status)
      updatePersistedResource(uuid, resultUpdate)

      return resultUpdate
    }

    function switchPlayerMove(uuid: string, playerUuid: string): GameSessionMethodReturnType {
      const resultGet = getSession(uuid)
      if ('error' in resultGet) {
        return resultGet
      }

      const resultUpdate = resultGet.switchPlayerMove(playerUuid)
      updatePersistedResource(uuid, resultUpdate)

      return resultUpdate
    }

    function setGameSessionName(uuid: string, name: string): GameSessionMethodReturnType {
      const resultGet = getSession(uuid)
      if ('error' in resultGet) {
        return resultGet
      }

      const resultUpdate = resultGet.setName(name)
      updatePersistedResource(uuid, resultUpdate)

      return resultUpdate
    }

    function getGameSessionPersistedMock(uuid: string): GameSessionMethodReturnType {
      const result = getSession(uuid)
      if ('error' in result) {
        return result
      }

      return result.data
    }

    function updatePersistedResource(uuid: GameSessionResource['uuid'], resultUpdate: GameSessionMethodReturnType) {
      if ('error' in resultUpdate) {
        return
      }

      const resourceIndex = gameSessionResources.value.findIndex((resource) => resource.uuid === uuid)
      gameSessionResources.value[resourceIndex] = resultUpdate
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
      pick: ['gameSessionResources'],
    },
  },
)
