import type { GameSessionPlayer, GameSessionResource } from '@/api/generated'

export const getGameSessionFixture = (): GameSessionResource => ({
  id: 'c3fe6db7-aae7-42e9-a552-6d341e899ac3',
  name: 'Casual Catan game 2025.10.11',
  currentTurnIndex: 1,
  currentMoveIndex: 1,
  game: 'Catan',
  players: getGameSessionPlayersFixture(),
  createdAt: new Date().toISOString(),
  updatedAt: undefined,
  status: 'in_progress',
})

export function getGameSessionPlayersFixture(): GameSessionPlayer[] {
  const now = new Date()
  const gameStart = new Date(now.getTime() - 5000)

  return [
    {
      id: '111e6db7-aae7-42e9-a552-6d341e899ac3',
      name: 'Anastasia de la Vega',
      status: 'turn_ended',
      moves: [
        (() => {
          return {
            moveIndex: 0,
            turnIndex: 0,
            startTimestamp: gameStart.toISOString(),
            endTimestamp: now.toISOString(),
          }
        })(),
      ],
      previousTotalTimeMs: 5000,
      ordinalNumber: 1,
    },
    {
      id: '222e6db7-aae7-42e9-a552-6d341e899ac3',
      name: 'Marcus',
      status: 'tracking',
      previousTotalTimeMs: 0,
      moves: [{ moveIndex: 1, turnIndex: 1, startTimestamp: now.toISOString(), endTimestamp: null }],
      ordinalNumber: 2,
    },
    {
      id: '333e6db7-aae7-42e9-a552-6d341e899ac3',
      name: 'Tara',
      status: 'ready_to_move',
      previousTotalTimeMs: 0,
      moves: [],
      ordinalNumber: 3,
    },
    {
      id: '444e6db7-aae7-42e9-a552-6d341e899ac3',
      name: 'Bartholomew Kosciuszko',
      status: 'ready_to_move',
      previousTotalTimeMs: 0,
      moves: [],
      ordinalNumber: 4,
    },
  ]
}
