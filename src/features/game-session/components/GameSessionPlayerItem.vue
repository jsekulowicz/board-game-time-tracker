<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'

import CardWithStatusTag from '@/components/CardWithStatusTag.vue'
import { UiKbd, UiKbdGroup } from '@/components/ui/ui-kbd'
import { UiCardHeader, UiCardTitle } from '@/components/ui/ui-card'
import { UiButton } from '@/components/ui/ui-button'

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

const finishButtonRef = ref<InstanceType<typeof UiButton> | null>(null)

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

      <UiCardHeader class="flex flex-wrap justify-center items-start h-full gap-2">
        <UiCardTitle class="w-full text-base/normal text-center wrap-break-word" lang="en">{{ gameSessionPlayer.name }}</UiCardTitle>
        <div class="flex flex-col items-center justify-between gap-2 pl-0 mt-auto">
          <div>{{ displayedTime }}</div>

          <UiButton
            v-if="gameSessionStatus !== 'ended'"
            class="min-w-26 min-h-10 px-3"
            variant="outline"
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
          </UiButton>
        </div>
      </UiCardHeader>
    </CardWithStatusTag>
  </li>
</template>
