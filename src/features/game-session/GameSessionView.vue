<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionCard from './components/GameSessionCard.vue'

import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'

interface GameSessionViewProps {
  uuid: string
}
const props = defineProps<GameSessionViewProps>()
const gameSessionStore = useGameSessionStore()

gameSessionStore.getGameSessionById(props.uuid)
</script>

<template>
  <BaseLayout>
    <GameSessionCard />
  </BaseLayout>
</template>
