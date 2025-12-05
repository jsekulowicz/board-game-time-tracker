import { computed } from 'vue'
import { useForm, useFieldArray } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useRouter } from 'vue-router'

import { useGameSessionListStore } from '@/features/game-session-list/stores/useGameSessionListStore'
import { RouteName } from '@/router/consts'
import { toast } from 'vue-sonner'
import type { GameSessionCreateBody } from '@/api/generated'

export const useGameSessionAdd = () => {
  const gameSessionListStore = useGameSessionListStore()

  const MIN_PLAYERS_COUNT = 2
  const MAX_PLAYERS_COUNT = 6

  const MAX_STRING_CHAR_COUNT = 50
  const PLAYER_NAME_MAX_STRING_CHAR_COUNT = 30

  const PLAYER_COLORS: string[] = ['#FF0303', '#0042FF', '#1CE6B9', '#540081', '#FFFC00', '#FE8A0E']
  const PLAYER_PLACEHOLDERS: string[] = ['Bob', 'Alice', 'Charlie', 'Frank', 'Diana', 'Eve']

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

  return {
    PLAYER_PLACEHOLDERS,
    MAX_PLAYERS_COUNT,
    formSchema,
    playerFields,
    hasMinPlayers,
    hasMaxPlayers,
    addPlayer,
    removePlayer,
    onSubmit,
  }
}
