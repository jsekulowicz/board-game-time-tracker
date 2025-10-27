import { toRaw } from 'vue'
import { gameSessionPlayerMoveAPI } from './gameSessionPlayerMove'
import type { GameSessionPlayer, GameSessionResource, GameSessionStatus } from '@/api/generated'

async function setGameSessionStatus(gameSession: GameSessionResource, status: GameSessionStatus): Promise<GameSessionResource> {
  if (status === 'in_progress') {
    return getResumedGameSession(gameSession)
  } else if (['paused', 'completed'].includes(status)) {
    return getStoppedGameSession(gameSession, status)
  }

  return gameSession
}

function getResumedGameSession(gameSession: GameSessionResource): GameSessionResource {
  const newGameSession = structuredClone(toRaw(gameSession))

  newGameSession?.players
    .filter((player) => player.status === 'tracking')
    .forEach((player) => {
      const lastMove = player.moves[player.moves.length - 1]

      if (!lastMove) {
        return
      }

      if (lastMove?.turnIndex === gameSession.currentTurnIndex && lastMove.endTimestamp) {
        player.moves.push({
          moveIndex: lastMove.moveIndex,
          turnIndex: lastMove.turnIndex,
          startTimestamp: new Date().toISOString(),
          endTimestamp: null,
        })
      }
    })

  return { ...newGameSession, status: 'in_progress' }
}

function getStoppedGameSession(gameSession: GameSessionResource, status: GameSessionStatus): GameSessionResource {
  const newGameSession = structuredClone(toRaw(gameSession))

  newGameSession.players.forEach((player: GameSessionPlayer, index: number) => {
    newGameSession.players[index] = gameSessionPlayerMoveAPI.getPlayerWithLastMoveEnded(player)
  })

  return { ...newGameSession, status }
}

export const gameSessionStatusAPI = {
  setGameSessionStatus,
}
