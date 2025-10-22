import { computed } from 'vue'
import { useGameSessionStore } from '../stores/useGameSessionStore'

export const useGameSessionActions = () => {
  const gameSessionStore = useGameSessionStore()

  const canResume = computed(() => gameSessionStore.gameSession?.status === 'paused')
  const canPause = computed(() => gameSessionStore.gameSession?.status === 'in_progress')
  const canComplete = computed(() => gameSessionStore.gameSession?.status !== 'completed')

  function toggleGameSessionPlayPause() {
    if (canPause.value) {
      gameSessionStore.setGameSessionStatus('paused')
    } else if (canResume.value) {
      gameSessionStore.setGameSessionStatus('in_progress')
    }
  }

  function completeGameSession() {
    if (canComplete.value) {
      gameSessionStore.setGameSessionStatus('completed')
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
