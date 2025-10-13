<script lang="ts" setup>
import { BaseCard, BaseCardHeader, BaseCardTitle, BaseCardContent } from '@/components/ui/base-card'
import GridListContainer from '@/components/GridListContainer.vue'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardActions.vue'

import { useGameSessionStore } from '../stores/useGameSessionStore'

import type { GameSession } from '../types'

export interface GameSessionCardProps {
  gameSession: GameSession
}

defineProps<GameSessionCardProps>()

const gameSessionStore = useGameSessionStore()
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
          :gameSessionStatus="gameSession.status"
          @end-move="gameSessionStore.endPlayerMove(gameSessionPlayer.uuid)"
        />
      </GridListContainer>
    </BaseCardContent>
  </BaseCard>
</template>
