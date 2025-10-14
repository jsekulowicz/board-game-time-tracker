<script lang="ts" setup>
import { usePlayerTimeTracking } from '@/features/game-session/composables/usePlayerTimeTracking'
import {
  BaseCard,
  BaseCardContent,
  BaseCardHeader,
  BaseCardTitle,
  BaseCardAction,
} from '@/components/ui/base-card'
import type { GameSessionPlayer, GameSessionStatus } from '../types'
import { computed } from 'vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import { Icon } from '@iconify/vue'

export interface GameSessionPlayerItemProps {
  gameSessionPlayer: GameSessionPlayer
  gameSessionStatus: GameSessionStatus
}
const props = defineProps<GameSessionPlayerItemProps>()

const sessionPlayer = computed(() => props.gameSessionPlayer)
const { displayedTime, hasOngoingMove } = usePlayerTimeTracking(sessionPlayer)

const finishButtonTooltip = computed(() =>
  hasOngoingMove.value ? 'Finish move' : 'Please wait for your move to finish',
)

defineEmits<{
  (e: 'end-move', playerUuid: string): void
}>()
</script>

<template>
  <li>
    <BaseCard>
      <BaseCardHeader class="flex flex-wrap items-center gap-4">
        <BaseCardAction class="flex">
          <BaseButton
            size="icon-sm"
            variant="outline"
            :class="{ 'bg-success!': !hasOngoingMove }"
            :disabled="!hasOngoingMove"
            :tooltip="finishButtonTooltip"
            @click="$emit('end-move', gameSessionPlayer.uuid)"
          >
            <Icon
              class="w-6! h-6!"
              icon="radix-icons:check"
              :color="!hasOngoingMove ? 'var(--background)' : 'var(--success)'"
            />
          </BaseButton>
        </BaseCardAction>
        <BaseCardTitle class="mr-auto">{{ gameSessionPlayer.name }}</BaseCardTitle>
        <BaseCardContent class="pl-0">{{ displayedTime }}</BaseCardContent>
      </BaseCardHeader>
    </BaseCard>
  </li>
</template>
