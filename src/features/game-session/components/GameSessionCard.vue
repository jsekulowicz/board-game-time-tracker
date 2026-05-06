<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import CardWithStatusTag from '@/components/CardWithStatusTag.vue'
import GridListContainer from '@/components/GridListContainer.vue'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardStateActions.vue'
import GameSessionStatusTag from './GameSessionStatusTag.vue'
import GameSessionMoveDurationChartCard from '@/features/game-session-statistics/components/GameSessionMoveDurationChartCard.vue'

import { useGameSessionStore } from '../stores/useGameSessionStore'

const gameSessionStore = useGameSessionStore()
const { gameSession } = storeToRefs(gameSessionStore)

const gameSessionPlayerItemRefs = ref<InstanceType<typeof GameSessionPlayerItem>[]>([])
</script>

<template>
  <CardWithStatusTag v-if="gameSession" class="gap-6">
    <template #status>
      <GameSessionStatusTag :status="gameSession.status" />
    </template>

    <div class="flex flex-col gap-4">
      <GridListContainer :maxCols="gameSession.players.length">
        <GameSessionPlayerItem
          v-for="gameSessionPlayer in gameSession.players"
          ref="gameSessionPlayerItemRefs"
          :key="gameSessionPlayer.id"
          :gameSessionPlayer
          :gameSessionStatus="gameSession.status"
        />
      </GridListContainer>

      <GameSessionMoveDurationChartCard v-if="gameSession.status === 'ended'" />
    </div>

    <footer v-if="gameSession.status !== 'ended'" class="flex items-center">
      <GameSessionCardActions />
    </footer>
  </CardWithStatusTag>
</template>
