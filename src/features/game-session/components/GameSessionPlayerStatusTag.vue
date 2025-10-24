<script lang="ts" setup>
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'
import type { StatusTagVariant } from '@/components/CardStatusTag.vue'
import CardStatusTag from '@/components/CardStatusTag.vue'
import BaseKbd from '@/components/ui/base-kbd/BaseKbd.vue'
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

const gameSessionStatusTagText = computed<string>(() => {
  switch (props.player.status) {
    case 'playing':
      return props.gameStatus === 'paused' ? 'Paused' : 'Tracking'
    case 'waiting':
      return 'to track'
    case 'passed':
    default:
      return 'Passed'
  }
})
</script>

<template>
  <CardStatusTag class="px-2" :variant="gameSessionStatusTagVariant">
    <div class="flex items-center gap-2">
      <BaseKbd v-if="player.status === 'waiting' && gameStatus === 'in_progress'">{{ player.turnOrderIndex + 1 }}</BaseKbd>
      <span>{{ gameSessionStatusTagText }}</span>
    </div>
  </CardStatusTag>
</template>
