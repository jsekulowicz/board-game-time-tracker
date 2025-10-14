import {
  GameSessionPlayerStatus,
  GameSessionStatus,
  type GameSession,
} from '@/features/game-session/types'
import { toRaw } from 'vue'
import { waitForMs } from '@/helpers/concurrency.js'
import { gameSessionPlayerMoveAPI } from './gameSessionPlayerMove'

async function setGameSessionStatus(
  gameSession: GameSession,
  status: GameSession['status'],
): Promise<GameSession> {
  await waitForMs(100)

  if (status === GameSessionStatus.IN_PROGRESS) {
    return getResumedGameSession(gameSession)
  } else if ([GameSessionStatus.PAUSED, GameSessionStatus.COMPLETED].includes(status)) {
    return getStoppedGameSession(gameSession, status)
  }

  return gameSession
}

function getResumedGameSession(gameSession: GameSession): GameSession {
  const newGameSession = structuredClone(toRaw(gameSession))

  newGameSession?.players
    .filter((player) => player.status === GameSessionPlayerStatus.PLAYING)
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

  return { ...newGameSession, status: GameSessionStatus.IN_PROGRESS }
}

function getStoppedGameSession(gameSession: GameSession, status: GameSessionStatus): GameSession {
  const newGameSession = structuredClone(toRaw(gameSession))

  newGameSession.players.forEach((player, index) => {
    newGameSession.players[index] = gameSessionPlayerMoveAPI.getPlayerWithLastMoveEnded(player)
  })

  return { ...newGameSession, status }
}

export const gameSessionStatusAPI = {
  setGameSessionStatus,
}
