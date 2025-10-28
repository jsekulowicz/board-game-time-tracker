<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'

import CardWithStatusTag from '@/components/CardWithStatusTag.vue'
import GameSessionPlayerStatusTag from './GameSessionPlayerStatusTag.vue'
import { BaseKbd, BaseKbdGroup } from '@/components/ui/base-kbd'

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

const finishButtonTooltip = computed(() =>
  props.gameSessionPlayer.status !== 'ready_to_move' && !hasLastMoveInTurn
    ? 'Player already moved this turn. Please wait for the next turn to track.'
    : undefined,
)

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

      <BaseCardHeader class="flex flex-wrap justify-center items-start h-full gap-4">
        <BaseCardTitle class="w-full text-base/normal text-center wrap-break-word" lang="en">{{ gameSessionPlayer.name }}</BaseCardTitle>
        <div class="flex flex-col items-center justify-between gap-4 pl-0 mt-auto">
          <div>
            {{ displayedTime }}
          </div>

          <BaseButton
            class="max-h-none h-auto"
            variant="outline"
            :disabled="gameSessionPlayer.status !== 'ready_to_move' && !hasLastMoveInTurn"
            :tooltip="finishButtonTooltip"
          >
            <BaseKbdGroup class="flex flex-col justify-between gap-2">
              <div>Track</div>

              <div class="flex gap-1">
                <BaseKbd>Ctrl</BaseKbd>
                <span>+</span>
                <BaseKbd>{{ playerOrdinalNumber }}</BaseKbd>
              </div>
            </BaseKbdGroup>
          </BaseButton>
        </div>
      </BaseCardHeader>

      <!-- <BaseCardContent class="flex items-center justify-between px-4">

      </BaseCardContent> -->
    </CardWithStatusTag>
  </li>
</template>
