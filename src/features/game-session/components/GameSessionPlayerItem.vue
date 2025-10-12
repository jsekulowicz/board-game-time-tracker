<script lang="ts" setup>
import { usePlayerTimeTracking } from '@/features/game-session/composables/usePlayerTimeTracking'
import { BaseCard, BaseCardContent, BaseCardHeader, BaseCardTitle } from '@/components/ui/base-card'
import type { GameSessionPlayer } from '../types'
import { computed } from 'vue'

export interface GameSessionPlayerItemProps {
  gameSessionPlayer: GameSessionPlayer
}

const props = defineProps<GameSessionPlayerItemProps>()
const sessionPlayer = computed(() => props.gameSessionPlayer)
const { displayedTime } = usePlayerTimeTracking(sessionPlayer)
</script>

<template>
  <li>
    <BaseCard>
      <BaseCardHeader>
        <BaseCardTitle>{{ gameSessionPlayer.name }}</BaseCardTitle>
      </BaseCardHeader>

      <BaseCardContent>{{ displayedTime }}</BaseCardContent>
    </BaseCard>
  </li>
</template>
