<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { UiCardContent, UiCardFooter, UiCard } from '@/components/ui/ui-card'
import GridListContainer from '@/components/GridListContainer.vue'

import GameSessionPlayerItem from './GameSessionPlayerItem.vue'
import GameSessionCardActions from './GameSessionCardStateActions.vue'
import GameSessionStatusTag from './GameSessionStatusTag.vue'
import GameSessionEmpty from './GameSessionEmpty.vue'

import { useGameSessionStore } from '../stores/useGameSessionStore'

const gameSessionStore = useGameSessionStore()
const { gameSession } = storeToRefs(gameSessionStore)

const gameSessionPlayerItemRefs = ref<InstanceType<typeof GameSessionPlayerItem>[]>([])
</script>

<template>
  <UiCard class="gap-6">
    <template v-if="gameSession" #status>
      <GameSessionStatusTag :status="gameSession.status" />
    </template>

    <template v-if="gameSession">
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
  </UiCard>
</template>
