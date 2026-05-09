<script lang="ts" setup>
import { computed } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'
import type { StatusTagVariant } from '@/components/CardStatusTag.vue'
import CardStatusTag from '@/components/CardStatusTag.vue'

export interface GameSessionStatusTagProps {
  player: GameSessionPlayer
  gameStatus: GameSessionStatus
}

const props = defineProps<GameSessionStatusTagProps>()

const gameSessionStatusTagVariant = computed<StatusTagVariant>(() => {
  if (props.gameStatus === 'ended') {
    return 'ended'
  }

  switch (props.player.status) {
    case 'tracking':
      return props.gameStatus === 'paused' ? 'inactive' : 'active'
    case 'ready_to_move':
      return 'default'
    case 'passed':
    case 'turn_ended':
    default:
      return 'ended'
  }
})

const gameSessionStatusText = computed(() => {
  switch (props.player.status) {
    case 'tracking':
      return props.gameStatus === 'paused' ? 'Paused' : 'Tracking'
    case 'ready_to_move':
      return 'Ready'
    case 'turn_ended':
      return 'Moved'
    case 'passed':
    default:
      return 'Passed'
  }
})

const playerOrdinalNumber = computed(() => props.player.ordinalNumber)
const gameSessionStatusTagText = computed(() => `#${playerOrdinalNumber.value} ${gameSessionStatusText.value}`)
</script>

<template>
  <CardStatusTag :variant="gameSessionStatusTagVariant">
    {{ gameSessionStatusTagText }}
  </CardStatusTag>
</template>
