<script lang="ts" setup>
import type { GameSessionPlayerStatus, GameSessionStatus } from '@/api/generated'
import type { StatusTagVariant } from '@/components/CardStatusTag.vue'
import CardStatusTag from '@/components/CardStatusTag.vue'
import { computed } from 'vue'

export interface GameSessionStatusTagProps {
  playerStatus: GameSessionPlayerStatus
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

  switch (props.playerStatus) {
    case 'playing':
      return 'active'
    case 'waiting':
      return 'inactive'
    case 'passed':
    default:
      return 'completed'
  }
})

const gameSessionStatusTagText = computed<string>(() => {
  switch (props.playerStatus) {
    case 'playing':
      return props.gameStatus === 'paused' ? 'Paused' : 'Playing'
    case 'waiting':
      return 'Waiting'
    case 'passed':
    default:
      return 'Passed'
  }
})
</script>

<template>
  <CardStatusTag class="px-2" :variant="gameSessionStatusTagVariant">{{
    gameSessionStatusTagText
  }}</CardStatusTag>
</template>
