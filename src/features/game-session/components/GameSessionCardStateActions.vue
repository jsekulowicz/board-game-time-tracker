<script lang="ts" setup>
import { computed } from 'vue'

import { UiButton } from '@/components/ui/ui-button'
import GameSessionAlertDialogEnd from '../components/GameSessionAlertDialogEnd.vue'
import { useGameSessionStateActions } from '../composables/useGameSessionStateActions'

const gameSessionStateActions = useGameSessionStateActions()

const playPauseTooltip = computed(() => {
  if (gameSessionStateActions.needsToStartTracking.value) {
    return 'Start tracking in order to be able to pause the session.'
  }

  return undefined
})

const playPauseLabel = computed(() => {
  if (gameSessionStateActions.needsToStartTracking.value || gameSessionStateActions.canPause.value) {
    return 'Pause'
  } else if (gameSessionStateActions.canResume.value) {
    return 'Resume'
  }

  return ''
})

const toggleTimeVisibilityLabel = computed(() => {
  if (gameSessionStateActions.isTrackedTimeVisible.value) {
    return 'Hide tracked time'
  } else {
    return 'Show tracked time'
  }
})
</script>

<template>
  <section class="flex flex-wrap items-center w-full gap-4">
    <UiButton class="flex-grow w-full md:max-w-50" size="sm" variant="outline" @click="gameSessionStateActions.toggleTimeVisibility">
      {{ toggleTimeVisibilityLabel }}
    </UiButton>

    <UiButton
      class="flex-grow md:max-w-24"
      size="sm"
      variant="outline"
      :tooltip="playPauseTooltip"
      :disabled="gameSessionStateActions.needsToStartTracking.value"
      @click="gameSessionStateActions.toggleGameSessionPlayPause"
    >
      {{ playPauseLabel }}
    </UiButton>

    <GameSessionAlertDialogEnd @continue="gameSessionStateActions.endGameSession">
      <template #trigger>
        <UiButton class="flex-grow md:max-w-24 px-3" size="sm" variant="outline"> End </UiButton>
      </template>
    </GameSessionAlertDialogEnd>
  </section>
</template>
