<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { BaseCardHeader, BaseCardTitle, BaseCardContent, BaseCardFooter } from '@/components/ui/base-card'
import GridListContainer from '@/components/GridListContainer.vue'
import CardWithStatusTag from '@/components/CardWithStatusTag.vue'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardStateActions.vue'
import GameSessionStatusTag from './GameSessionStatusTag.vue'
import GameSessionEmpty from './GameSessionEmpty.vue'
import GameSessionLoading from './GameSessionLoading.vue'

import { useGameSessionStore } from '../stores/useGameSessionStore'

import { ref } from 'vue'

const gameSessionStore = useGameSessionStore()
const { gameSession, loadingGameSession } = storeToRefs(gameSessionStore)

const gameSessionPlayerItemRefs = ref<InstanceType<typeof GameSessionPlayerItem>[]>([])
</script>

<template>
  <GameSessionLoading v-if="loadingGameSession" />

  <CardWithStatusTag v-else class="gap-6">
    <template v-if="gameSession" #status>
      <GameSessionStatusTag :status="gameSession.status" />
    </template>

    <template v-if="gameSession">
      <BaseCardHeader class="flex items-center justify-between">
        <BaseCardTitle>
          {{ gameSession.name }}, {{ gameSession.name }}, turn
          {{ gameSession.currentTurnIndex + 1 }}
        </BaseCardTitle>
      </BaseCardHeader>

      <BaseCardContent>
        <GridListContainer :maxCols="gameSession.players.length">
          <GameSessionPlayerItem
            v-for="gameSessionPlayer in gameSession.players"
            ref="gameSessionPlayerItemRefs"
            :key="gameSessionPlayer.id"
            :gameSessionPlayer
            :gameSessionStatus="gameSession.status"
          />
        </GridListContainer>
      </BaseCardContent>

      <BaseCardFooter v-if="gameSession.status !== 'ended'">
        <GameSessionCardActions />
      </BaseCardFooter>
    </template>

    <GameSessionEmpty v-else />
  </CardWithStatusTag>
</template>
