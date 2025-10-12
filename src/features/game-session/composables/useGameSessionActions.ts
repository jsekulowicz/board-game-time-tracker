import { computed } from 'vue'
import { useGameSessionStore } from '../stores/useGameSessionStore'
import { GameSessionStatus } from '../types'

export const useGameSessionActions = () => {
  const gameSessionStore = useGameSessionStore()

  const canResume = computed(
    () => gameSessionStore.gameSession?.status === GameSessionStatus.PAUSED,
  )
  const canPause = computed(
    () => gameSessionStore.gameSession?.status === GameSessionStatus.IN_PROGRESS,
  )
  const canComplete = computed(() => {
    return gameSessionStore.gameSession?.status !== GameSessionStatus.COMPLETED
  })

  function toggleGameSessionPlayPause() {
    if (canPause.value) {
      gameSessionStore.setGameSessionStatus(GameSessionStatus.PAUSED)
    } else if (canResume.value) {
      gameSessionStore.setGameSessionStatus(GameSessionStatus.IN_PROGRESS)
    }
  }

  function completeGameSession() {
    if (canComplete.value) {
      gameSessionStore.setGameSessionStatus(GameSessionStatus.COMPLETED)
    }
  }

  return {
    canResume,
    canPause,
    canComplete,
    toggleGameSessionPlayPause,
    completeGameSession,
  }
}
