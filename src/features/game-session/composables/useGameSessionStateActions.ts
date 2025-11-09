import { computed } from 'vue'
import { useGameSessionStore } from '../stores/useGameSessionStore'

export const useGameSessionStateActions = () => {
  const gameSessionStore = useGameSessionStore()

  const canResume = computed(() => gameSessionStore.gameSession?.status === 'paused')
  const canPause = computed(() => gameSessionStore.gameSession?.status === 'in_progress')
  const canComplete = computed(() => gameSessionStore.gameSession?.status !== 'ended')
  const needsToStartTracking = computed(() => gameSessionStore.gameSession?.status === 'ready_to_track')
  const isTrackedTimeVisible = computed(() => gameSessionStore.gameSession?.timeDisplayMode === 'visible')

  function toggleTimeVisibility() {
    if (isTrackedTimeVisible.value) {
      gameSessionStore.setGameSessionTimeDisplayMode('hidden')
    } else {
      gameSessionStore.setGameSessionTimeDisplayMode('visible')
    }
  }

  function toggleGameSessionPlayPause() {
    if (canPause.value) {
      gameSessionStore.setGameSessionStatus('paused')
    } else if (canResume.value) {
      gameSessionStore.setGameSessionStatus('in_progress')
    }
  }

  function endGameSession() {
    if (canComplete.value) {
      gameSessionStore.setGameSessionStatus('ended')
    }
  }

  return {
    canResume,
    canPause,
    canComplete,
    needsToStartTracking,
    isTrackedTimeVisible,
    toggleTimeVisibility,
    toggleGameSessionPlayPause,
    endGameSession,
  }
}
