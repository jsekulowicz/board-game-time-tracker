import { ref, computed, onUnmounted, watch, type ComputedRef } from 'vue'
import type { GameSessionPlayer } from '@/api/generated'
import { useGameSessionStore } from '../stores/useGameSessionStore'
import { formatTime } from '@/helpers/time'

export const usePlayerTimeTracking = (gameSessionPlayer: ComputedRef<GameSessionPlayer>) => {
  const gameSessionStore = useGameSessionStore()

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

  const timeTrackingDisabled = computed(() => {
    return (
      !gameSessionStore.isTrackingPossible || (gameSessionPlayer.value.status !== 'ready_to_move' && !gameSessionStore.hasLastMoveInTurn)
    )
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
    timeTrackingDisabled,
  }
}
