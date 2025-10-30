import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import './index.css'

import { client } from '@/api/generated/client.gen.ts'
import { errorHandlerInterceptor } from '@/api/interceptors/errorHandler.ts'

async function initializeApp() {
  client.interceptors.response.use(errorHandlerInterceptor)

  const app = createApp(App)

  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  const { startWorker } = await import('mocks/browser')
  await startWorker()

  app.use(router)
  app.mount('#app')
}

initializeApp()
