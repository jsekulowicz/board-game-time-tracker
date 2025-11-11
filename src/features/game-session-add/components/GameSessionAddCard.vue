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
import type { GameSessionCreateBody } from '@/api/generated'

const gameSessionListStore = useGameSessionListStore()

const MIN_PLAYERS_COUNT = 2
const MAX_PLAYERS_COUNT = 6

const MAX_STRING_CHAR_COUNT = 50
const PLAYER_NAME_MAX_STRING_CHAR_COUNT = 30

const PLAYER_COLORS: string[] = ['#FF0303', '#0042FF', '#1CE6B9', '#540081', '#FFFC00', '#FE8A0E']

const formSchema = toTypedSchema(
  zod.object({
    name: zod
      .string()
      .trim()
      .min(1, 'Session name is required')
      .max(MAX_STRING_CHAR_COUNT, `Cannot exceed ${MAX_STRING_CHAR_COUNT} characters`),
    game: zod
      .string()
      .trim()
      .min(1, 'Game name is required')
      .max(MAX_STRING_CHAR_COUNT, `Cannot exceed ${MAX_STRING_CHAR_COUNT} characters`),
    players: zod
      .array(
        zod.object({
          name: zod
            .string()
            .trim()
            .min(1, 'Player name is required')
            .max(PLAYER_NAME_MAX_STRING_CHAR_COUNT, `Cannot exceed ${PLAYER_NAME_MAX_STRING_CHAR_COUNT} characters`),
          color: zod.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Must be a valid hex color'),
        }),
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
    players: [
      { name: '', color: PLAYER_COLORS[0] as string },
      { name: '', color: PLAYER_COLORS[1] as string },
    ],
  },
})

const {
  fields: playerFields,
  push: addPlayerField,
  remove: removePlayerField,
} = useFieldArray<GameSessionCreateBody['players'][number]>('players')

const hasMinPlayers = computed(() => playerFields.value.length === MIN_PLAYERS_COUNT)
const hasMaxPlayers = computed(() => playerFields.value.length === MAX_PLAYERS_COUNT)
const playersAddTooltip = computed(() => (hasMaxPlayers.value ? `Cannot have more than ${MAX_PLAYERS_COUNT} players.` : undefined))

const router = useRouter()

function addPlayer() {
  if (playerFields.value.length < MAX_PLAYERS_COUNT) {
    const nextColor = PLAYER_COLORS.find((color) => !playerFields.value.find((p) => p.value.color === color)) || '#CCCCCC'
    addPlayerField({ name: '', color: nextColor })
  }
}

function removePlayer(index: number) {
  if (playerFields.value.length > MIN_PLAYERS_COUNT) {
    removePlayerField(index)

    playerFields.value.forEach((player, index) => {
      player.value.color = PLAYER_COLORS[index] as string
    })
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
  } catch (error) {
    console.error(error)
  }
})
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
                :class="{ 'pr-10': playerFields.length > MIN_PLAYERS_COUNT }"
                type="text"
                v-bind="componentField"
              />
              <div class="absolute left-2 top-[29px] size-[23px] rounded-sm" :style="{ backgroundColor: player.value.color }" />

              <UiButton
                v-if="playerFields.length > MIN_PLAYERS_COUNT"
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
