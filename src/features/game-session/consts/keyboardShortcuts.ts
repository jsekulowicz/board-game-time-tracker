import { invertMap } from '@/type-utils'

export const KEYBOARD_KEY_TO_PLAYER_INDEX = {
  q: 0,
  w: 1,
  e: 2,
  r: 3,
} as const

export const PLAYER_INDEX_TO_KEYBOARD_KEY = invertMap<string, number>(KEYBOARD_KEY_TO_PLAYER_INDEX)
