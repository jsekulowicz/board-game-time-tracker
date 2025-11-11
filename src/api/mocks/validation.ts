import type { HttpResponse, JsonBodyType } from 'msw'
import { getIncorrectStringArrayElementCountErrorResponse, getParametersMissingErrorResponse } from './game-sessions/errors'

export function validateParametersMissingErrorResponse<T>(
  obj: T,
  requiredParameters: Array<keyof T>,
  elementName?: string,
): HttpResponse<JsonBodyType> | null {
  const missingKeys: Array<keyof T> = []

  for (const key of requiredParameters) {
    if ((typeof obj[key] === 'string' && obj[key].trim() === '') || obj[key] === undefined || obj[key] === null) {
      missingKeys.push(key)
    }
  }

  if (missingKeys.length) {
    return getParametersMissingErrorResponse(missingKeys as string[], elementName)
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

export function validateNoEmptyPropertiesInArrayOfObjects<T>(array: Array<T>, requiredParametrs: Array<keyof T>, elementName: string) {
  for (const [index, element] of Object.entries(array)) {
    const result = validateParametersMissingErrorResponse(element, requiredParametrs, `${elementName} ${Number(index) + 1}`)

    if (result) {
      return result
    }
  }

  return null
}

export function validateNonEmptyArrayOfObjectsCount(array: Array<unknown>, arrayName: string, minCount: number, maxCount: number) {
  const nonEmptyElementsCount = array.filter((el) => Object.keys(el ?? {}).length > 0).length

  if (nonEmptyElementsCount < minCount || nonEmptyElementsCount > maxCount) {
    return getIncorrectStringArrayElementCountErrorResponse(nonEmptyElementsCount, arrayName, minCount, maxCount)
  }

  return null
}
