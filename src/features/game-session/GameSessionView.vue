<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionCard from './components/GameSessionCard.vue'
import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'

const route = useRoute()
const gameSessionStore = useGameSessionStore()

async function loadSession() {
  const uuid = route.params.uuid as string
  if (uuid) {
    await gameSessionStore.getGameSessionById(uuid)
  }
}

watch(() => route.params.uuid, loadSession, { immediate: true })
</script>

<template>
  <BaseLayout>
    <GameSessionCard />
  </BaseLayout>
</template>
