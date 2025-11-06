<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionCard from './components/GameSessionCard.vue'
import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'

const route = useRoute()
const gameSessionStore = useGameSessionStore()

async function loadSession() {
  const id = route.params.id as string
  if (id) {
    await gameSessionStore.getGameSessionById(id)
  }
}

watch(() => route.params.id, loadSession, { immediate: true })
</script>

<template>
  <BaseLayout>
    <GameSessionCard />
  </BaseLayout>
</template>
