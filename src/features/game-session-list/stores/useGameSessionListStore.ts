import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GameSessionCreateBody, GameSessionResource } from '@/api/generated'
import { listGameSessions as apiListGameSessions, createGameSession as apiCreateGameSession } from '@/api/generated/sdk.gen'

export const useGameSessionListStore = defineStore('gameSessionList', () => {
  const gameSessions = ref<GameSessionResource[]>([])
  const loadingGameSessions = ref(true)

  async function getGameSessionList(): Promise<void> {
    const response = await apiListGameSessions()
    gameSessions.value = response.data?.items ?? []

    loadingGameSessions.value = false
  }

  async function createGameSession(body: GameSessionCreateBody): Promise<GameSessionResource | undefined> {
    const response = await apiCreateGameSession({ body })

    if (response.data) {
      return response.data
    }
  }

  return { getGameSessionList, createGameSession, gameSessions, loadingGameSessions }
})
