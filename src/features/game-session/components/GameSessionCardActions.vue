<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

import { BaseButton } from '@/components/ui/base-button'
import { BaseKbd, BaseKbdGroup } from '@/components/ui/base-kbd'
import { useGameSessionActions } from '@/features/game-session/composables/useGameSessionActions'

const gameSessionActions = useGameSessionActions()

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const playPauseLabel = computed(() => {
  if (gameSessionActions.canPause.value) {
    return 'Pause'
  } else if (gameSessionActions.canResume.value) {
    return 'Resume'
  }

  return ''
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === ' ') {
    gameSessionActions.toggleGameSessionPlayPause()
  }

  if (event.ctrlKey && event.key === 'Escape') {
    gameSessionActions.completeGameSession()
  }

  if (event.key === 'ArrowRight') {
    gameSessionActions.endMoveAndSwitchToNextPlayer()
  }
}
</script>

<template>
  <section class="flex items-center gap-4">
    <BaseButton
      class="w-32 flex justify-between"
      size="sm"
      variant="outline"
      @click="gameSessionActions.toggleGameSessionPlayPause"
    >
      <div>{{ playPauseLabel }}</div>
      <BaseKbd class="min-w-none">Space</BaseKbd>
    </BaseButton>

    <BaseButton
      class="px-3"
      size="sm"
      variant="outline"
      @click="gameSessionActions.completeGameSession"
    >
      <BaseKbdGroup>
        <div>End</div>
        <BaseKbd>Ctrl</BaseKbd>
        <span>+</span>
        <BaseKbd>Esc</BaseKbd>
      </BaseKbdGroup>
    </BaseButton>

    <BaseButton
      size="sm"
      variant="outline"
      @click="gameSessionActions.endMoveAndSwitchToNextPlayer"
    >
      <BaseKbdGroup>
        <div>Next player</div>
        <BaseKbd>→</BaseKbd>
      </BaseKbdGroup>
    </BaseButton>
  </section>
</template>
