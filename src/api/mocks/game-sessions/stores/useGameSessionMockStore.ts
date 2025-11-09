import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from 'mocks/game-sessions/fixtures/gameSessionFixtures'
import { GameSession } from '../models/GameSession'
import type {
  ErrorResponse,
  GameSessionCreateBody,
  GameSessionPlayer,
  GameSessionResource,
  GameSessionStatus,
  GameSessionTimeDisplayMode,
} from '@/api/generated'
import { GAME_SESSION_NOT_FOUND } from '../errors'

type GameSessionMethodReturnType = GameSessionResource | ErrorResponse

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessionResources = ref<GameSessionResource[]>([])

    if (gameSessionResources.value.length === 0) {
      gameSessionResources.value = [getGameSessionFixture()]
    }

    const gameSessions = computed(() => gameSessionResources.value.map((res) => new GameSession(res)))

    function getSession(id: string): GameSession | ErrorResponse {
      const resource = gameSessionResources.value.find((r) => r.id === id)
      if (!resource) {
        return GAME_SESSION_NOT_FOUND
      }

      return new GameSession(resource)
    }

    function addGameSessionPersistedMock(body: GameSessionCreateBody): GameSessionMethodReturnType {
      const { name, game, players } = body
      const newGameSessionResource: GameSessionResource = {
        id: crypto.randomUUID(),
        status: 'ready_to_track',
        currentTurnIndex: 0,
        currentMoveIndex: 0,
        createdAt: new Date().toISOString(),
        name,
        game,
        timeDisplayMode: 'visible',
        players: players.map(
          (playerName, index) =>
            ({
              id: crypto.randomUUID(),
              name: playerName,
              status: 'ready_to_move',
              moves: [],
              previousTotalTimeMs: 5000,
              ordinalNumber: index + 1,
            }) as GameSessionPlayer,
        ),
      }

      gameSessionResources.value = [...gameSessionResources.value, newGameSessionResource]

      return newGameSessionResource
    }

    function setGameSessionTimeDisplayMode(id: string, timeDisplayMode: GameSessionTimeDisplayMode): GameSessionMethodReturnType {
      const session = getSession(id)
      if ('error' in session) {
        return session
      }

      const updated = session.setTimeDisplayMode(timeDisplayMode)
      updatePersistedResource(id, updated)
      return updated
    }

    function setGameSessionStatus(id: string, status: GameSessionStatus): GameSessionMethodReturnType {
      const session = getSession(id)
      if ('error' in session) {
        return session
      }

      const updated = session.setStatus(status)
      updatePersistedResource(id, updated)
      return updated
    }

    function switchPlayerMove(id: string, playerUuid: string): GameSessionMethodReturnType {
      const session = getSession(id)
      if ('error' in session) {
        return session
      }

      const updated = session.switchPlayerMove(playerUuid)
      updatePersistedResource(id, updated)
      return updated
    }

    function setGameSessionName(id: string, name: string): GameSessionMethodReturnType {
      const session = getSession(id)
      if ('error' in session) {
        return session
      }

      const updated = session.setName(name)
      updatePersistedResource(id, updated)
      return updated
    }

    function getGameSessionListPersistedMock(): GameSessionResource[] {
      return gameSessionResources.value
    }

    function getGameSessionPersistedMock(id: string): GameSessionMethodReturnType {
      const resource = gameSessionResources.value.find((r) => r.id === id)
      if (!resource) {
        return GAME_SESSION_NOT_FOUND
      }

      return resource
    }

    function updatePersistedResource(id: string, updated: GameSessionMethodReturnType) {
      if ('error' in updated) {
        return
      }

      const index = gameSessionResources.value.findIndex((r) => r.id === id)
      if (index >= 0) {
        gameSessionResources.value[index] = { ...updated, updatedAt: new Date().toISOString() }
      }
    }

    return {
      gameSessionResources,
      gameSessions,
      addGameSessionPersistedMock,
      getGameSessionListPersistedMock,
      getGameSessionPersistedMock,
      setGameSessionTimeDisplayMode,
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
