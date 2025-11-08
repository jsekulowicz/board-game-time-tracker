<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { UiBreadcrumb, UiBreadcrumbItem, UiBreadcrumbLink, UiBreadcrumbList, UiBreadcrumbSeparator } from '@/components/ui/ui-breadcrumb'
import { Icon } from '@iconify/vue'
import { usePageTitle } from '@/composables/usePageTitle'
import type { RouteName } from '@/router/consts'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter((r) => r.meta?.title || r.meta?.getDynamicTitle)

  return matched.map((r, index) => {
    const isLast = index === matched.length - 1
    const resolved = router.resolve({ path: r.path })
    const title = usePageTitle(r.name as RouteName).value

    return {
      title,
      to: !isLast ? resolved.fullPath : null,
    }
  })
})
</script>

<template>
  <UiBreadcrumb v-if="breadcrumbs.length > 1">
    <UiBreadcrumbList>
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <UiBreadcrumbItem>
          <UiBreadcrumbLink v-if="crumb.to" asChild>
            <RouterLink class="hover:underline" :to="crumb.to">
              {{ crumb.title }}
            </RouterLink>
          </UiBreadcrumbLink>
          <span v-else class="text-muted-foreground">{{ crumb.title }}</span>
        </UiBreadcrumbItem>

        <UiBreadcrumbSeparator v-if="index < breadcrumbs.length - 1">
          <Icon icon="radix-icons:chevron-right" />
        </UiBreadcrumbSeparator>
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
