import { onMounted, onUnmounted, type ComputedRef } from 'vue'
import type { GameSessionPlayer } from '@/api/generated'
import { useGameSessionStore } from '../stores/useGameSessionStore'
import { usePlayerTimeTracking } from '../composables/usePlayerTimeTracking'
import { PLAYER_ORDINAL_NUMBER_TO_KEYBOARD_KEY } from '../consts/keyboardShortcuts'

export const useSwitchPlayerMove = (player: ComputedRef<GameSessionPlayer>) => {
  const gameSessionStore = useGameSessionStore()
  const switchPlayerKeyLabel = PLAYER_ORDINAL_NUMBER_TO_KEYBOARD_KEY[player.value.ordinalNumber]?.toUpperCase()

  const playerTimeTracking = usePlayerTimeTracking(player)

  onMounted(() => {
    document.addEventListener('keydown', keydownSwitchPlayerMove)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', keydownSwitchPlayerMove)
  })

  function keydownSwitchPlayerMove(event: KeyboardEvent) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.key !== PLAYER_ORDINAL_NUMBER_TO_KEYBOARD_KEY[player.value.ordinalNumber] ||
      playerTimeTracking.timeTrackingDisabled.value
    ) {
      return
    }

    switchPlayerMove()
  }

  function switchPlayerMove() {
    gameSessionStore.switchPlayerMove(player.value.id)
  }

  return { switchPlayerMove, switchPlayerKeyLabel }
}
