<script lang="ts" setup>
import { computed } from 'vue'

import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/eye'
import '@jsekulowicz/ds-components/icon/eye-slash'

import DsButton from '@/components/ds/DsButton.vue'
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

const trackedTimeIcon = computed(() =>
  gameSessionStateActions.isTrackedTimeVisible.value ? 'eye-slash' : 'eye',
)

const toggleTimeVisibilityLabel = computed(() => {
  if (gameSessionStateActions.isTrackedTimeVisible.value) {
    return 'Hide tracked time'
  } else {
    return 'Show tracked time'
  }
})
</script>

<template>
  <section class="action-bar">
    <DsButton
      size="sm"
      variant="ghost"
      @click="gameSessionStateActions.toggleTimeVisibility"
    >
      <ds-icon slot="leading" :name="trackedTimeIcon" size="lg" />
      {{ toggleTimeVisibilityLabel }}
    </DsButton>

    <DsButton
      size="sm"
      variant="secondary"
      :tooltip="playPauseTooltip"
      :disabled="gameSessionStateActions.needsToStartTracking.value"
      @click="gameSessionStateActions.toggleGameSessionPlayPause"
    >
      {{ playPauseLabel }}
    </DsButton>

    <GameSessionAlertDialogEnd @continue="gameSessionStateActions.endGameSession">
      <template #trigger>
        <DsButton size="sm" variant="danger">End</DsButton>
      </template>
    </GameSessionAlertDialogEnd>
  </section>
</template>

<style scoped>
.action-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--ds-space-2);
  padding-top: var(--ds-space-2);
}
</style>
