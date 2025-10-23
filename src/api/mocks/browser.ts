import { setupWorker } from 'msw/browser'
import { gameSessionHandlers } from './game-sessions/handlers'

export const worker = setupWorker(...gameSessionHandlers)

worker.start()
