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
    <template v-if="gameSession" #header>
      <div class="session-header">
        <h1 class="session-header__title">{{ gameSession.game }}</h1>
        <div class="session-header__meta">
          <GameSessionStatusTag :status="gameSession.status" />
          <span class="session-header__sub">
            <span>Turn {{ gameSession.currentTurnIndex + 1 }}</span>
            <span class="session-header__dot"></span>
            <span>Move {{ gameSession.currentMoveIndex + 1 }}</span>
            <span class="session-header__dot"></span>
            <span>{{ gameSession.players.length }} players</span>
          </span>
        </div>
      </div>
    </template>

    <GameSessionLoading v-if="loadingGameSession" />
    <GameSessionCard v-else-if="gameSession" />
    <GameSessionEmpty v-else />
  </BaseLayout>
</template>

<style scoped>
.session-header {
  margin-bottom: var(--ds-space-5);
}

.session-header__title {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-2xl);
  letter-spacing: var(--ds-letter-spacing-display);
  margin: 0;
  line-height: 1.1;
}

.session-header__meta {
  margin-top: var(--ds-space-2);
  display: flex;
  align-items: center;
  gap: var(--ds-space-2);
  flex-wrap: wrap;
  color: var(--ds-color-fg-muted);
  font-size: var(--ds-font-size-sm);
}

.session-header__sub {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-space-2);
  flex-wrap: wrap;
}

.session-header__dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: currentColor;
  display: inline-block;
}

@media (max-width: 480px) {
  .session-header__title {
    font-size: var(--ds-font-size-xl);
  }
}
</style>
