import type { GameSessionPlayer, GameSessionResource } from '@/api/generated'

export const getGameSessionFixture = (): GameSessionResource => ({
  uuid: 'c3fe6db7-aae7-42e9-a552-6d341e899ac3',
  name: 'Casual chess game 2025.10.11',
  currentTurnIndex: 1,
  currentMoveIndex: 1,
  game: {
    name: 'Chess',
    uuid: '0b65a7a6-da55-4186-bf6b-d7cc3a397a7c',
  },
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
      uuid: 'a56de165-fbe5-421f-bea9-2fddebf08fa8',
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
      turnOrderIndex: 0,
    },
    {
      uuid: 'ef911ca6-c3ec-4e5c-911f-85c2549aebc1',
      name: 'Marcus',
      status: 'tracking',
      previousTotalTimeMs: 0,
      moves: [{ moveIndex: 1, turnIndex: 1, startTimestamp: now.toISOString(), endTimestamp: null }],
      turnOrderIndex: 1,
    },
    {
      uuid: 'ef911ca6-c344-4e5c-911f-85c2549aebc1',
      name: 'Tara',
      status: 'ready_to_move',
      previousTotalTimeMs: 0,
      moves: [],
      turnOrderIndex: 2,
    },
    {
      uuid: 'ef993ca6-c344-4e5c-911f-85c2549aebc1',
      name: 'Bartholomew Kosciuszko',
      status: 'ready_to_move',
      previousTotalTimeMs: 0,
      moves: [],
      turnOrderIndex: 3,
    },
  ]
}
