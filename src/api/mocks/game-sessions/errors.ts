import type { ErrorResponse } from '@/api/generated'
import { deepFreeze } from '@/object-utils'
import { HttpResponse } from 'msw'

export const GAME_SESSION_NOT_FOUND = deepFreeze({
  error: 'GAME_SESSION_NOT_FOUND',
  title: 'Not found',
  message: 'Could not find game session.',
  statusCode: 404,
  meta: {
    toast: true,
    log: true,
  },
})

export const GAME_SESSION_NOT_IN_PROGRESS = deepFreeze({
  error: 'GAME_SESSION_NOT_IN_PROGRESS',
  title: 'Incorrect action',
  message: 'Cannot track player. Game session is not in progress.',
  statusCode: 400,
  meta: {
    toast: true,
    log: true,
  },
})

export const PLAYER_NOT_FOUND = deepFreeze({
  error: 'PLAYER_NOT_FOUND',
  title: 'Not found',
  message: 'Could not find player.',
  statusCode: 404,
  meta: {
    toast: true,
    log: true,
  },
})

export const ALREADY_MOVED = deepFreeze({
  error: 'ALREADY_MOVED',
  title: 'Incorrect action',
  message: 'Player already made a move this turn.',
  statusCode: 400,
  meta: {
    toast: true,
    log: true,
  },
})

export const INCORRECT_PARAMS = deepFreeze({
  error: 'INCORRECT_PARAMS',
  title: 'Incorrect request',
  message: 'At least one of "status" or "name" must be provided.',
  statusCode: 400,
  meta: {
    toast: true,
    log: true,
  },
})

export const INTERNAL_SERVER_ERROR = deepFreeze({
  error: 'INTERNAL_SERVER_ERROR',
  title: 'Internal server error',
  message: 'Something went wrong. Please try again later.',
  statusCode: 500,
  meta: {
    toast: true,
    log: true,
  },
})

export function getHttpErrorResponse(error?: ErrorResponse | undefined) {
  if (error === undefined) {
    return HttpResponse.json(INTERNAL_SERVER_ERROR, { status: INTERNAL_SERVER_ERROR?.statusCode })
  }

  return HttpResponse.json(error, { status: error.statusCode })
}
