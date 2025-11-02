import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './consts'
import GameSessionListView from '@/features/game-session-list/GameSessionListView.vue'
import GameSessionView from '@/features/game-session/GameSessionView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    redirect: {
      name: RouteName.GameSessionList,
    },
  },
  {
    path: '/game-sessions',
    name: RouteName.GameSessionList,
    component: GameSessionListView,
  },
  {
    path: '/game-sessions/:uuid',
    name: RouteName.GameSession,
    component: GameSessionView,
  },
]

export default routes
