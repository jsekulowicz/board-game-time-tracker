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
      class="action-bar__visibility"
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: color-mix(in oklab, var(--ds-color-bg) 92%, transparent);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--ds-color-border);
  padding: var(--ds-space-3) var(--ds-space-4);
  display: flex;
  align-items: center;
  gap: var(--ds-space-2);
  z-index: 10;
}

.action-bar__visibility {
  flex: 1;
  text-align: left;
}

.action-bar__visibility :deep(::part(button)) {
  justify-content: flex-start;
}

@media (min-width: 600px) {
  .action-bar {
    position: sticky;
    bottom: var(--ds-space-4);
    margin-top: var(--ds-space-4);
    border-radius: var(--ds-radius-md);
    border: 1px solid var(--ds-color-border);
  }
}
</style>
