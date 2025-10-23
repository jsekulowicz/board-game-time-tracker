import { computed } from 'vue'
import { useGameSessionStore } from '../stores/useGameSessionStore'

export const useGameSessionActions = () => {
  const gameSessionStore = useGameSessionStore()

  const canResume = computed(() => gameSessionStore.gameSession?.status === 'paused')
  const canPause = computed(() => gameSessionStore.gameSession?.status === 'in_progress')
  const canComplete = computed(() => gameSessionStore.gameSession?.status !== 'completed')
  const canEndMoveAndSwitchToNextPlayer = computed(
    () => gameSessionStore.gameSession?.status === 'in_progress',
  )

  const currentlyMovingPlayer = computed(() => {
    const players = gameSessionStore.gameSession?.players
    return players?.find((p) => p.moves[p.moves.length - 1]?.endTimestamp === null)
  })

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

  function endMoveAndSwitchToNextPlayer() {
    if (currentlyMovingPlayer.value && canEndMoveAndSwitchToNextPlayer.value) {
      gameSessionStore.endPlayerMove(currentlyMovingPlayer.value.uuid)
    }
  }

  return {
    canResume,
    canPause,
    canComplete,
    canEndMoveAndSwitchToNextPlayer,
    toggleGameSessionPlayPause,
    completeGameSession,
    endMoveAndSwitchToNextPlayer,
  }
}
