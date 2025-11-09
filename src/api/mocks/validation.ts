import type { HttpResponse, JsonBodyType } from 'msw'
import { getIncorrectStringArrayElementCountErrorResponse, getParametersMissingErrorResponse } from './game-sessions/errors'

export function validateParametersMissingErrorResponse<T>(obj: T, requiredParameters: Array<keyof T>): HttpResponse<JsonBodyType> | null {
  const missingKeys: Array<keyof T> = []

  for (const key of requiredParameters) {
    if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
      missingKeys.push(key)
    }
  }

  if (missingKeys.length) {
    return getParametersMissingErrorResponse(missingKeys as string[])
  }

  return null
}

export function validateAtLeastOneOfParametersPresent<T>(obj: T, requiredParameters: Array<keyof T>): HttpResponse<JsonBodyType> | null {
  for (const key of requiredParameters) {
    if (typeof obj[key] === 'string' && obj[key].length > 0) {
      return null
    }
  }

  return getParametersMissingErrorResponse(requiredParameters as string[])
}

export function validateNonEmptyStringArrayElementCount(array: Array<unknown>, arrayName: string, minCount: number, maxCount: number) {
  const nonEmptyElementsCount = array.filter((el) => typeof el === 'string' && !!el.trim()).length

  if (nonEmptyElementsCount < minCount || nonEmptyElementsCount > maxCount) {
    return getIncorrectStringArrayElementCountErrorResponse(nonEmptyElementsCount, arrayName, minCount, maxCount)
  }

  return null
}
