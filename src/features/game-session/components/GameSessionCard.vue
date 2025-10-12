<script lang="ts" setup>
import GridListContainer from '@/components/GridListContainer.vue'
import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import type { GameSession } from '../types'
import { BaseCard, BaseCardContent, BaseCardTitle } from '@/components/ui/base-card'
import GameSessionCardActions from './GameSessionCardActions.vue'
import BaseCardHeader from '@/components/ui/base-card/BaseCardHeader.vue'

export interface GameSessionCardProps {
  gameSession: GameSession
}

defineProps<GameSessionCardProps>()
</script>

<template>
  <BaseCard>
    <BaseCardHeader class="flex items-center mb-4">
      <BaseCardTitle>
        {{ gameSession.name }}, {{ gameSession.game.name }}, turn
        {{ gameSession.currentTurnIndex + 1 }}
      </BaseCardTitle>

      <GameSessionCardActions />
    </BaseCardHeader>

    <BaseCardContent>
      <GridListContainer :maxCols="gameSession.players.length">
        <GameSessionPlayerItem
          v-for="gameSessionPlayer in gameSession.players"
          :key="gameSessionPlayer.uuid"
          :gameSessionPlayer
          :gameSession="gameSession"
        />
      </GridListContainer>
    </BaseCardContent>
  </BaseCard>
</template>
