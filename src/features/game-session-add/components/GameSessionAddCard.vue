<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/x-mark'
import '@jsekulowicz/ds-components/icon/plus'
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

      <h2 class="players-heading">Players</h2>

      <div class="player-grid">
        <div v-for="(player, index) in playerFields" :key="player.key" class="player-row">
          <UiFormField v-slot="{ componentField }" :name="`players[${index}].name`">
            <UiFormItem class="player-row__name">
              <UiFormControl>
                <DsTextField
                  type="text"
                  :input-label="`Player ${index + 1}`"
                  :placeholder="`e.g. ${PLAYER_PLACEHOLDERS[index]}`"
                  v-bind="componentField"
                >
                  <template #leading>
                    <UiFormField v-slot="{ componentField: colorField }" :name="`players[${index}].color`">
                      <UiFormControl>
                        <DsColorPicker
                          compact
                          :colors="playerColorOptions"
                          :label="`Player ${index + 1} color`"
                          placeholder="Player color"
                          v-bind="colorField"
                        />
                      </UiFormControl>
                    </UiFormField>
                  </template>
                </DsTextField>
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <DsButton
            class="player-row__remove"
            size="sm"
            variant="ghost"
            label="Remove player"
            :disabled="hasMinPlayers"
            @click.prevent="removePlayer(index)"
          >
            <ds-icon slot="leading" name="x-mark" size="lg" />
          </DsButton>
        </div>
      </div>

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

.players-heading {
  margin: var(--ds-space-4) 0 var(--ds-space-2);
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-md);
  letter-spacing: var(--ds-letter-spacing-display);
  font-weight: var(--ds-font-weight-semibold);
}

.player-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--ds-space-3);
}

@media (min-width: 600px) {
  .player-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .player-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.player-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0 var(--ds-space-2);
}

.player-row__name {
  min-width: 0;
  display: block;
}

.player-row__remove {
  margin-top: calc((var(--ds-size-md) - var(--ds-size-sm)) / 2);
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
