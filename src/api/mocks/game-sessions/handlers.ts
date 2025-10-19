import { rest } from 'msw'
import type { ApiTypes } from '@/api/generated/types.gen.ts'

export const gameSessionMocks = [
  rest.get('/game-sessions', (req, res, ctx) => {
    const mockSessions: ApiTypes['GameSession'][] = [
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
    return res(ctx.status(200), ctx.json(mockSessions))
  }),
]
