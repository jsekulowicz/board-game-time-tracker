<script lang="ts" setup>
import { BaseButton } from '@/components/ui/base-button'
import { Icon } from '@iconify/vue'
import { useGameSessionActions } from '../composables/useGameSessionActions'
import { computed } from 'vue'
import BaseCard from '@/components/ui/base-card/BaseCard.vue'

const gameSessionActions = useGameSessionActions()

const playPauseIcon = computed(() => {
  if (gameSessionActions.canPause.value) {
    return 'radix-icons:pause'
  } else if (gameSessionActions.canResume.value) {
    return 'radix-icons:play'
  }

  return ''
})
</script>

<template>
  <section class="flex items-center gap-4 ml-auto h-2.5">
    <template v-if="gameSessionActions.canComplete.value">
      <BaseButton
        variant="outline"
        size="sm"
        @click="gameSessionActions.toggleGameSessionPlayPause"
      >
        <Icon :icon="playPauseIcon" class="h-[1.2rem] w-[1.2rem]" />
      </BaseButton>

      <BaseButton variant="outline" size="sm" @click="gameSessionActions.completeGameSession">
        <Icon icon="radix-icons:stop" class="h-[1.2rem] w-[1.2rem]" />
      </BaseButton>
    </template>

    <div v-else>
      <BaseCard class="text-sm p-2">Session completed</BaseCard>
    </div>
  </section>
</template>
