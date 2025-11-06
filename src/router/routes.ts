import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './consts'

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
    component: () => import('@/features/game-session-list/GameSessionListView.vue'),
  },
  {
    path: '/game-sessions/add',
    name: RouteName.GameSessionAdd,
    component: () => import('@/features/game-session-add/GameSessionAddView.vue'),
  },
  {
    path: '/game-sessions/:id',
    name: RouteName.GameSession,
    component: () => import('@/features/game-session/GameSessionView.vue'),
  },
]

export default routes
