import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './index.css'

import { client } from '@/api/generated/client.gen.ts'
import { errorHandlerInterceptor } from '@/api/interceptors/errorHandler.ts'

async function initializeApp() {
  client.interceptors.response.use(errorHandlerInterceptor)

  const app = createApp(App)
  const pinia = createPinia()
  setActivePinia(pinia)
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  const { startWorker } = await import('mocks/browser')
  await startWorker()

  const { default: router } = await import('./router')
  app.use(router)

  app.mount('#app')
}

initializeApp()
