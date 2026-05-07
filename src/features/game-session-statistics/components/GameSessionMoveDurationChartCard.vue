<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import '@jsekulowicz/ds-components/bar-chart/define'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

import DsCard from '@/components/ds/DsCard.vue'

import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'

const gameSessionStore = useGameSessionStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual('lg')

type ChartRow = Record<string, unknown> & { turn: string }

const chartRef = ref<(HTMLElement & { data?: unknown; series?: unknown; formatValue?: unknown }) | null>(null)

const players = computed(() => gameSessionStore.gameSession?.players ?? [])

const chartData = computed<ChartRow[]>(() => {
  if (gameSessionStore.gameSession?.status !== 'ended') {
    return []
  }
  const rows: ChartRow[] = []
  const turnsCount = gameSessionStore.gameSession.currentTurnIndex + 1
  for (let t = 0; t < turnsCount; t++) {
    const row: ChartRow = { turn: `${t + 1}` }
    for (const p of gameSessionStore.gameSession.players) {
      const duration = p.moves.find((m) => m.turnIndex === t)?.duration ?? 0
      row[p.id] = Math.floor(duration / 1000)
    }
    rows.push(row)
  }
  return rows
})

const chartSeries = computed(() =>
  players.value.map((p) => ({ key: p.id, label: p.name, color: p.color })),
)

function totalSeconds(playerIndex: number): number {
  const player = players.value[playerIndex]
  if (!player) return 0
  return Math.floor(
    player.moves.reduce((sum, m) => sum + (m.duration ?? 0), 0) / 1000,
  )
}

function averageSeconds(playerIndex: number): number {
  const player = players.value[playerIndex]
  if (!player || player.moves.length === 0) return 0
  return Math.round(totalSeconds(playerIndex) / player.moves.length)
}

const sessionTotalSeconds = computed(() =>
  players.value.reduce(
    (sum, _, i) => sum + totalSeconds(i),
    0,
  ),
)

const sessionMoveCount = computed(() =>
  players.value.reduce((sum, p) => sum + p.moves.length, 0),
)

const sessionAvgMoveSeconds = computed(() => {
  if (sessionMoveCount.value === 0) return 0
  return Math.round(sessionTotalSeconds.value / sessionMoveCount.value)
})

const longestMoveSeconds = computed(() => {
  let max = 0
  for (const p of players.value) {
    for (const m of p.moves) {
      const s = Math.floor((m.duration ?? 0) / 1000)
      if (s > max) max = s
    }
  }
  return max
})

const longestMovePlayer = computed(() => {
  for (const p of players.value) {
    for (const m of p.moves) {
      if (Math.floor((m.duration ?? 0) / 1000) === longestMoveSeconds.value && longestMoveSeconds.value > 0) {
        return p.name
      }
    }
  }
  return ''
})

const turnsCount = computed(() => {
  if (gameSessionStore.gameSession?.status !== 'ended') return 0
  return gameSessionStore.gameSession.currentTurnIndex + 1
})

function formatDuration(seconds: number): string {
  if (seconds <= 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  if (s === 0) return `${m}m`
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

function syncChart() {
  if (!chartRef.value) return
  chartRef.value.data = chartData.value
  chartRef.value.series = chartSeries.value
  chartRef.value.formatValue = (v: number) => formatDuration(v)
}

onMounted(syncChart)
watch([chartData, chartSeries], syncChart)
</script>

<template>
  <div v-if="players.length" class="stats">
    <div class="stat-summary">
      <div class="stat-card">
        <p class="stat-card__label">Total time</p>
        <p class="stat-card__value">{{ formatDuration(sessionTotalSeconds) }}</p>
        <p class="stat-card__sub">across {{ turnsCount }} turn{{ turnsCount === 1 ? '' : 's' }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-card__label">Average move</p>
        <p class="stat-card__value">{{ formatDuration(sessionAvgMoveSeconds) }}</p>
        <p class="stat-card__sub">{{ sessionMoveCount }} moves total</p>
      </div>
      <div class="stat-card">
        <p class="stat-card__label">Longest move</p>
        <p class="stat-card__value">{{ formatDuration(longestMoveSeconds) }}</p>
        <p class="stat-card__sub">{{ longestMovePlayer }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-card__label">Turns</p>
        <p class="stat-card__value">{{ turnsCount }}</p>
        <p class="stat-card__sub">complete turn{{ turnsCount === 1 ? '' : 's' }}</p>
      </div>
    </div>

    <div class="split">
      <DsCard elevation="sm">
        <span slot="title">Move duration</span>
        <ds-bar-chart
          ref="chartRef"
          domain="turn"
          x-axis-label="Turn"
          y-axis-label="Seconds"
          :height="isDesktop ? 300 : 240"
          :stacked="!isDesktop"
        ></ds-bar-chart>
      </DsCard>

      <DsCard elevation="sm">
        <span slot="title">Players</span>
        <ol class="player-summary">
          <li v-for="(player, index) in players" :key="player.id">
            <span class="player-summary__dot" :style="{ background: player.color }" />
            <span class="player-summary__name">{{ player.name }}</span>
            <span class="player-summary__total">{{ formatDuration(totalSeconds(index)) }}</span>
            <span class="player-summary__avg">avg {{ formatDuration(averageSeconds(index)) }}</span>
          </li>
        </ol>
      </DsCard>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-4);
}

.stat-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--ds-space-3);
}

.stat-card {
  padding: var(--ds-space-4);
  border: 1px solid var(--ds-color-border);
  border-radius: var(--ds-radius-md);
  background: var(--ds-color-bg);
}

.stat-card__label {
  margin: 0;
  font-size: var(--ds-font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--ds-color-fg-muted);
}

.stat-card__value {
  margin: var(--ds-space-1) 0 0;
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-2xl);
  letter-spacing: var(--ds-letter-spacing-display);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.stat-card__sub {
  margin: var(--ds-space-1) 0 0;
  font-size: var(--ds-font-size-xs);
  color: var(--ds-color-fg-muted);
}

.split {
  display: grid;
  gap: var(--ds-space-4);
  grid-template-columns: 1fr;
}

@media (min-width: 1000px) {
  .split {
    grid-template-columns: 1.4fr 1fr;
  }
}

ds-bar-chart {
  width: 100%;
  display: block;
}

.player-summary {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.player-summary li {
  display: grid;
  grid-template-columns: 0.75rem 1fr auto auto;
  align-items: center;
  gap: var(--ds-space-3);
  padding: var(--ds-space-3) 0;
  border-bottom: 1px solid var(--ds-color-border-subtle);
}

.player-summary li:last-child {
  border-bottom: 0;
}

.player-summary__dot {
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
}

.player-summary__name {
  font-size: var(--ds-font-size-md);
}

.player-summary__total {
  font-family: var(--ds-font-mono);
  font-variant-numeric: tabular-nums;
  font-size: var(--ds-font-size-sm);
}

.player-summary__avg {
  font-family: var(--ds-font-mono);
  font-variant-numeric: tabular-nums;
  font-size: var(--ds-font-size-xs);
  color: var(--ds-color-fg-muted);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .player-summary__avg {
    display: none;
  }
}
</style>
