import type { GameSessionPlayer } from '@/features/game-session/types'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formatTime } from '../utils'

export const usePlayerTimeTracking = (gameSessionPlayer: GameSessionPlayer) => {
  const timer = ref(Date.now())
  let intervalId: ReturnType<typeof setInterval> | null = null

  const displayedTime = computed(() => {
    const currentMove = gameSessionPlayer.moves?.find((move) => move.endTimestamp === null)
    const currentMoveTimeMs = currentMove
      ? timer.value - new Date(currentMove.startTimestamp).getTime()
      : 0
    const totalTimeMs = gameSessionPlayer.previousTotalTimeMs + currentMoveTimeMs

    return formatTime(totalTimeMs)
  })

  onMounted(() => {
    intervalId = setInterval(updateTimer, 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  function updateTimer() {
    timer.value = Date.now()
  }

  return {
    displayedTime,
  }
}
