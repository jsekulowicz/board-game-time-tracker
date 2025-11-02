import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GameSessionResource } from '@/api/generated'
import { listGameSessions as apiListGameSessions } from '@/api/generated/sdk.gen'

export const useGameSessionListStore = defineStore('gameSessionList', () => {
  const gameSessions = ref<GameSessionResource[]>([])
  const loadingGameSessions = ref(true)

  async function getGameSessionList(): Promise<void> {
    const response = await apiListGameSessions()
    gameSessions.value = response.data?.items ?? []

    loadingGameSessions.value = false
  }

  return { getGameSessionList, gameSessions, loadingGameSessions }
})
