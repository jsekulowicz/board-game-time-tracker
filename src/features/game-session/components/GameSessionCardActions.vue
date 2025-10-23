<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'

import { BaseButton } from '@/components/ui/base-button'
import { BaseKbd, BaseKbdGroup } from '@/components/ui/base-kbd'
import { useGameSessionActions } from '../composables/useGameSessionActions'

import { Icon } from '@iconify/vue'

const gameSessionActions = useGameSessionActions()

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const playPauseIcon = computed(() => {
  if (gameSessionActions.canPause.value) {
    return 'radix-icons:pause'
  } else if (gameSessionActions.canResume.value) {
    return 'radix-icons:play'
  }

  return ''
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
}
</script>

<template>
  <section class="flex items-center gap-4 ml-auto h-2.5">
    <template v-if="gameSessionActions.canComplete.value">
      <BaseButton
        class="w-36 flex justify-between"
        size="sm"
        variant="outline"
        @click="gameSessionActions.toggleGameSessionPlayPause"
      >
        <Icon :icon="playPauseIcon" />
        <div>{{ playPauseLabel }}</div>
        <BaseKbd>Space</BaseKbd>
      </BaseButton>

      <BaseButton size="sm" variant="outline" @click="gameSessionActions.completeGameSession">
        <Icon icon="radix-icons:stop" />
        <BaseKbdGroup>
          <div>End</div>
          <BaseKbd>Ctrl</BaseKbd>
          <span>+</span>
          <BaseKbd>Esc</BaseKbd>
        </BaseKbdGroup>
      </BaseButton>
    </template>

    <div v-else>
      <div class="text-sm p-2">Session completed</div>
    </div>
  </section>
</template>
