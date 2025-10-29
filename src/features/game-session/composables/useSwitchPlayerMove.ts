import { onMounted, onUnmounted } from 'vue'
import type { GameSessionPlayer } from '@/api/generated'
import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'
import { PLAYER_INDEX_TO_KEYBOARD_KEY } from '@/features/game-session/consts/keyboardShortcuts'

export const useSwitchPlayerMove = (player: GameSessionPlayer) => {
  const gameSessionStore = useGameSessionStore()
  const switchPlayerKeyLabel = PLAYER_INDEX_TO_KEYBOARD_KEY[player.turnOrderIndex]?.toUpperCase()

  onMounted(() => {
    document.addEventListener('keydown', keydownSwitchPlayerMove)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', keydownSwitchPlayerMove)
  })

  function keydownSwitchPlayerMove(event: KeyboardEvent) {
    if (event.key !== PLAYER_INDEX_TO_KEYBOARD_KEY[player.turnOrderIndex]) {
      return
    }

    switchPlayerMove()
  }

  function switchPlayerMove() {
    const nextMovePlayerUuid = gameSessionStore.gameSession?.players[player.turnOrderIndex]?.uuid
    if (nextMovePlayerUuid) {
      gameSessionStore.switchPlayerMove(nextMovePlayerUuid)
    }
  }

  return { switchPlayerMove, switchPlayerKeyLabel }
}
