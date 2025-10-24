<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'

import CardWithStatusTag from '@/components/CardWithStatusTag.vue'
import GameSessionPlayerStatusTag from './GameSessionPlayerStatusTag.vue'

import { useGameSessionStore } from '@/features/game-session/stores/useGameSessionStore'
import { usePlayerTimeTracking } from '@/features/game-session/composables/usePlayerTimeTracking'
import { BaseCardContent, BaseCardHeader, BaseCardTitle } from '@/components/ui/base-card'

import { BaseButton } from '@/components/ui/base-button'
import { Icon } from '@iconify/vue'

export interface GameSessionPlayerItemProps {
  gameSessionPlayer: GameSessionPlayer
  gameSessionStatus: GameSessionStatus
}
const props = defineProps<GameSessionPlayerItemProps>()

const sessionPlayer = computed(() => props.gameSessionPlayer)
const { displayedTime, hasOngoingMove } = usePlayerTimeTracking(sessionPlayer)

const finishButtonRef = ref<InstanceType<typeof BaseButton> | null>(null)

const finishButtonTooltip = computed(() => (hasOngoingMove.value ? 'Finish move' : 'Please wait for your move to finish'))

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
  <li>
    <CardWithStatusTag>
      <template v-if="gameSessionStatus !== 'completed'" #status>
        <GameSessionPlayerStatusTag :player="gameSessionPlayer" :gameStatus="gameSessionStatus" />
      </template>

      <BaseCardHeader class="flex flex-wrap items-center gap-4">
        <BaseCardTitle class="mr-auto">{{ gameSessionPlayer.name }}</BaseCardTitle>
        <BaseCardContent class="pl-0">{{ displayedTime }}</BaseCardContent>
      </BaseCardHeader>
    </CardWithStatusTag>
  </li>
</template>
