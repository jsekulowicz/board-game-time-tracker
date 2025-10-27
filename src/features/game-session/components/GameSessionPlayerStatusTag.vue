<script lang="ts" setup>
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'
import type { StatusTagVariant } from '@/components/CardStatusTag.vue'
import CardStatusTag from '@/components/CardStatusTag.vue'
import { computed } from 'vue'

export interface GameSessionStatusTagProps {
  player: GameSessionPlayer
  gameStatus: GameSessionStatus
}

const props = defineProps<GameSessionStatusTagProps>()

const gameSessionStatusTagVariant = computed<StatusTagVariant>(() => {
  if (props.gameStatus === 'completed') {
    return 'completed'
  }

  switch (props.player.status) {
    case 'tracking':
      return props.gameStatus === 'paused' ? 'inactive' : 'active'
    case 'ready_to_move':
      return 'default'
    case 'passed':
    case 'turn_completed':
    default:
      return 'completed'
  }
})

const gameSessionStatusText = computed(() => {
  switch (props.player.status) {
    case 'tracking':
      return props.gameStatus === 'paused' ? 'Paused' : 'Tracking'
    case 'ready_to_move':
      return 'Ready'
    case 'turn_completed':
      return 'Moved'
    case 'passed':
    default:
      return 'Passed'
  }
})

const playerOrdinalNumber = computed(() => props.player.turnOrderIndex + 1)
const gameSessionStatusTagText = computed(() => `#${playerOrdinalNumber.value} ${gameSessionStatusText.value}`)
</script>

<template>
  <CardStatusTag class="px-2" :variant="gameSessionStatusTagVariant">
    <div class="flex items-center gap-2">
      <span>{{ gameSessionStatusTagText }}</span>
    </div>
  </CardStatusTag>
</template>
