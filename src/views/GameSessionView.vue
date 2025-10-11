<script setup lang="ts">
import GridListContainer from '@/components/GridListContainer.vue'
import GameSessionPlayerItem from '@/features/game-session/components/GameSessionPlayerItem.vue'
import {
  type GameSessionPlayer,
  type GameSession,
  GameSessionStatus,
  GameSessionPlayerStatus,
} from '@/features/game-session/types'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { ref } from 'vue'

const gameSessionPlayers = ref<GameSessionPlayer[]>([
  {
    uuid: crypto.randomUUID(),
    name: 'Player 1',
    status: GameSessionPlayerStatus.PLAYING,
    moves: [{ moveIndex: 0, startTimestamp: new Date().toISOString(), endTimestamp: null }],
    previousTotalTimeMs: 0,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'Player 2',
    status: GameSessionPlayerStatus.WAITING,
    previousTotalTimeMs: 0,
    moves: [],
  },
])

const gameSession = ref<GameSession>({
  uuid: crypto.randomUUID(),
  name: 'Casual chess game 2025.10.11',
  currentTurnIndex: 0,
  game: {
    name: 'Chess',
    uuid: crypto.randomUUID(),
  },
  players: gameSessionPlayers.value,
  createdAt: new Date().toISOString(),
  updatedAt: null,
  status: GameSessionStatus.IN_PROGRESS,
})
</script>

<template>
  <BaseLayout>
    <h1>
      {{ gameSession.name }}, {{ gameSession.game.name }}, turn
      {{ gameSession.currentTurnIndex + 1 }}
    </h1>

    <GridListContainer :maxCols="gameSessionPlayers.length">
      <GameSessionPlayerItem
        v-for="gameSessionPlayer in gameSessionPlayers"
        :key="gameSessionPlayer.uuid"
        :gameSessionPlayer
      />
    </GridListContainer>
  </BaseLayout>
</template>
