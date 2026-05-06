<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'

import CardWithStatusTag from '@/components/CardWithStatusTag.vue'
import { UiKbd, UiKbdGroup } from '@/components/ui/ui-kbd'
import DsButton from '@/components/ds/DsButton.vue'

import GameSessionPlayerStatusTag from './GameSessionPlayerStatusTag.vue'
import { usePlayerTimeTracking } from '../composables/usePlayerTimeTracking'
import { useSwitchPlayerMove } from '../composables/useSwitchPlayerMove'

export interface GameSessionPlayerItemProps {
  gameSessionPlayer: GameSessionPlayer
  gameSessionStatus: GameSessionStatus
}
const props = defineProps<GameSessionPlayerItemProps>()

const sessionPlayer = computed(() => props.gameSessionPlayer)
const { displayedTime, timeTrackingDisabled } = usePlayerTimeTracking(sessionPlayer)
const { switchPlayerMove, switchPlayerKeyLabel } = useSwitchPlayerMove(sessionPlayer)

const finishButtonRef = ref<InstanceType<typeof DsButton> | null>(null)

const finishButtonTooltip = computed<string | null>(() => {
  if (props.gameSessionStatus === 'paused') {
    return 'Resume the game session to track.'
  }

  if (timeTrackingDisabled.value) {
    return 'Player already moved this turn. Wait for the next turn to track.'
  }

  return null
})

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
      <template v-if="gameSessionStatus !== 'ended'" #status>
        <GameSessionPlayerStatusTag :player="gameSessionPlayer" :gameStatus="gameSessionStatus" />
      </template>

      <div class="flex flex-wrap justify-center items-start h-full gap-2">
        <h3 class="w-full flex gap-2 justify-center text-base/normal text-center wrap-break-word font-semibold" lang="en">
          <div class="size-[23px] rounded-sm" :style="{ backgroundColor: gameSessionPlayer.color }" />
          <div>{{ gameSessionPlayer.name }}</div>
        </h3>
        <div class="w-full flex flex-col items-center justify-between gap-2 pl-0 mt-auto">
          <div>{{ displayedTime }}</div>

          <DsButton
            v-if="gameSessionStatus !== 'ended'"
            ref="finishButtonRef"
            class="w-full max-w-32 min-h-10 px-3"
            variant="secondary"
            full-width
            :disabled="timeTrackingDisabled"
            :tooltip="finishButtonTooltip"
            @click="switchPlayerMove"
          >
            <UiKbdGroup>
              <div>Track</div>

              <template #kbd>
                <UiKbd>{{ switchPlayerKeyLabel }}</UiKbd>
              </template>
            </UiKbdGroup>
          </DsButton>
        </div>
      </div>
    </CardWithStatusTag>
  </li>
</template>
