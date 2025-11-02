import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { GameSessionResource, GameSessionStatus } from '@/api/generated'
import {
  getGameSessionById as apiGetGameSessionById,
  patchGameSessionById as apiPatchGameSessionById,
  switchPlayerMove as apiSwitchPlayerMove,
} from '@/api/generated/sdk.gen'
import { toast } from 'vue-sonner'

export const useGameSessionStore = defineStore('gameSession', () => {
  const gameSession = ref<GameSessionResource | undefined>()
  const loadingGameSession = ref(true)

  const hasLastMoveInTurn = computed(() => gameSession.value?.players?.every((player) => player.status !== 'ready_to_move'))
  const isInProgress = computed(() => gameSession.value?.status === 'in_progress')

  async function getGameSessionById(uuid: string): Promise<void> {
    const response = await apiGetGameSessionById({ path: { uuid } })
    gameSession.value = response.data
    loadingGameSession.value = false
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

    switch (gameSession.value?.status) {
      case 'ended': {
        toast('Game session ended', { description: 'Tracking stopped. You will not be able to resume this game session.' })
        break
      }
      case 'in_progress': {
        toast('Game resumed', { description: 'Tracking resumed. Use Pause button to pause again.' })
        break
      }
      case 'paused': {
        toast('Game paused', { description: 'Tracking stopped. Use Resume button to resume tracking.' })
        break
      }
    }
  }

  async function switchPlayerMove(playerUuid: string): Promise<void> {
    if (!gameSession.value) {
      return
    }

    const response = await apiSwitchPlayerMove({
      path: { sessionUuid: gameSession.value.uuid },
      body: { playerUuid },
    })

    if (response.data) {
      gameSession.value = response.data
    }
  }

  return { getGameSessionById, setGameSessionStatus, switchPlayerMove, hasLastMoveInTurn, isInProgress, gameSession, loadingGameSession }
})
