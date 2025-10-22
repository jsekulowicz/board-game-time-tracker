import type {
  GameSessionResource,
  GameSessionPlayer,
  GameSessionPlayerStatus,
} from '@/api/generated/'
import { toRaw } from 'vue'
import { waitForMs } from '@/helpers/concurrency.js'

async function endPlayerMove(
  gameSession: GameSessionResource,
  playerUuid: string,
): Promise<GameSessionResource> {
  const newGameSession = structuredClone(toRaw(gameSession))
  const playerThatEndsMoveIndex = newGameSession.players.findIndex(
    (player: GameSessionPlayer) => player.uuid === playerUuid,
  )
  const playerThatEndsMove = newGameSession.players[playerThatEndsMoveIndex]

  if (playerThatEndsMove) {
    newGameSession.players[playerThatEndsMoveIndex] = getPlayerWithLastMoveEnded(
      playerThatEndsMove,
      'waiting',
    )
    newGameSession.players = getPlayersWithNewMove(newGameSession.players, playerThatEndsMove)
    newGameSession.currentTurnIndex = getCurrentTurnIndex(newGameSession)
  }

  await waitForMs(100)
  return newGameSession
}

function getPlayerWithLastMoveEnded(
  player: GameSessionPlayer,
  playerNewStatus?: GameSessionPlayerStatus,
): GameSessionPlayer {
  const newPlayer = structuredClone(toRaw(player))

  const lastMove = newPlayer.moves[newPlayer.moves.length - 1]

  if (lastMove && lastMove.endTimestamp === null) {
    lastMove.endTimestamp = new Date().toISOString()

    const lastMoveTotalTimeMs =
      new Date(lastMove.endTimestamp).getTime() - new Date(lastMove.startTimestamp).getTime()

    newPlayer.previousTotalTimeMs += lastMoveTotalTimeMs
  }

  if (playerNewStatus) {
    newPlayer.status = playerNewStatus
  }
  return newPlayer
}

function getPlayersWithNewMove(
  gameSessionPlayers: GameSessionPlayer[],
  previousPlayer: GameSessionPlayer,
): GameSessionPlayer[] {
  const previousPlayerTurnOrderIndex = previousPlayer.turnOrderIndex
  const shouldStartNewTurn = previousPlayer.turnOrderIndex === gameSessionPlayers.length - 1

  const newPlayers = structuredClone(toRaw(gameSessionPlayers))
  const nextPlayerIndex = shouldStartNewTurn
    ? 0
    : gameSessionPlayers.findIndex(
        (player) => player.turnOrderIndex === previousPlayerTurnOrderIndex + 1,
      )

  if (!newPlayers[nextPlayerIndex]) {
    console.error('Could not determine the next GameSessionPlayer when creating a new move.')
    return gameSessionPlayers
  }

  const previousPlayerLastMove = previousPlayer.moves[previousPlayer.moves.length - 1]

  if (!previousPlayerLastMove?.moveIndex) {
    console.error('Could not find the previous player moveIndex when creating a new move.')
    return gameSessionPlayers
  }

  newPlayers[nextPlayerIndex].moves.push({
    startTimestamp: new Date().toISOString(),
    endTimestamp: null,
    moveIndex: previousPlayerLastMove.moveIndex + 1,
    turnIndex: shouldStartNewTurn
      ? previousPlayerLastMove.turnIndex + 1
      : previousPlayerLastMove.turnIndex,
  })

  newPlayers[nextPlayerIndex].status = 'playing'

  return newPlayers
}

function getCurrentTurnIndex(gameSession: GameSessionResource) {
  const turnIndexesForPlayers = gameSession.players.map((player) => {
    if (!player.moves.length) {
      return 0
    }

    return player.moves[player.moves.length - 1]?.turnIndex ?? 0
  })

  return Math.max(...turnIndexesForPlayers)
}

export const gameSessionPlayerMoveAPI = {
  endPlayerMove,
  getPlayerWithLastMoveEnded,
}
