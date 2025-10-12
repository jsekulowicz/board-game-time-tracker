import { defineStore } from 'pinia'
import { GameSessionStatus, type GameSession } from '@/features/game-session/types'
import { useGameSessionMockStore } from '../../../../mocks/stores/useGameSessionMockStore'
import { ref } from 'vue'

export const useGameSessionStore = defineStore('gameSession', () => {
  const gameSessionsMockStore = useGameSessionMockStore()
  const gameSession = ref<GameSession | undefined>()

  async function fetchGameSession(uuid: string): Promise<void> {
    const apiCall = new Promise<GameSession | undefined>((resolve) => {
      setTimeout(() => {
        resolve(gameSessionsMockStore.getGameSessionPersistedMock(uuid))
      }, 200)
    })
    gameSession.value = await apiCall
  }

  async function setGameSessionStatus(status: GameSessionStatus): Promise<void> {
    const response = await gameSessionsMockStore.setGameSessionStatus(
      gameSession.value!.uuid,
      status,
    )

    if (response) {
      gameSession.value = response
    }
  }

  return { fetchGameSession, setGameSessionStatus, gameSession }
})
