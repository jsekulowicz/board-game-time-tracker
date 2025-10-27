<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'

import CardWithStatusTag from '@/components/CardWithStatusTag.vue'
import GameSessionPlayerStatusTag from './GameSessionPlayerStatusTag.vue'
import BaseKbd from '@/components/ui/base-kbd/BaseKbd.vue'

import { usePlayerTimeTracking } from '@/features/game-session/composables/usePlayerTimeTracking'
import { BaseCardContent, BaseCardHeader, BaseCardTitle } from '@/components/ui/base-card'

import { BaseButton } from '@/components/ui/base-button'
import { useGameSessionState } from '@/features/game-session/composables/useGameSessionState'

export interface GameSessionPlayerItemProps {
  gameSessionPlayer: GameSessionPlayer
  gameSessionStatus: GameSessionStatus
}
const props = defineProps<GameSessionPlayerItemProps>()

const sessionPlayer = computed(() => props.gameSessionPlayer)
const { displayedTime } = usePlayerTimeTracking(sessionPlayer)
const { hasLastMoveInTurn } = useGameSessionState()

const finishButtonRef = ref<InstanceType<typeof BaseButton> | null>(null)

// const finishButtonTooltip = computed(() => (hasOngoingMove.value ? 'Finish move' : 'Please wait for your move to finish'))

const playerOrdinalNumber = computed(() => props.gameSessionPlayer.turnOrderIndex + 1)

function focusFinishButton() {
  finishButtonRef.value?.focus()
}

defineEmits<{
  (e: 'end-move', playerUuid: string): void
}>()

defineExpose({
  focusFinishButton,
})
</script>

<template>
  <li class="flex">
    <CardWithStatusTag class="gap-4 w-full">
      <template v-if="gameSessionStatus !== 'completed'" #status>
        <GameSessionPlayerStatusTag :player="gameSessionPlayer" :gameStatus="gameSessionStatus" />
      </template>

      <BaseCardHeader class="mb-auto">
        <BaseCardTitle class="w-full text-center">{{ gameSessionPlayer.name }}</BaseCardTitle>
      </BaseCardHeader>

      <BaseCardContent class="flex items-center justify-between px-4">
        <div class="pl-0">{{ displayedTime }}</div>
        <BaseButton variant="outline" size="sm" :disabled="gameSessionPlayer.status !== 'ready_to_move' && !hasLastMoveInTurn">
          Track
          <BaseKbd>{{ playerOrdinalNumber }}</BaseKbd>
        </BaseButton>
      </BaseCardContent>
    </CardWithStatusTag>
  </li>
</template>
