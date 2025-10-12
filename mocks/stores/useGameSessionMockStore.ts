import { ref, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { getGameSessionFixture } from '../fixtures/gameSessionFixtures'
import { GameSessionStatus, type GameSession } from '@/features/game-session/types'

export const useGameSessionMockStore = defineStore(
  'gameSessionMocks',
  () => {
    const gameSessionsMock = ref<GameSession[]>([])

    if (gameSessionsMock.value.length === 0) {
      gameSessionsMock.value = [getGameSessionFixture()]
    }

    function getGameSessionPersistedMock(uuid: string): GameSession | undefined {
      return gameSessionsMock.value.find((session: GameSession) => session.uuid === uuid)
    }

    async function setGameSessionStatus(
      uuid: string,
      status: GameSession['status'],
    ): Promise<GameSession | void> {
      const gameSessionIndex = gameSessionsMock.value.findIndex((session) => session.uuid === uuid)
      const gameSession = gameSessionsMock.value[gameSessionIndex]

      return new Promise<GameSession | void>((resolve) => {
        setTimeout(() => {
          if (!gameSession) {
            return
          }

          if (status === GameSessionStatus.IN_PROGRESS) {
            gameSessionsMock.value[gameSessionIndex] = getResumedGameSession(gameSession)
          } else if ([GameSessionStatus.PAUSED, GameSessionStatus.COMPLETED].includes(status)) {
            gameSessionsMock.value[gameSessionIndex] = {
              ...getStoppedGameSession(gameSession),
              status,
            }
          }

          resolve(gameSessionsMock.value[gameSessionIndex])
        }, 100)
      })
    }

    function getResumedGameSession(gameSession: GameSession): GameSession {
      const newGameSession = structuredClone(toRaw(gameSession))

      newGameSession?.players.forEach((player) => {
        const lastMove = player.moves[player.moves.length - 1]

        if (!lastMove) {
          return
        }

        if (lastMove?.turnIndex === gameSession.currentTurnIndex && lastMove.endTimestamp) {
          player.moves.push({
            moveIndex: lastMove.moveIndex,
            turnIndex: lastMove.turnIndex,
            startTimestamp: new Date().toISOString(),
            endTimestamp: null,
          })
        }
      })

      return { ...newGameSession, status: GameSessionStatus.IN_PROGRESS }
    }

    function getStoppedGameSession(gameSession: GameSession): GameSession {
      const newGameSession = structuredClone(toRaw(gameSession))

      newGameSession?.players.forEach((player) => {
        const lastMove = player.moves[player.moves.length - 1]

        if (lastMove && lastMove.endTimestamp === null) {
          lastMove.endTimestamp = new Date().toISOString()

          const lastMoveTotalTimeMs =
            new Date(lastMove.endTimestamp).getTime() - new Date(lastMove.startTimestamp).getTime()

          player.previousTotalTimeMs += lastMoveTotalTimeMs
        }
      })

      return newGameSession
    }

    return { getGameSessionPersistedMock, setGameSessionStatus, gameSessionsMock }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['gameSessionsMock'],
    },
  },
)
