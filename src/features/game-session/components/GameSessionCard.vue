<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { UiCardHeader, UiCardTitle, UiCardContent, UiCardFooter } from '@/components/ui/ui-card'
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
      <UiCardHeader class="flex items-center justify-between">
        <UiCardTitle>
          {{ gameSession.name }}, {{ gameSession.name }}, turn
          {{ gameSession.currentTurnIndex + 1 }}
        </UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <GridListContainer :maxCols="gameSession.players.length">
          <GameSessionPlayerItem
            v-for="gameSessionPlayer in gameSession.players"
            ref="gameSessionPlayerItemRefs"
            :key="gameSessionPlayer.id"
            :gameSessionPlayer
            :gameSessionStatus="gameSession.status"
          />
        </GridListContainer>
      </UiCardContent>

      <UiCardFooter v-if="gameSession.status !== 'ended'">
        <GameSessionCardActions />
      </UiCardFooter>
    </template>

    <GameSessionEmpty v-else />
  </CardWithStatusTag>
</template>
