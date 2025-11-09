import { http, HttpResponse } from 'msw'
import { useGameSessionMockStore } from './stores/useGameSessionMockStore'
import type { GameSessionCreateBody, PatchGameSessionByIdData, SwitchPlayerMoveData } from '@/api/generated'
import { simulateAPIDelay } from '../utils'
import { getHttpErrorResponse, getOneOfParametersRequiredErrorResponse } from './errors'
import { validateNonEmptyStringArrayElementCountValid, validateParametersMissingErrorResponse } from '../validation'
import { MAX_PLAYER_COUNT, MIN_PLAYER_COUNT } from './validation'

const gameSessionMockStore = useGameSessionMockStore()

export const gameSessionHandlers = [
  http.get('/game-sessions', async () => {
    try {
      await simulateAPIDelay()

      const result = await gameSessionMockStore.getGameSessionListPersistedMock()

      return HttpResponse.json({
        items: result,
      })
    } catch {
      return getHttpErrorResponse()
    }
  }),

  http.post('/game-sessions', async ({ request }) => {
    try {
      await simulateAPIDelay()

      const body = (await request.json()) as GameSessionCreateBody

      const missingKeysError = validateParametersMissingErrorResponse<GameSessionCreateBody>(body, ['name', 'game', 'players'])
      if (missingKeysError) {
        return missingKeysError
      }

      const missingPlayersError = validateNonEmptyStringArrayElementCountValid(body.players, 'players', MIN_PLAYER_COUNT, MAX_PLAYER_COUNT)
      if (missingPlayersError) {
        return missingPlayersError
      }

      const result = await gameSessionMockStore.addGameSessionPersistedMock(body)

      return HttpResponse.json(result)
    } catch {
      return getHttpErrorResponse()
    }
  }),

  http.get('/game-sessions/:id', async ({ params }) => {
    try {
      await simulateAPIDelay()

      const { id } = params
      const result = await gameSessionMockStore.getGameSessionPersistedMock(id as string)
      if ('error' in result) {
        return getHttpErrorResponse(result)
      }

      return HttpResponse.json(result)
    } catch {
      return getHttpErrorResponse()
    }
  }),

  http.patch('/game-sessions/:id', async ({ params, request }) => {
    try {
      await simulateAPIDelay()

      const { id } = params
      const body = (await request.json()) as PatchGameSessionByIdData['body']

      if (!body.status && !body.name) {
        return HttpResponse.json(getOneOfParametersRequiredErrorResponse(['name', 'status']))
      }

      let result = await gameSessionMockStore.getGameSessionPersistedMock(id as string)
      if ('error' in result) {
        return getHttpErrorResponse(result)
      }

      if (body.status) {
        result = await gameSessionMockStore.setGameSessionStatus(id as string, body.status)

        if ('error' in result) {
          return getHttpErrorResponse(result)
        }
      }

      if (body.name) {
        result = await gameSessionMockStore.setGameSessionName(id as string, body.name)

        if ('error' in result) {
          return getHttpErrorResponse(result)
        }
      }

      return HttpResponse.json(result)
    } catch {
      return getHttpErrorResponse()
    }
  }),

  http.patch('/game-sessions/:sessionUuid/moves/switch', async ({ params, request }) => {
    try {
      await simulateAPIDelay()

      const { sessionUuid } = params
      const { playerUuid } = (await request.json()) as SwitchPlayerMoveData['body']

      const result = await gameSessionMockStore.switchPlayerMove(sessionUuid as string, playerUuid)

      if ('error' in result) {
        return getHttpErrorResponse(result)
      }

      return HttpResponse.json(result)
    } catch {
      return getHttpErrorResponse()
    }
  }),
]
