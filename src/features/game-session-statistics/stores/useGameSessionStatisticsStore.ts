import { computed } from 'vue'
import { defineStore } from 'pinia'

import { type MoveStatisticsEntry } from '../types'
import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'

export const useGameSessionStatisticsStore = defineStore('gameSessionStatistics', () => {
  const gameSessionStore = useGameSessionStore()

  // TODO: move the logic to "backend", behind a separate endpoint handler, separate moves history from the Game Session Resource
  const moveDurationChartData = computed<MoveStatisticsEntry[]>(() => {
    if (gameSessionStore.gameSession?.status !== 'ended') {
      return []
    }

    const items = []

    for (let turnIndex = 0; turnIndex <= gameSessionStore.gameSession.currentTurnIndex; turnIndex++) {
      const durationForEachPlayer: { [key: string]: number } = {}

      gameSessionStore.gameSession.players.forEach((p) => {
        const duration = p.moves.find((m) => m.turnIndex === turnIndex)?.duration ?? 0
        durationForEachPlayer[p.name] = Math.floor(duration / 1000)
      })

      items.push({
        turnOrdinalNumber: turnIndex + 1,
        ...durationForEachPlayer,
      })
    }

    return items
  })

  return {
    moveDurationChartData,
  }
})
