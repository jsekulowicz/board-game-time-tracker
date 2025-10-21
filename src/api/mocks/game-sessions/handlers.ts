import { http, HttpResponse } from 'msw'
import type { GameSessionsGameSession } from '@/api/generated/types.gen.ts'

export const gameSessionHandlers = [
  http.get('/game-sessions/:uuid', ({ params }) => {
    const { uuid } = params

    const mockSessions: GameSessionsGameSession[] = [
      {
        uuid: '123',
        name: 'Evening Board Game',
        game: { uuid: 'g1', name: 'Catan' },
        status: 'in_progress',
        players: [],
        currentTurnIndex: 0,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
    ]

    const session = mockSessions.find((s) => s.uuid === uuid)
    if (!session) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    return HttpResponse.json(session)
  }),
]
