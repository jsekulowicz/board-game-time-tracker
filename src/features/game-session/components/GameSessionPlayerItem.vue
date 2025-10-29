<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'

import CardWithStatusTag from '@/components/CardWithStatusTag.vue'
import GameSessionPlayerStatusTag from './GameSessionPlayerStatusTag.vue'
import { BaseKbd, BaseKbdGroup } from '@/components/ui/base-kbd'

import { usePlayerTimeTracking } from '@/features/game-session/composables/usePlayerTimeTracking'
import { BaseCardHeader, BaseCardTitle } from '@/components/ui/base-card'

import { BaseButton } from '@/components/ui/base-button'
import { useGameSessionState } from '@/features/game-session/composables/useGameSessionState'
import { useSwitchPlayerMove } from '@/features/game-session/composables/useSwitchPlayerMove'

export interface GameSessionPlayerItemProps {
  gameSessionPlayer: GameSessionPlayer
  gameSessionStatus: GameSessionStatus
}
const props = defineProps<GameSessionPlayerItemProps>()

const sessionPlayer = computed(() => props.gameSessionPlayer)
const { displayedTime } = usePlayerTimeTracking(sessionPlayer)
const { hasLastMoveInTurn } = useGameSessionState()
const { switchPlayerMove, switchPlayerKeyLabel } = useSwitchPlayerMove(sessionPlayer.value)

const finishButtonRef = ref<InstanceType<typeof BaseButton> | null>(null)

const finishButtonTooltip = computed(() =>
  props.gameSessionPlayer.status !== 'ready_to_move' && !hasLastMoveInTurn
    ? 'Player already moved this turn. Please wait for the next turn to track.'
    : undefined,
)

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
    <CardWithStatusTag class="w-full gap-4 py-4">
      <template v-if="gameSessionStatus !== 'completed'" #status>
        <GameSessionPlayerStatusTag :player="gameSessionPlayer" :gameStatus="gameSessionStatus" />
      </template>

      <BaseCardHeader class="flex flex-wrap justify-center items-start h-full gap-2">
        <BaseCardTitle class="w-full text-base/normal text-center wrap-break-word" lang="en">{{ gameSessionPlayer.name }}</BaseCardTitle>
        <div class="flex flex-col items-center justify-between gap-2 pl-0 mt-auto">
          <div>
            {{ displayedTime }}
          </div>

          <BaseButton
            class="min-w-26 min-h-10 px-3"
            variant="outline"
            :disabled="gameSessionPlayer.status !== 'ready_to_move' && !hasLastMoveInTurn"
            :tooltip="finishButtonTooltip"
            @click="switchPlayerMove"
          >
            <BaseKbdGroup>
              <div>Track</div>

              <template #kbd>
                <BaseKbd>{{ switchPlayerKeyLabel }}</BaseKbd>
              </template>
            </BaseKbdGroup>
          </BaseButton>
        </div>
      </BaseCardHeader>
    </CardWithStatusTag>
  </li>
</template>
