import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './consts'
import { getGameSessionFixture } from '../../mocks/fixtures/gameSessionFixtures'

const { uuid: initialGameSessionUuid } = getGameSessionFixture()

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    redirect: () => ({
      name: RouteName.GameSession,
      params: { uuid: initialGameSessionUuid },
    }),
  },
  {
    path: '/session/:uuid',
    name: RouteName.GameSession,
    component: () => import('@/views/GameSessionView.vue'),
    props: true,
  },
]

export default routes
