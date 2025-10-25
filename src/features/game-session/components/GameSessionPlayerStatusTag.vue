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
  switch (props.gameStatus) {
    case 'completed':
      return 'completed'
    case 'paused':
      return 'inactive'
  }

  switch (props.player.status) {
    case 'playing':
      return 'active'
    case 'waiting':
      return 'default'
    case 'passed':
    default:
      return 'completed'
  }
})

const gameSessionStatusText = computed(() => {
  switch (props.player.status) {
    case 'playing':
      return props.gameStatus === 'paused' ? 'Paused' : 'Tracking'
    case 'waiting':
      return 'Waiting'
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
