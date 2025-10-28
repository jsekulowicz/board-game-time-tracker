import type { GameSessionResource, GameSessionPlayer, GameSessionPlayerStatus, CommonUuid } from '@/api/generated/'
import { toRaw } from 'vue'

async function switchPlayerMove(gameSession: GameSessionResource, targetPlayerUuid: string): Promise<GameSessionResource> {
  const targetPlayer = gameSession.players.find((player) => player.uuid === targetPlayerUuid)
  if (!targetPlayer) {
    return gameSession
  }

  if (targetPlayer.status !== 'ready_to_move' && !getShouldStartNewTurn(gameSession)) {
    console.log('HME 1!!!')
    handleAlreadyMovedError(targetPlayer)
    return gameSession
  }

  let newGameSession = getGameSessionWithAllMovesEnded(gameSession)
  newGameSession = getGameSessionWithOnePlayerTracking(newGameSession, targetPlayerUuid)

  return newGameSession
}

function getGameSessionWithAllMovesEnded(gameSession: GameSessionResource) {
  const newGameSession = structuredClone(toRaw(gameSession))

  const currentlyTrackedPlayersIndexes = newGameSession.players
    .map((player: GameSessionPlayer, index: number) => {
      return player.status === 'tracking' ? index : -1
    })
    .filter((index) => index >= 0)

  for (const index of currentlyTrackedPlayersIndexes) {
    newGameSession.players[index] = getPlayerWithLastMoveEnded(newGameSession.players[index] as GameSessionPlayer, 'turn_completed')
  }

  return newGameSession
}

function getGameSessionWithOnePlayerTracking(gameSession: GameSessionResource, targetPlayerUuid: CommonUuid): GameSessionResource {
  const nextPlayerIndex = gameSession.players.findIndex((player) => player.uuid === targetPlayerUuid)
  const nextPlayer = gameSession.players[nextPlayerIndex]
  const shouldStartNewTurn = getShouldStartNewTurn(gameSession)

  if (!nextPlayer) {
    console.error('Could not find the next GameSessionPlayer when creating a new move.')
    return gameSession
  }

  if (!shouldStartNewTurn && gameSession.players[nextPlayerIndex]?.status === 'turn_completed') {
    console.log('HME 2!!!')
    handleAlreadyMovedError(nextPlayer)
    return gameSession
  }

  const newGameSession = structuredClone(toRaw(gameSession))

  newGameSession.players[nextPlayerIndex]!.moves.push({
    startTimestamp: new Date().toISOString(),
    endTimestamp: null,
    moveIndex: gameSession.currentMoveIndex + 1,
    turnIndex: shouldStartNewTurn ? gameSession.currentTurnIndex + 1 : gameSession.currentTurnIndex,
  })

  if (shouldStartNewTurn) {
    newGameSession.players.forEach((player) => {
      player.status = 'ready_to_move'
    })
    newGameSession.currentTurnIndex = newGameSession.currentTurnIndex + 1
  }

  newGameSession.players[nextPlayerIndex]!.status = 'tracking'

  return newGameSession
}

function getShouldStartNewTurn(gameSession: GameSessionResource) {
  return gameSession.players.every((player) => player.status !== 'ready_to_move')
}

function handleAlreadyMovedError(player: GameSessionPlayer) {
  console.error(
    `GameSessionPlayer ${player.name} has already ended their move this turn. There are other players that need to end their turn.`,
  )
}

function getPlayerWithLastMoveEnded(player: GameSessionPlayer, playerNewStatus?: GameSessionPlayerStatus): GameSessionPlayer {
  const newPlayer = structuredClone(toRaw(player))

  const lastMove = newPlayer.moves[newPlayer.moves.length - 1]

  if (lastMove && lastMove.endTimestamp === null) {
    lastMove.endTimestamp = new Date().toISOString()

    const lastMoveTotalTimeMs = new Date(lastMove.endTimestamp).getTime() - new Date(lastMove.startTimestamp).getTime()

    newPlayer.previousTotalTimeMs += lastMoveTotalTimeMs
  }

  if (playerNewStatus) {
    newPlayer.status = playerNewStatus
  }
  return newPlayer
}

export const gameSessionPlayerMoveAPI = {
  switchPlayerMove,
  getPlayerWithLastMoveEnded,
}
