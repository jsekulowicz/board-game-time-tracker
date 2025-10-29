<script lang="ts" setup>
import { BaseCardHeader, BaseCardTitle, BaseCardContent, BaseCardFooter } from '@/components/ui/base-card'
import GridListContainer from '@/components/GridListContainer.vue'
import CardWithStatusTag from '@/components/CardWithStatusTag.vue'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardStateActions.vue'
import GameSessionStatusTag from './GameSessionStatusTag.vue'

import { ref } from 'vue'
import type { GameSessionResource } from '@/api/generated'

export interface GameSessionCardProps {
  gameSession: GameSessionResource
}

defineProps<GameSessionCardProps>()
const gameSessionPlayerItemRefs = ref<InstanceType<typeof GameSessionPlayerItem>[]>([])
</script>

<template>
  <CardWithStatusTag class="gap-6">
    <template #status>
      <GameSessionStatusTag :status="gameSession.status" />
    </template>

    <BaseCardHeader class="flex items-center justify-between">
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

    <BaseCardFooter v-if="gameSession.status !== 'completed'">
      <GameSessionCardActions />
    </BaseCardFooter>
  </CardWithStatusTag>
</template>
