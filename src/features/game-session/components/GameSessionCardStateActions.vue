<script lang="ts" setup>
import { computed } from 'vue'

import { BaseButton } from '@/components/ui/base-button'
import GameSessionAlertDialogEnd from '../components/GameSessionAlertDialogEnd.vue'
import { useGameSessionStateActions } from '../composables/useGameSessionStateActions'

const gameSessionStateActions = useGameSessionStateActions()

const playPauseLabel = computed(() => {
  if (gameSessionStateActions.canPause.value) {
    return 'Pause'
  } else if (gameSessionStateActions.canResume.value) {
    return 'Resume'
  }

  return ''
})
</script>

<template>
  <section class="flex items-center w-full gap-4">
    <BaseButton class="flex-grow md:max-w-20" size="sm" variant="outline" @click="gameSessionStateActions.toggleGameSessionPlayPause">
      {{ playPauseLabel }}
    </BaseButton>

    <GameSessionAlertDialogEnd @continue="gameSessionStateActions.endGameSession">
      <template #trigger>
        <BaseButton class="flex-grow md:max-w-20 px-3" size="sm" variant="outline"> End </BaseButton>
      </template>
    </GameSessionAlertDialogEnd>
  </section>
</template>
