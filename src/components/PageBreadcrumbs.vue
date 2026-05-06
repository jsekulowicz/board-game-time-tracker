<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import '@jsekulowicz/ds-components/breadcrumb/define'
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

function navigate(to: string | null, event: Event) {
  if (!to) {
    return
  }

  event.preventDefault()
  router.push(to)
}
</script>

<template>
  <ds-breadcrumb v-if="breadcrumbs.length > 1">
    <ds-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index" :href="crumb.to || undefined" @click="navigate(crumb.to, $event)">
      {{ crumb.title }}
    </ds-breadcrumb-item>
  </ds-breadcrumb>
</template>
