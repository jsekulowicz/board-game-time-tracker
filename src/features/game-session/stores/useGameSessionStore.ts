import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { GameSessionResource, GameSessionStatus, GameSessionTimeDisplayMode } from '@/api/generated'
import {
  getGameSessionById as apiGetGameSessionById,
  patchGameSessionById as apiPatchGameSessionById,
  switchPlayerMove as apiSwitchPlayerMove,
} from '@/api/generated/sdk.gen'
import '@jsekulowicz/ds-components/toast/define'
import { toast } from '@jsekulowicz/ds-components/toast'

export const useGameSessionStore = defineStore('gameSession', () => {
  const gameSession = ref<GameSessionResource | undefined>()
  const loadingGameSession = ref(true)

  const hasLastMoveInTurn = computed(() => gameSession.value?.players?.every((player) => player.status !== 'ready_to_move'))
  const isTrackingPossible = computed(
    () => gameSession.value?.status && ['ready_to_track', 'in_progress'].includes(gameSession.value.status),
  )

  async function getGameSessionById(id: string): Promise<void> {
    loadingGameSession.value = true

    const response = await apiGetGameSessionById({ path: { id } })
    gameSession.value = response.data
    loadingGameSession.value = false
  }

  async function setGameSessionTimeDisplayMode(timeDisplayMode: GameSessionTimeDisplayMode): Promise<void> {
    if (!gameSession.value) {
      return
    }

    const response = await apiPatchGameSessionById({
      path: { id: gameSession.value.id },
      body: { timeDisplayMode },
    })

    if (response.error) {
      return
    }

    gameSession.value = response.data
  }

  async function setGameSessionStatus(status: GameSessionStatus): Promise<void> {
    if (!gameSession.value) {
      return
    }

    const response = await apiPatchGameSessionById({
      path: { id: gameSession.value.id },
      body: { status },
    })

    if (response.error) {
      return
    }

    gameSession.value = response.data

    switch (gameSession.value?.status) {
      case 'ended': {
        toast.warning('Game session ended', { body: 'Tracking stopped. You will not be able to resume this game session.' })
        break
      }
    }
  }

  async function switchPlayerMove(playerUuid: string): Promise<void> {
    if (!gameSession.value) {
      return
    }

    const response = await apiSwitchPlayerMove({
      path: { sessionUuid: gameSession.value.id },
      body: { playerUuid },
    })

    if (response.data) {
      gameSession.value = response.data
    }
  }

  return {
    getGameSessionById,
    setGameSessionTimeDisplayMode,
    setGameSessionStatus,
    switchPlayerMove,
    hasLastMoveInTurn,
    isTrackingPossible,
    gameSession,
    loadingGameSession,
  }
})
