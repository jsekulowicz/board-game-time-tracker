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

export function getOneOfParametersRequiredErrorResponse(parameters: string[]) {
  if (!parameters.length) {
    return getHttpErrorResponse(INTERNAL_SERVER_ERROR)
  }

  console.log(
    'grp',
    getHttpErrorResponse({
      error: 'ONE_OF_PARAMETERS_REQUIRED',
      title: 'Incorrect request',
      message: `At least one of the following parameters must be provided: ${parameters.join(', ')}.`,
      statusCode: 400,
      meta: {
        toast: true,
        log: true,
      },
    }),
  )

  return getHttpErrorResponse({
    error: 'ONE_OF_PARAMETERS_REQUIRED',
    title: 'Incorrect request',
    message: `At least one of the following parameters must be provided: ${parameters.join(', ')}.`,
    statusCode: 400,
    meta: {
      toast: true,
      log: true,
    },
  })
}

export function getParametersMissingErrorResponse(parameters: string[]) {
  if (!parameters.length) {
    return getHttpErrorResponse(INTERNAL_SERVER_ERROR)
  }

  return getHttpErrorResponse({
    error: 'MISSING_REQUIRED_PARAMETERS',
    title: 'Incorrect request',
    message: `The following required parameters are missing: ${parameters.join(', ')}.`,
    statusCode: 400,
    meta: {
      toast: true,
      log: true,
    },
  })
}

export function getIncorrectStringArrayElementCountErrorResponse(
  actualCount: number,
  arrayName: string,
  minCount: number,
  maxCount: number,
) {
  return getIncorrectRequestErrorResponse(
    `Number of received ${arrayName}: ${actualCount}. Expected minimum: ${minCount}. Expected maximum: ${maxCount}.`,
  )
}

export function getIncorrectRequestErrorResponse(message: string) {
  return getHttpErrorResponse({
    error: 'INCORRECT_REQUEST',
    title: 'Incorrect request',
    message,
    statusCode: 400,
    meta: {
      toast: true,
      log: true,
    },
  })
}

export function getHttpErrorResponse(error?: ErrorResponse | undefined) {
  if (error === undefined) {
    return HttpResponse.json(INTERNAL_SERVER_ERROR, { status: INTERNAL_SERVER_ERROR?.statusCode })
  }

  return HttpResponse.json(error, { status: error.statusCode })
}
