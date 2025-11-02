import { setupWorker } from 'msw/browser'
import { gameSessionHandlers } from './game-sessions/handlers'

export const worker = setupWorker(...gameSessionHandlers)

export async function startWorker() {
  await worker.start({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url)
      if (url.origin !== window.location.origin) {
        return
      }

      if (
        url.pathname.startsWith('/src/') ||
        url.pathname.startsWith('/@vite/') ||
        url.pathname.endsWith('.vue') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.ts') ||
        url.pathname.endsWith('.css')
      ) {
        return
      }

      print.warning()
    },
  })
}
