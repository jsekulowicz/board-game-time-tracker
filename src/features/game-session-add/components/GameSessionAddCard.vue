<script setup lang="ts">
import { computed } from 'vue'
import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/x-mark'

import { UiFormControl, UiFormField, UiFormItem, UiFormLabel, UiFormMessage } from '@/components/ui/ui-form'
import DsCard from '@/components/ds/DsCard.vue'
import DsButton from '@/components/ds/DsButton.vue'
import DsTextField from '@/components/ds/DsTextField.vue'
import DsColorPicker from '@/components/ds/DsColorPicker.vue'

import { useGameSessionAdd } from '../composables/useGameSessionAdd'

const { MAX_PLAYERS_COUNT, PLAYER_PLACEHOLDERS, PLAYER_COLORS, hasMinPlayers, hasMaxPlayers, playerFields, addPlayer, removePlayer, onSubmit } =
  useGameSessionAdd()

const playersAddTooltip = computed(() => (hasMaxPlayers.value ? `Cannot have more than ${MAX_PLAYERS_COUNT} players.` : undefined))
const playerColorOptions = computed(() => PLAYER_COLORS.map((color) => ({ value: color })))
</script>

<template>
  <DsCard>
    <h3 slot="title">Details</h3>

    <form class="flex flex-col gap-x-6 gap-y-4" @submit="onSubmit">
      <section class="grid md:grid-cols-2 space-y-6 gap-4">
        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem>
            <UiFormLabel>Session name</UiFormLabel>
            <UiFormControl>
              <DsTextField v-bind="componentField" type="text" input-label="Session name" placeholder="e.g. Friday night session" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="game">
          <UiFormItem>
            <UiFormLabel>Game name</UiFormLabel>
            <UiFormControl>
              <DsTextField v-bind="componentField" type="text" input-label="Game name" placeholder="e.g. Catan" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </section>

      <header class="flex items-center gap-4">
        <h3 class="font-semibold">Players</h3>
        <DsButton size="sm" variant="secondary" :disabled="hasMaxPlayers" :tooltip="playersAddTooltip" @click.prevent="addPlayer">
          Add player
        </DsButton>
      </header>

      <section class="grid md:grid-cols-2 space-y-6 gap-4">
        <UiFormField v-for="(player, index) in playerFields" :key="player.key" v-slot="{ componentField }" :name="`players[${index}].name`">
          <UiFormItem>
            <UiFormLabel>Player {{ index + 1 }}</UiFormLabel>
            <UiFormControl>
              <DsTextField
                class="w-full"
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

                <template v-if="!hasMinPlayers" #trailing>
                  <DsButton
                    class="ds-button-icon-xs"
                    size="sm"
                    variant="ghost"
                    label="Remove player"
                    :disabled="hasMinPlayers"
                    @click.prevent="removePlayer(index)"
                  >
                    <ds-icon name="x-mark" size="sm" />
                  </DsButton>
                </template>
              </DsTextField>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </section>

      <DsButton class="md:w-1/4" type="submit" full-width>Submit</DsButton>
    </form>
  </DsCard>
</template>
