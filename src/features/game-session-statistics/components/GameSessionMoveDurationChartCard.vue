<script setup lang="ts">
import { computed } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { VisAxis, VisStackedBar, VisGroupedBar, VisXYContainer } from '@unovis/vue'

import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from '@/components/ui/ui-card'
import {
  UiChartContainer,
  UiChartCrosshair,
  UiChartTooltip,
  UiChartTooltipContent,
  componentToString,
  type UiChartConfig,
} from '@/components/ui/ui-chart'

import { formatTime } from '@/helpers/time'
import { CUSTOM_BREAKPOINTS } from '@/consts/customBreakpoints'

import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'
import { useGameSessionStatisticsStore } from '../stores/useGameSessionStatisticsStore'
import type { MoveStatisticsEntry } from '../types'

const gameSessionStatisticsStore = useGameSessionStatisticsStore()
const gameSessionStore = useGameSessionStore()
const breakpoints = useBreakpoints({ ...breakpointsTailwind, ...CUSTOM_BREAKPOINTS })

const activeBreakpoint = breakpoints.active()

const barPadding = computed(() => {
  return gameSessionStatisticsStore.moveDurationChartData.length * 0.02
})

const chartComponent = computed(() => {
  if (
    ['xs', 'sm'].includes(activeBreakpoint.value) ||
    (activeBreakpoint.value === 'md' && gameSessionStatisticsStore.moveDurationChartData.length > 8) ||
    gameSessionStatisticsStore.moveDurationChartData.length > 12
  ) {
    return VisStackedBar
  }

  return VisGroupedBar
})

const chartConfig = computed(() => {
  const chartConfig: UiChartConfig | undefined = {}

  if (!gameSessionStore?.gameSession) {
    return undefined
  }

  gameSessionStore.gameSession?.players.forEach((player) => {
    chartConfig[player.name] = {
      label: player.name,
      color: player.color,
    }
  })

  return chartConfig
})

function formatTurnLabel(turnOrdinalNumber: number | Date) {
  if (activeBreakpoint.value === 'xs') {
    return ''
  }

  return `${Number(turnOrdinalNumber).toFixed()}`
}

function formatTooltipTurnLabel(turnOrdinalNumber: number | Date) {
  return `Turn ${Number(turnOrdinalNumber).toFixed()}`
}

function formatTooltipValue(durationSeconds: number) {
  return formatTime(durationSeconds * 1000)
}
</script>

<template>
  <UiCard v-if="chartConfig && gameSessionStatisticsStore.moveDurationChartData.length" class="move-duration-chart-card">
    <UiCardHeader>
      <UiCardTitle>Move duration</UiCardTitle>
    </UiCardHeader>
    <UiCardContent>
      <UiChartContainer class="h-[220px]" :config="chartConfig">
        <VisXYContainer :data="gameSessionStatisticsStore.moveDurationChartData" width="100%">
          <component
            :is="chartComponent"
            :x="(durationEntry: MoveStatisticsEntry) => durationEntry.turnOrdinalNumber"
            :y="
              Object.keys(chartConfig).map(
                (playerName: keyof MoveStatisticsEntry) => (durationEntry: MoveStatisticsEntry) => durationEntry[playerName],
              )
            "
            :color="Object.values(chartConfig).map((player) => player.color)"
            :rounded-corners="4"
            :bar-padding="barPadding"
            group-padding="0"
          />
          <VisAxis
            type="x"
            :x="(durationEntry: MoveStatisticsEntry) => durationEntry.turnOrdinalNumber"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="gameSessionStatisticsStore.moveDurationChartData.length"
            :tick-values="gameSessionStatisticsStore.moveDurationChartData.map((durationEntry) => durationEntry.turnOrdinalNumber)"
            :tick-format="formatTurnLabel"
            label="Turn"
          />
          <VisAxis type="y" label="duration (seconds)" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <UiChartTooltip />
          <UiChartCrosshair
            :template="
              componentToString(chartConfig, UiChartTooltipContent, {
                labelFormatter: formatTooltipTurnLabel,
                valueFormatter: formatTooltipValue,
              })
            "
            color="transparent"
          />
        </VisXYContainer>
      </UiChartContainer>
    </UiCardContent>
  </UiCard>
</template>

<style scoped>
.move-duration-chart-card {
  max-width: calc(100vw - 80px);
}
</style>
