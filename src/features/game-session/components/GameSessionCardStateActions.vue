<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

import { BaseButton } from '@/components/ui/base-button'
import { BaseKbd, BaseKbdGroup } from '@/components/ui/base-kbd'
import { useGameSessionStateActions } from '@/features/game-session/composables/useGameSessionStateActions'

const gameSessionStateActions = useGameSessionStateActions()

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const playPauseLabel = computed(() => {
  if (gameSessionStateActions.canPause.value) {
    return 'Pause'
  } else if (gameSessionStateActions.canResume.value) {
    return 'Resume'
  }

  return ''
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === ' ') {
    gameSessionStateActions.toggleGameSessionPlayPause()
  }

  if (event.ctrlKey && event.key === 'Escape') {
    gameSessionStateActions.completeGameSession()
  }
}
</script>

<template>
  <section class="flex items-center gap-4">
    <BaseButton class="w-34 flex justify-between" size="sm" variant="outline" @click="gameSessionStateActions.toggleGameSessionPlayPause">
      <div>{{ playPauseLabel }}</div>
      <BaseKbd class="min-w-none">Space</BaseKbd>
    </BaseButton>

    <BaseButton class="px-3" size="sm" variant="outline" @click="gameSessionStateActions.completeGameSession">
      <BaseKbdGroup>
        <div>End</div>
        <BaseKbd>Ctrl</BaseKbd>
        <span>+</span>
        <BaseKbd>Esc</BaseKbd>
      </BaseKbdGroup>
    </BaseButton>
  </section>
</template>
