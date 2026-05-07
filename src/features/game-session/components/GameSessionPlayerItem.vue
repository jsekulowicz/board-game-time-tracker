<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { GameSessionPlayer, GameSessionStatus } from '@/api/generated'

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
const { switchPlayerMove } = useSwitchPlayerMove(sessionPlayer)

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

const isTracking = computed(() => props.gameSessionPlayer.status === 'tracking')
const isReady = computed(() => props.gameSessionPlayer.status === 'ready_to_move' && props.gameSessionStatus === 'in_progress')
const buttonLabel = computed(() => (isTracking.value ? 'Stop' : 'Track'))
const buttonVariant = computed(() => (isTracking.value ? 'primary' : 'secondary'))

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
  <li
    class="player"
    :class="{
      'player--tracking': isTracking,
      'player--ready': isReady,
    }"
  >
    <div class="player__head">
      <span class="player__color" :style="{ background: gameSessionPlayer.color }" />
      <span class="player__name">{{ gameSessionPlayer.name }}</span>
      <GameSessionPlayerStatusTag
        v-if="gameSessionStatus !== 'ended'"
        :player="gameSessionPlayer"
        :gameStatus="gameSessionStatus"
      />
    </div>

    <p
      class="player__time"
      :class="{
        'player__time--running': isTracking,
      }"
    >{{ displayedTime }}</p>

    <p class="player__sub">
      {{ gameSessionPlayer.moves.length }}
      {{ gameSessionPlayer.moves.length === 1 ? 'move' : 'moves' }}
    </p>

    <DsButton
      v-if="gameSessionStatus !== 'ended'"
      ref="finishButtonRef"
      class="player__cta ds-button-fill"
      :variant="buttonVariant"
      size="md"
      full-width
      :disabled="timeTrackingDisabled"
      :tooltip="finishButtonTooltip"
      @click="switchPlayerMove"
    >
      {{ buttonLabel }}
    </DsButton>
  </li>
</template>

<style scoped>
.player {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-3);
  padding: var(--ds-space-4);
  border: 1px solid var(--ds-color-border);
  border-radius: var(--ds-radius-md);
  background: var(--ds-color-bg);
  list-style: none;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}

.player--tracking {
  border-color: var(--ds-color-success);
  box-shadow: 0 0 0 2px var(--ds-color-success-subtle);
}

.player--ready {
  border-color: var(--ds-color-accent);
  box-shadow: 0 0 0 2px var(--ds-color-accent-subtle);
}

.player__head {
  display: flex;
  align-items: center;
  gap: var(--ds-space-3);
}

.player__color {
  width: 1rem;
  height: 1rem;
  border-radius: var(--ds-radius-sm);
  flex-shrink: 0;
  outline: 1px solid var(--ds-color-border);
  outline-offset: 1px;
}

.player__name {
  font-family: var(--ds-font-display);
  letter-spacing: var(--ds-letter-spacing-display);
  font-size: var(--ds-font-size-lg);
  flex: 1;
}

.player__time {
  font-family: var(--ds-font-mono);
  font-size: var(--ds-font-size-2xl);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  margin: 0;
  line-height: 1;
}

.player__time--running {
  color: var(--ds-color-success);
}

.player__sub {
  margin: 0;
  font-size: var(--ds-font-size-xs);
  color: var(--ds-color-fg-muted);
}

.player__cta {
  margin-top: auto;
}

@media (max-width: 480px) {
  .player__time {
    font-size: var(--ds-font-size-xl);
  }
}
</style>
