<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardStateActions.vue'
import GameSessionMoveDurationChartCard from '@/features/game-session-statistics/components/GameSessionMoveDurationChartCard.vue'

import { useGameSessionStore } from '../stores/useGameSessionStore'

const gameSessionStore = useGameSessionStore()
const { gameSession } = storeToRefs(gameSessionStore)

const gameSessionPlayerItemRefs = ref<InstanceType<typeof GameSessionPlayerItem>[]>([])
</script>

<template>
  <div v-if="gameSession" class="game-session">
    <ul class="player-grid">
      <GameSessionPlayerItem
        v-for="gameSessionPlayer in gameSession.players"
        ref="gameSessionPlayerItemRefs"
        :key="gameSessionPlayer.id"
        :gameSessionPlayer
        :gameSessionStatus="gameSession.status"
      />
    </ul>

    <GameSessionMoveDurationChartCard v-if="gameSession.status === 'ended'" class="chart-card" />

    <GameSessionCardActions v-if="gameSession.status !== 'ended'" />
  </div>
</template>

<style scoped>
.game-session {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-4);
}

.player-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--ds-space-3);
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .player-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .player-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1400px) {
  .player-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.chart-card {
  margin-top: var(--ds-space-2);
}
</style>
