import { computed } from 'vue'
import { useGameSessionStore } from '../stores/useGameSessionStore'

export const useGameSessionState = () => {
  const gameSessionStore = useGameSessionStore()
  const hasLastMoveInTurn = computed(() => gameSessionStore.gameSession?.players?.every((player) => player.status !== 'ready_to_move'))

  return {
    hasLastMoveInTurn,
  }
}
