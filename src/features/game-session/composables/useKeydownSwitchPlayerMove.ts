import { onMounted, onUnmounted } from 'vue'
import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'

export const useKeydownSwitchPlayerMove = () => {
  const gameSessionStore = useGameSessionStore()

  onMounted(() => {
    document.addEventListener('keydown', keydownSwitchPlayerMove)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', keydownSwitchPlayerMove)
  })

  function keydownSwitchPlayerMove(event: KeyboardEvent) {
    if (!/^[1-8]$/.test(event.key) || !event.ctrlKey) {
      return
    }

    const nextMovePlayerUuid = gameSessionStore.gameSession?.players[Number(event.key) - 1]?.uuid
    if (nextMovePlayerUuid) {
      gameSessionStore.switchPlayerMove(nextMovePlayerUuid)
    }
  }

  return { keydownSwitchPlayerMove }
}
