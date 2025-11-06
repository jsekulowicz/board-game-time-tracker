import { http, HttpResponse } from 'msw'
import { useGameSessionMockStore } from './stores/useGameSessionMockStore'
import type { GameSessionCreateBody, PatchGameSessionByIdData, SwitchPlayerMoveData } from '@/api/generated'
import { simulateAPIDelay } from '../utils'
import { INCORRECT_PARAMS, getHttpErrorResponse } from './errors'

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
        return HttpResponse.json(
          { error: INCORRECT_PARAMS, message: 'At least one of "status" or "name" must be provided' },
          { status: 400 },
        )
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
