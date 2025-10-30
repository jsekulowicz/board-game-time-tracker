import { waitForMs } from '@/helpers/concurrency'

export async function simulateAPIDelay() {
  await waitForMs(Math.floor(Math.random() * 50))
}
