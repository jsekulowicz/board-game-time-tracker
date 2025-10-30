import { setupWorker } from 'msw/browser'
import { gameSessionHandlers } from './game-sessions/handlers'

export const worker = setupWorker(...gameSessionHandlers)

export async function startWorker() {
  await worker.start()
}
