<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionCard from './components/GameSessionCard.vue'
import GameSessionEmpty from './components/GameSessionEmpty.vue'
import GameSessionStatusTag from './components/GameSessionStatusTag.vue'
import GameSessionLoading from './components/GameSessionLoading.vue'
import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const gameSessionStore = useGameSessionStore()
const { gameSession, loadingGameSession } = storeToRefs(gameSessionStore)

async function fetchGameSession() {
  const id = route.params.id as string
  if (id) {
    await gameSessionStore.getGameSessionById(id)
  }
}

watch(() => route.params.id, fetchGameSession, { immediate: true })
</script>

<template>
  <BaseLayout>
    <template v-if="gameSession" #header="{ pageTitle }">
      <div class="flex gap-x-6 gap-y-2 items-center justify-between flex-wrap">
        <h2 class="font-semibold">{{ pageTitle }}</h2>
        <div class="flex gap-x-4 gap-y-2 flex-wrap justify-between">
          <div>{{ gameSession.game }}, turn {{ gameSession.currentTurnIndex + 1 }}, move {{ gameSession.currentMoveIndex + 1 }}</div>
          <GameSessionStatusTag class="rounded-sm" :status="gameSession.status" />
        </div>
      </div>
    </template>

    <GameSessionLoading v-if="loadingGameSession" />
    <GameSessionCard v-else-if="gameSession" />
    <GameSessionEmpty v-else />
  </BaseLayout>
</template>
