import type { GameSessionResource, GameSessionPlayer, GameSessionPlayerStatus, CommonUuid } from '@/api/generated/'
import { toRaw } from 'vue'

async function switchPlayerMove(gameSession: GameSessionResource, targetPlayerUuid: string): Promise<GameSessionResource> {
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
    console.log('player index', index)
    newGameSession.players[index] = getPlayerWithLastMoveEnded(newGameSession.players[index] as GameSessionPlayer, 'turn_completed')
  }

  return newGameSession
}

function getGameSessionWithOnePlayerTracking(gameSession: GameSessionResource, targetPlayerUuid: CommonUuid): GameSessionResource {
  const shouldStartNewTurn = gameSession.players.every((player) => player.status === 'turn_completed')
  const nextPlayerIndex = gameSession.players.findIndex((player) => player.uuid === targetPlayerUuid)
  const nextPlayer = gameSession.players[nextPlayerIndex]

  if (!nextPlayer) {
    console.error('Could not find the next GameSessionPlayer when creating a new move.')
    return gameSession
  }

  if (!shouldStartNewTurn && gameSession.players[nextPlayerIndex]?.status === 'turn_completed') {
    console.error(
      `GameSessionPlayer ${nextPlayer.name} has already ended their move this turn. There are other players that need to end their turn.`,
    )
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

async function endPlayerMove(gameSession: GameSessionResource, playerUuid: string): Promise<GameSessionResource> {
  const newGameSession = structuredClone(toRaw(gameSession))
  const playerThatEndsMoveIndex = newGameSession.players.findIndex((player: GameSessionPlayer) => player.uuid === playerUuid)
  const playerThatEndsMove = newGameSession.players[playerThatEndsMoveIndex]

  if (playerThatEndsMove) {
    newGameSession.players[playerThatEndsMoveIndex] = getPlayerWithLastMoveEnded(playerThatEndsMove, 'turn_completed')
    newGameSession.players = getPlayersWithNewMove(newGameSession.players, playerThatEndsMove)
    newGameSession.currentTurnIndex = getCurrentTurnIndex(newGameSession)
  }

  return newGameSession
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

function getPlayersWithNewMove(gameSessionPlayers: GameSessionPlayer[], previousPlayer: GameSessionPlayer): GameSessionPlayer[] {
  const previousPlayerTurnOrderIndex = previousPlayer.turnOrderIndex
  const shouldStartNewTurn = previousPlayer.turnOrderIndex === gameSessionPlayers.length - 1

  const newPlayers = structuredClone(toRaw(gameSessionPlayers))
  const nextPlayerIndex = shouldStartNewTurn
    ? 0
    : gameSessionPlayers.findIndex((player) => player.turnOrderIndex === previousPlayerTurnOrderIndex + 1)

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
    turnIndex: shouldStartNewTurn ? previousPlayerLastMove.turnIndex + 1 : previousPlayerLastMove.turnIndex,
  })

  newPlayers[nextPlayerIndex].status = 'tracking'

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
  switchPlayerMove,
  endPlayerMove,
  getPlayerWithLastMoveEnded,
}
