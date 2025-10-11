<script lang="ts" setup>
import type { GameSessionPlayer } from './types'
import { BaseCard, BaseCardContent, BaseCardHeader, BaseCardTitle } from '@/components/ui/base-card'

export interface GameSessionPlayerItemProps {
  gameSessionPlayer: GameSessionPlayer
}

defineProps<GameSessionPlayerItemProps>()
</script>

<template>
  <li>
    <BaseCard>
      <BaseCardHeader>
        <BaseCardTitle>{{ gameSessionPlayer.name }}</BaseCardTitle>
      </BaseCardHeader>

      <BaseCardContent>0:00:00</BaseCardContent>
    </BaseCard>
  </li>
</template>
