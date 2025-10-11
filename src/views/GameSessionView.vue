<script setup lang="ts">
import GridListContainer from '@/components/GridListContainer.vue'
import GameSessionPlayerItem from '@/features/game-session/GameSessionPlayerItem.vue'
import {
  type GameSessionPlayer,
  type GameSession,
  GameSessionStatus,
} from '@/features/game-session/types'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { ref } from 'vue'

const currentGameSessionPlayers = ref<GameSessionPlayer[]>([
  { uuid: crypto.randomUUID(), name: 'Player 1', previousTotalTimeMs: 0 },
  { uuid: crypto.randomUUID(), name: 'Player 2', previousTotalTimeMs: 0 },
])

const currentGameSession = ref<GameSession>({
  uuid: crypto.randomUUID(),
  name: 'Casual chess game 2025.10.11',
  game: {
    name: 'Chess',
    uuid: crypto.randomUUID(),
  },
  players: currentGameSessionPlayers.value,
  currentPlayerUuids: [currentGameSessionPlayers.value[0]!.uuid],
  createdAt: new Date().toISOString(),
  updatedAt: null,
  status: GameSessionStatus.IN_PROGRESS,
})
</script>

<template>
  <BaseLayout>
    <h1>{{ currentGameSession.name }}, {{ currentGameSession.game.name }}</h1>

    <GridListContainer :maxCols="currentGameSessionPlayers.length">
      <GameSessionPlayerItem
        v-for="gameSessionPlayer in currentGameSessionPlayers"
        :key="gameSessionPlayer.uuid"
        :gameSessionPlayer
      />
    </GridListContainer>
  </BaseLayout>
</template>
