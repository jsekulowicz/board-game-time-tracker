import { http, HttpResponse } from 'msw'
import { useGameSessionMockStore } from './stores/useGameSessionMockStore'
import type { PatchGameSessionByIdData, SwitchPlayerMoveData } from '@/api/generated'
import { simulateAPIDelay } from '../utils'
const gameSessionMockStore = useGameSessionMockStore()

export const gameSessionHandlers = [
  http.get('/game-sessions/:uuid', async ({ params }) => {
    await simulateAPIDelay()

    const { uuid } = params
    const result = await gameSessionMockStore.getGameSessionPersistedMock(uuid as string)
    if ('error' in result) {
      return HttpResponse.json(result, { status: result.statusCode })
    }

    return HttpResponse.json(result)
  }),

  http.patch('/game-sessions/:uuid', async ({ params, request }) => {
    await simulateAPIDelay()

    const { uuid } = params
    const body = (await request.json()) as PatchGameSessionByIdData['body']

    if (!body.status && !body.name) {
      return HttpResponse.json({ message: 'At least one of "status" or "name" must be provided' }, { status: 400 })
    }

    let result = await gameSessionMockStore.getGameSessionPersistedMock(uuid as string)
    if ('error' in result) {
      return HttpResponse.json(result, { status: result.statusCode })
    }

    if (body.status) {
      result = await gameSessionMockStore.setGameSessionStatus(uuid as string, body.status)

      if ('error' in result) {
        return HttpResponse.json(result, { status: result.statusCode })
      }
    }

    if (body.name) {
      result = await gameSessionMockStore.setGameSessionName(uuid as string, body.name)

      if ('error' in result) {
        return HttpResponse.json(result, { status: result.statusCode })
      }
    }

    return HttpResponse.json(result)
  }),

  http.patch('/game-sessions/:sessionUuid/moves/switch', async ({ params, request }) => {
    await simulateAPIDelay()

    const { sessionUuid } = params
    const { playerUuid } = (await request.json()) as SwitchPlayerMoveData['body']

    const result = await gameSessionMockStore.switchPlayerMove(sessionUuid as string, playerUuid)

    if ('error' in result) {
      return HttpResponse.json(result, { status: result.statusCode })
    }

    return HttpResponse.json(result)
  }),
]
