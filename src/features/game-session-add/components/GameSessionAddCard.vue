<script setup lang="ts">
import { computed } from 'vue'
import { useForm, useFieldArray } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

import { UiFormControl, UiFormField, UiFormItem, UiFormLabel, UiFormMessage } from '@/components/ui/ui-form'
import { UiCard } from '@/components/ui/ui-card'
import { UiButton } from '@/components/ui/ui-button'
import { UiInput } from '@/components/ui/ui-input'
import { useGameSessionListStore } from '@/features/game-session-list/stores/useGameSessionListStore'
import { RouteName } from '@/router/consts'
import { toast } from 'vue-sonner'

const gameSessionListStore = useGameSessionListStore()

const MIN_PLAYERS_COUNT = 2
const MAX_PLAYERS_COUNT = 4

const MIN_STRING_CHAR_COUNT = 2
const MAX_STRING_CHAR_COUNT = 50

const PLAYER_NAME_MAX_STRING_CHAR_COUNT = 30

const formSchema = toTypedSchema(
  zod.object({
    name: zod
      .string()
      .trim()
      .min(MIN_STRING_CHAR_COUNT, `Must have at least ${MIN_STRING_CHAR_COUNT} characters`)
      .max(MAX_STRING_CHAR_COUNT, `Cannot exceed ${MAX_STRING_CHAR_COUNT} characters`),
    game: zod
      .string()
      .trim()
      .min(MIN_STRING_CHAR_COUNT, `Must have at least ${MIN_STRING_CHAR_COUNT} characters`)
      .max(MAX_STRING_CHAR_COUNT, `Cannot exceed ${MAX_STRING_CHAR_COUNT} characters`),
    players: zod
      .array(
        zod
          .string()
          .trim()
          .min(1, 'Required')
          .max(PLAYER_NAME_MAX_STRING_CHAR_COUNT, `Cannot exceed ${PLAYER_NAME_MAX_STRING_CHAR_COUNT} characters`),
      )
      .min(MIN_PLAYERS_COUNT, `Must have at least ${MIN_PLAYERS_COUNT} players`)
      .max(MAX_PLAYERS_COUNT, `Cannot exceed ${MAX_PLAYERS_COUNT} players`),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    game: '',
    players: ['', ''],
  },
})

const { fields: playerFields, push: addPlayerField, remove: removePlayerField } = useFieldArray('players')

const hasMinPlayers = computed(() => playerFields.value.length === MIN_PLAYERS_COUNT)
const playersRemoveTooltip = computed(() => (hasMinPlayers.value ? 'Cannot have fewer than 2 players.' : undefined))
const hasMaxPlayers = computed(() => playerFields.value.length === MAX_PLAYERS_COUNT)
const playersAddTooltip = computed(() => (hasMaxPlayers.value ? 'Cannot have more than 4 players.' : undefined))

const router = useRouter()

function addPlayer() {
  if (playerFields.value.length < MAX_PLAYERS_COUNT) {
    addPlayerField('')
  }
}

function removePlayer(index: number) {
  if (playerFields.value.length > MIN_PLAYERS_COUNT) {
    removePlayerField(index)
  }
}

const onSubmit = handleSubmit(async (formValues) => {
  try {
    const resource = await gameSessionListStore.createGameSession(formValues)

    if (resource) {
      router.push({ name: RouteName.GameSession, params: { id: resource.id } })
      toast(`Successfully created ${resource.name}.`, {
        description: 'Use Track buttons to start tracking.',
      })
    }
  } catch {}
})
</script>

<template>
  <UiCard class="p-4 gap-6">
    <h2 class="font-semibold">Add game session</h2>

    <form class="flex flex-col gap-x-6 gap-y-4" @submit="onSubmit">
      <section class="grid md:grid-cols-2 space-y-6 gap-4">
        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem>
            <UiFormLabel>Session name</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="game">
          <UiFormItem>
            <UiFormLabel>Game name</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </section>

      <header class="flex items-center justify-between gap-4">
        <h3 class="font-semibold">Players</h3>
        <UiButton size="sm" variant="outline" :disabled="hasMaxPlayers" :tooltip="playersAddTooltip" @click.prevent="addPlayer">
          Add player
        </UiButton>
      </header>

      <section class="grid md:grid-cols-2 space-y-6 gap-4">
        <UiFormField v-for="(player, index) in playerFields" :key="player.key" v-slot="{ componentField }" :name="`players[${index}]`">
          <UiFormItem>
            <UiFormLabel>Player {{ index + 1 }} name</UiFormLabel>
            <UiFormControl>
              <div class="flex gap-1">
                <UiInput class="inline-flex" type="text" v-bind="componentField" />
                <UiButton
                  class="inline-flex"
                  size="icon"
                  variant="outline"
                  :disabled="hasMinPlayers"
                  :tooltip="playersRemoveTooltip"
                  @click.prevent="removePlayer(index)"
                >
                  <Icon icon="radix-icons:cross-1" />
                </UiButton>
              </div>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </section>

      <UiButton class="md:w-1/4" type="submit">Submit</UiButton>
    </form>
  </UiCard>
</template>
