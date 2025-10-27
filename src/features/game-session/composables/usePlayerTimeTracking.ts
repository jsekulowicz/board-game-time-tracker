import type { GameSessionPlayer } from '@/api/generated'
import { ref, computed, onUnmounted, watch, type ComputedRef } from 'vue'
import { formatTime } from '../utils'

export const usePlayerTimeTracking = (gameSessionPlayer: ComputedRef<GameSessionPlayer>) => {
  const timer = ref(Date.now())
  const moves = computed(() => gameSessionPlayer.value.moves)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const displayedTime = computed(() => {
    updateTimer()

    const currentMove = moves.value[moves.value.length - 1]
    const currentMoveTimeMs = currentMove?.endTimestamp === null ? timer.value - new Date(currentMove.startTimestamp).getTime() : 0
    const totalTimeMs = gameSessionPlayer.value.previousTotalTimeMs + currentMoveTimeMs

    return formatTime(totalTimeMs)
  })

  onUnmounted(stopTimer)

  watch(
    () => gameSessionPlayer.value.status,
    (newValue) => {
      if (newValue === 'tracking') {
        startTimer()
      } else {
        stopTimer()
      }
    },
    { immediate: true },
  )

  function startTimer() {
    intervalId = setInterval(updateTimer, 1000)
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }

  function updateTimer() {
    timer.value = Date.now()
  }

  return {
    displayedTime,
  }
}
