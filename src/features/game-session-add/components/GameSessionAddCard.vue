<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/x-mark'
import '@jsekulowicz/ds-components/icon/plus'
import '@jsekulowicz/ds-components/list/define'
import '@jsekulowicz/ds-components/divider/define'

import { UiFormControl, UiFormField, UiFormItem, UiFormMessage } from '@/components/ui/ui-form'
import DsCard from '@/components/ds/DsCard.vue'
import DsButton from '@/components/ds/DsButton.vue'
import DsTextField from '@/components/ds/DsTextField.vue'
import DsColorPicker from '@/components/ds/DsColorPicker.vue'

import { useGameSessionAdd } from '../composables/useGameSessionAdd'
import { RouteName } from '@/router/consts'

const router = useRouter()
const { MAX_PLAYERS_COUNT, PLAYER_PLACEHOLDERS, PLAYER_COLORS, hasMinPlayers, hasMaxPlayers, playerFields, addPlayer, removePlayer, onSubmit } =
  useGameSessionAdd()

const playersAddTooltip = computed(() => (hasMaxPlayers.value ? `Cannot have more than ${MAX_PLAYERS_COUNT} players.` : undefined))
const playerColorOptions = computed(() => PLAYER_COLORS.map((color) => ({ value: color })))

function cancel() {
  router.push({ name: RouteName.GameSessionList })
}
</script>

<template>
  <DsCard class="add-card" elevation="sm">
    <form @submit="onSubmit">
      <section class="fields">
        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem>
            <UiFormControl>
              <DsTextField v-bind="componentField" type="text" label="Session name" placeholder="e.g. Friday game night" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="game">
          <UiFormItem>
            <UiFormControl>
              <DsTextField v-bind="componentField" type="text" label="Game" placeholder="e.g. Wingspan" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </section>

      <header class="players-header">
        <span class="players-header__title">Players</span>
        <span class="players-header__count">{{ playerFields.length }} added</span>
      </header>

      <ds-list>
        <ds-list-item v-for="(player, index) in playerFields" :key="player.key">
          <UiFormField v-slot="{ componentField: colorField }" :name="`players[${index}].color`">
            <UiFormControl slot="leading">
              <DsColorPicker
                compact
                :colors="playerColorOptions"
                :label="`Player ${index + 1} color`"
                placeholder="Player color"
                v-bind="colorField"
              />
            </UiFormControl>
          </UiFormField>

          <UiFormField v-slot="{ componentField }" :name="`players[${index}].name`">
            <UiFormItem class="player-row__name">
              <UiFormControl>
                <DsTextField
                  type="text"
                  :input-label="`Player ${index + 1}`"
                  :placeholder="`e.g. ${PLAYER_PLACEHOLDERS[index]}`"
                  v-bind="componentField"
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <DsButton
            slot="trailing"
            size="sm"
            variant="ghost"
            label="Remove player"
            :disabled="hasMinPlayers"
            @click.prevent="removePlayer(index)"
          >
            <ds-icon slot="leading" name="x-mark" size="lg" />
          </DsButton>
        </ds-list-item>
      </ds-list>

      <DsButton
        class="add-player-btn"
        size="sm"
        variant="secondary"
        :disabled="hasMaxPlayers"
        :tooltip="playersAddTooltip"
        @click.prevent="addPlayer"
      >
        <ds-icon slot="leading" name="plus" size="md" />
        Add player
      </DsButton>

      <ds-divider class="form-divider"></ds-divider>

      <footer class="form-actions">
        <DsButton type="button" variant="ghost" @click="cancel">Cancel</DsButton>
        <DsButton type="submit" variant="primary">
          <ds-icon slot="leading" name="plus" size="md" />
          Create session
        </DsButton>
      </footer>
    </form>
  </DsCard>
</template>

<style scoped>
.add-card {
  max-width: 640px;
  margin-inline: auto;
  display: block;
}

form {
  display: flex;
  flex-direction: column;
}

.fields {
  display: grid;
  gap: var(--ds-space-3);
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .fields {
    grid-template-columns: 1fr 1fr;
  }
}

.players-header {
  margin: var(--ds-space-4) 0 var(--ds-space-2);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--ds-space-2);
}

.players-header__title {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-md);
  letter-spacing: var(--ds-letter-spacing-display);
}

.players-header__count {
  font-family: var(--ds-font-mono);
  font-size: var(--ds-font-size-2xs);
  color: var(--ds-color-fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.player-row__name {
  min-width: 0;
  flex: 1 1 auto;
}

.add-player-btn {
  align-self: flex-start;
  margin-top: var(--ds-space-3);
}

.form-divider {
  margin-top: var(--ds-space-5);
}

.form-actions {
  margin-top: var(--ds-space-4);
  display: flex;
  gap: var(--ds-space-2);
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .form-actions {
    flex-direction: column-reverse;
  }
  .form-actions :deep(ds-button) {
    width: 100%;
  }
  .form-actions :deep(ds-button)::part(button) {
    justify-content: center;
  }
}
</style>
