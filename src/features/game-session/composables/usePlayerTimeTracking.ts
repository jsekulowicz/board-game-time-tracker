import { ref, computed, onUnmounted, watchEffect, type ComputedRef } from 'vue'
import type { GameSessionPlayer } from '@/api/generated'
import { useGameSessionStore } from '../stores/useGameSessionStore'
import { formatTime } from '@/helpers/time'

export const usePlayerTimeTracking = (gameSessionPlayer: ComputedRef<GameSessionPlayer>) => {
  const gameSessionStore = useGameSessionStore()

  const timer = ref(Date.now())
  const moves = computed(() => gameSessionPlayer.value.moves)
  const hiddenTimeBlink = ref(true)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const displayedTime = computed(() => {
    updateTimer()

    if (gameSessionStore.gameSession?.timeDisplayMode === 'hidden') {
      return hiddenTimeBlink.value ? '##:##:##' : '## ## ##'
    }

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

  watchEffect(() => {
    if (gameSessionStore.gameSession?.status === 'in_progress' && gameSessionPlayer.value.status === 'tracking') {
      startTimer()
    } else {
      stopTimer()
    }
  })

  function startTimer() {
    stopTimer()
    intervalId = setInterval(() => {
      updateTimer()
      hiddenTimeBlink.value = !hiddenTimeBlink.value
    }, 1000)
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
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
