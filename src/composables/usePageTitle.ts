import { computed } from 'vue'
import { type RouteName } from '@/router/consts'
import { findRouteByName, routes } from '@/router/routes'

export function usePageTitle(routeName: RouteName) {
  const route = findRouteByName(routes, routeName)

  const title = computed(() => {
    if (!route?.meta) {
      return ''
    }

    if (typeof route.meta.getDynamicTitle === 'function') {
      return route.meta.getDynamicTitle()
    }

    return route.meta.title ?? ''
  })

  return title
}
