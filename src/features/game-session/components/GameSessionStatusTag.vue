<script lang="ts" setup>
import { computed } from 'vue'
import type { GameSessionStatus } from '@/api/generated'
import type { StatusTagVariant } from '@/components/CardStatusTag.vue'
import CardStatusTag from '@/components/CardStatusTag.vue'

export interface GameSessionStatusTagProps {
  status: GameSessionStatus
}

const props = defineProps<GameSessionStatusTagProps>()

const gameSessionStatusTagVariant = computed<StatusTagVariant>(() => {
  switch (props.status) {
    case 'in_progress':
      return 'active'
    case 'paused':
      return 'inactive'
    case 'completed':
    default:
      return 'completed'
  }
})

const gameSessionStatusTagText = computed<string>(() => {
  switch (props.status) {
    case 'in_progress':
      return 'In progress'
    case 'paused':
      return 'Paused'
    case 'completed':
    default:
      return 'Completed'
  }
})
</script>

<template>
  <CardStatusTag class="px-2" :variant="gameSessionStatusTagVariant">{{ gameSessionStatusTagText }}</CardStatusTag>
</template>
