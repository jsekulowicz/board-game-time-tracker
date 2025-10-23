<script lang="ts" setup>
import {
  BaseCard,
  BaseCardHeader,
  BaseCardTitle,
  BaseCardContent,
  BaseCardFooter,
} from '@/components/ui/base-card'
import GridListContainer from '@/components/GridListContainer.vue'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardActions.vue'

import { ref } from 'vue'
import type { GameSessionResource } from '@/api/generated'

export interface GameSessionCardProps {
  gameSession: GameSessionResource
}

const gameSessionPlayerItemRefs = ref<InstanceType<typeof GameSessionPlayerItem>[]>([])
defineProps<GameSessionCardProps>()
</script>

<template>
  <BaseCard class="gap-8">
    <BaseCardHeader class="flex flex-col">
      <BaseCardTitle>
        {{ gameSession.name }}, {{ gameSession.game.name }}, turn
        {{ gameSession.currentTurnIndex + 1 }}
      </BaseCardTitle>
    </BaseCardHeader>

    <BaseCardContent>
      <GridListContainer :maxCols="gameSession.players.length">
        <GameSessionPlayerItem
          v-for="gameSessionPlayer in gameSession.players"
          ref="gameSessionPlayerItemRefs"
          :key="gameSessionPlayer.uuid"
          :gameSessionPlayer
          :gameSessionStatus="gameSession.status"
        />
      </GridListContainer>
    </BaseCardContent>

    <BaseCardFooter>
      <GameSessionCardActions />
    </BaseCardFooter>
  </BaseCard>
</template>
