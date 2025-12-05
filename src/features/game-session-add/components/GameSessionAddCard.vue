<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

import { UiFormControl, UiFormField, UiFormItem, UiFormLabel, UiFormMessage } from '@/components/ui/ui-form'
import { UiPopover, UiPopoverTrigger, UiPopoverContent } from '@/components/ui/ui-popover'
import { UiCard } from '@/components/ui/ui-card'
import { UiButton } from '@/components/ui/ui-button'
import { UiInput } from '@/components/ui/ui-input'
import { CompactPicker } from 'vue-color'

import { useGameSessionAdd } from '../composables/useGameSessionAdd'
import { getReadableTextClassForBackground } from '../helpers/colors'

const { MAX_PLAYERS_COUNT, PLAYER_PLACEHOLDERS, hasMinPlayers, hasMaxPlayers, playerFields, addPlayer, removePlayer, onSubmit } =
  useGameSessionAdd()

const playersAddTooltip = computed(() => (hasMaxPlayers.value ? `Cannot have more than ${MAX_PLAYERS_COUNT} players.` : undefined))
</script>

<template>
  <UiCard class="p-4 gap-6">
    <h3 class="font-semibold">Details</h3>

    <form class="flex flex-col gap-x-6 gap-y-4" @submit="onSubmit">
      <section class="grid md:grid-cols-2 space-y-6 gap-4">
        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem>
            <UiFormLabel>Session name</UiFormLabel>
            <UiFormControl>
              <UiInput v-bind="componentField" type="text" placeholder="e.g. Friday night session" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="game">
          <UiFormItem>
            <UiFormLabel>Game name</UiFormLabel>
            <UiFormControl>
              <UiInput v-bind="componentField" type="text" placeholder="e.g. Catan" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </section>

      <header class="flex items-center gap-4">
        <h3 class="font-semibold">Players</h3>
        <UiButton size="sm" variant="outline" :disabled="hasMaxPlayers" :tooltip="playersAddTooltip" @click.prevent="addPlayer">
          Add player
        </UiButton>
      </header>

      <section class="grid md:grid-cols-2 space-y-6 gap-4">
        <UiFormField v-for="(player, index) in playerFields" :key="player.key" v-slot="{ componentField }" :name="`players[${index}].name`">
          <UiFormItem>
            <UiFormLabel>Player {{ index + 1 }}</UiFormLabel>
            <UiFormControl class="relative">
              <UiInput
                class="inline-flex flex-1 pl-10"
                :class="{ 'pr-10': !hasMinPlayers }"
                type="text"
                :placeholder="`e.g. ${PLAYER_PLACEHOLDERS[index]}`"
                v-bind="componentField"
              />

              <UiFormField v-slot="{ componentField }" :name="`players[${index}].color`">
                <UiFormControl class="relative">
                  <UiPopover>
                    <UiPopoverTrigger as-child>
                      <UiButton
                        class="absolute flex justify-center items-center left-1.5 top-[27px] size-[26px] rounded-sm"
                        tooltip="Update player's color"
                        :style="{ backgroundColor: `${player.value.color}` }"
                      >
                        <Icon :class="getReadableTextClassForBackground(player.value.color)" icon="radix-icons:gear" />
                      </UiButton>
                    </UiPopoverTrigger>

                    <UiPopoverContent class="p-0 overflow-hidden">
                      <CompactPicker class="w-full! shadow-none!" tabindex="-1" v-bind="componentField" />
                    </UiPopoverContent>
                  </UiPopover>
                </UiFormControl>
              </UiFormField>

              <UiButton
                v-if="!hasMinPlayers"
                class="absolute right-2 top-7"
                size="icon-xs"
                variant="ghost"
                :disabled="hasMinPlayers"
                @click.prevent="removePlayer(index)"
              >
                <Icon icon="radix-icons:cross-1" />
              </UiButton>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </section>

      <UiButton class="md:w-1/4" type="submit">Submit</UiButton>
    </form>
  </UiCard>
</template>

<style scoped>
:deep(.color-item) {
  width: 23px;
  height: 23px;
  border-radius: var(--radius-sm);
}
</style>
