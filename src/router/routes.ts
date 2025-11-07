import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './consts'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    redirect: { name: RouteName.GameSessionList },
  },
  {
    path: '/game-sessions',
    component: () => import('@/App.vue'),
    meta: {
      title: 'Game sessions',
      useBreadcrumbs: true,
    },
    children: [
      {
        path: '',
        name: RouteName.GameSessionList,
        component: () => import('@/features/game-session-list/GameSessionListView.vue'),
        meta: { title: 'Game sessions', useBreadcrumbs: false },
      },
      {
        path: 'add',
        name: RouteName.GameSessionAdd,
        component: () => import('@/features/game-session-add/GameSessionAddView.vue'),
        meta: { title: 'Add game session', useBreadcrumbs: true },
      },
      {
        path: ':id',
        name: RouteName.GameSession,
        component: () => import('@/features/game-session/GameSessionView.vue'),
        meta: { title: 'Game session', useBreadcrumbs: true },
      },
    ],
  },
]
