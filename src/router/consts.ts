export const RouteName = {
  Home: 'home',
  GameSessionList: 'game-session-list',
  GameSession: 'game-session',
  GameSessionAdd: 'game-session-add',
}

export type RouteName = (typeof RouteName)[keyof typeof RouteName]
