import { http, HttpResponse } from 'msw'
import { useGameSessionMockStore } from '../stores/useGameSessionMockStore'
import type { EndPlayerMoveData, PatchGameSessionByIdData } from '@/api/generated'
const gameSessionMockStore = useGameSessionMockStore()

export const gameSessionHandlers = [
  http.get('/game-sessions/:uuid', async ({ params }) => {
    const { uuid } = params
    const session = await gameSessionMockStore.getGameSessionPersistedMock(uuid as string)
    if (!session) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(session)
  }),

  http.patch('/game-sessions/:uuid', async ({ params, request }) => {
    const { uuid } = params
    const body = (await request.json()) as PatchGameSessionByIdData['body']

    if (!body.status && !body.name) {
      return HttpResponse.json(
        { message: 'At least one of "status" or "name" must be provided' },
        { status: 400 },
      )
    }

    const session = await gameSessionMockStore.getGameSessionPersistedMock(uuid as string)
    if (!session) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    if (body.status) {
      await gameSessionMockStore.setGameSessionStatus(uuid as string, body.status)
    }

    if (body.name) {
      await gameSessionMockStore.setGameSessionName(uuid as string, body.name)
    }

    const updated = await gameSessionMockStore.getGameSessionPersistedMock(uuid as string)
    return HttpResponse.json(updated)
  }),

  http.patch('/game-sessions/:sessionUuid/moves/end', async ({ params, request }) => {
    const { sessionUuid } = params
    const { playerUuid } = (await request.json()) as EndPlayerMoveData['body']

    try {
      const session = await gameSessionMockStore.endPlayerMove(sessionUuid as string, playerUuid)

      if (!session) {
        return HttpResponse.json({ message: 'Not found' }, { status: 404 })
      }

      return HttpResponse.json(session)
    } catch (error) {
      console.error(error)
      return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
  }),
]
