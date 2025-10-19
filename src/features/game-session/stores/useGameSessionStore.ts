import { defineStore } from 'pinia'
import { GameSessionStatus, type GameSession } from '@/features/game-session/types'
import { useGameSessionMockStore } from '@/api/mocks/stores/useGameSessionMockStore'
import { ref } from 'vue'

export const useGameSessionStore = defineStore('gameSession', () => {
  const gameSessionsMockStore = useGameSessionMockStore()
  const gameSession = ref<GameSession | undefined>()

  async function fetchGameSession(uuid: string): Promise<void> {
    gameSession.value = await gameSessionsMockStore.getGameSessionPersistedMock(uuid)
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

  async function endPlayerMove(playerUuid: string): Promise<void> {
    const response = await gameSessionsMockStore.endPlayerMove(gameSession.value!.uuid, playerUuid)

    if (response) {
      gameSession.value = response
    }
  }

  return { fetchGameSession, setGameSessionStatus, endPlayerMove, gameSession }
})
