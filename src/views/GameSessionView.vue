<script setup lang="ts">
import GameSessionCard from '@/features/game-session/components/GameSessionCard.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'

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
    <GameSessionCard
      v-if="gameSessionStore.gameSession"
      :gameSession="gameSessionStore.gameSession"
    />
  </BaseLayout>
</template>
