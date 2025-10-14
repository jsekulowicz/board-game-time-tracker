<script lang="ts" setup>
import { BaseCard, BaseCardHeader, BaseCardTitle, BaseCardContent } from '@/components/ui/base-card'
import GridListContainer from '@/components/GridListContainer.vue'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardActions.vue'

import { useGameSessionStore } from '../stores/useGameSessionStore'

import type { GameSession, GameSessionPlayer } from '../types'
import { ref } from 'vue'

export interface GameSessionCardProps {
  gameSession: GameSession
}

const gameSessionPlayerItemRefs = ref<InstanceType<typeof GameSessionPlayerItem>[]>([])

const props = defineProps<GameSessionCardProps>()

const gameSessionStore = useGameSessionStore()

async function endMoveAndFocusNextPlayer(gameSessionPlayer: GameSessionPlayer) {
  await gameSessionStore.endPlayerMove(gameSessionPlayer.uuid)
  gameSessionPlayerItemRefs.value[findNextPlayerItemIndex()]?.focusFinishButton()
}

function findNextPlayerItemIndex(): number {
  return props.gameSession.players.findIndex(
    (p) => p.moves[p.moves.length - 1]?.endTimestamp === null,
  )
}
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
          ref="gameSessionPlayerItemRefs"
          :key="gameSessionPlayer.uuid"
          :gameSessionPlayer
          :gameSessionStatus="gameSession.status"
          @end-move="endMoveAndFocusNextPlayer(gameSessionPlayer)"
        />
      </GridListContainer>
    </BaseCardContent>
  </BaseCard>
</template>
