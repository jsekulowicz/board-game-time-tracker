import { defineStore } from 'pinia'
import type { GameSessionResource, GameSessionStatus } from '@/api/generated'
import { ref } from 'vue'
import {
  getGameSessionById as apiGetGameSessionById,
  patchGameSessionById as apiPatchGameSessionById,
  endPlayerMove as apiEndPlayerMove,
  switchPlayerMove as apiSwitchPlayerMove,
} from '@/api/generated/sdk.gen'

export const useGameSessionStore = defineStore('gameSession', () => {
  const gameSession = ref<GameSessionResource | undefined>()

  async function getGameSessionById(uuid: string): Promise<void> {
    const response = await apiGetGameSessionById({ path: { uuid } })
    gameSession.value = response.data
  }

  async function setGameSessionStatus(status: GameSessionStatus): Promise<void> {
    if (!gameSession.value) {
      return
    }

    const response = await apiPatchGameSessionById({
      path: { uuid: gameSession.value.uuid },
      body: { status },
    })

    gameSession.value = response.data
  }

  async function endPlayerMove(playerUuid: string): Promise<void> {
    if (!gameSession.value) {
      return
    }

    const response = await apiEndPlayerMove({
      path: { sessionUuid: gameSession.value.uuid },
      body: { playerUuid },
    })

    gameSession.value = response.data
  }

  async function switchPlayerMove(playerUuid: string): Promise<void> {
    if (!gameSession.value) {
      return
    }

    const response = await apiSwitchPlayerMove({
      path: { sessionUuid: gameSession.value.uuid },
      body: { playerUuid },
    })

    gameSession.value = response.data
  }

  return { getGameSessionById, setGameSessionStatus, endPlayerMove, switchPlayerMove, gameSession }
})
