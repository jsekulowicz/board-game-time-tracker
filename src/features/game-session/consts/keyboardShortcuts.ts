import { invertMap } from '@/type-utils'

export const KEYBOARD_KEY_TO_PLAYER_INDEX = {
  q: 1,
  w: 2,
  e: 3,
  r: 4,
} as const

export const PLAYER_ORDINAL_NUMBER_TO_KEYBOARD_KEY = invertMap<string, number>(KEYBOARD_KEY_TO_PLAYER_INDEX)
