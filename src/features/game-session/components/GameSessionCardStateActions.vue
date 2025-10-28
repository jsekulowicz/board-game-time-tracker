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
  <section class="flex items-center w-full gap-4">
    <BaseButton class="flex-grow md:max-w-36" size="sm" variant="outline" @click="gameSessionStateActions.toggleGameSessionPlayPause">
      <BaseKbdGroup>
        <div>{{ playPauseLabel }}</div>
        <template #kbd>
          <BaseKbd>Space</BaseKbd>
        </template>
      </BaseKbdGroup>
    </BaseButton>

    <BaseButton class="flex-grow md:max-w-36 px-3" size="sm" variant="outline" @click="gameSessionStateActions.completeGameSession">
      <BaseKbdGroup>
        <div>End</div>
        <template #kbd>
          <BaseKbd>Ctrl</BaseKbd>
          <span>+</span>
          <BaseKbd>Esc</BaseKbd>
        </template>
      </BaseKbdGroup>
    </BaseButton>
  </section>
</template>
