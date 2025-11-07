<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import {
  BaseBreadcrumb,
  BaseBreadcrumbItem,
  BaseBreadcrumbLink,
  BaseBreadcrumbList,
  BaseBreadcrumbSeparator,
} from '@/components/ui/base-breadcrumb'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter((r) => r.meta?.title)

  return matched.map((r, index) => {
    const isLast = index === matched.length - 1

    const resolved = router.resolve({ path: r.path })

    return {
      title: r.meta.title as string,
      to: !isLast ? resolved.fullPath : null,
    }
  })
})
</script>

<template>
  <BaseBreadcrumb v-if="breadcrumbs.length > 1">
    <BaseBreadcrumbList>
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <BaseBreadcrumbItem>
          <BaseBreadcrumbLink v-if="crumb.to" asChild>
            <RouterLink class="hover:underline" :to="crumb.to">{{ crumb.title }}</RouterLink>
          </BaseBreadcrumbLink>
          <span v-else class="text-muted-foreground">{{ crumb.title }}</span>
        </BaseBreadcrumbItem>

        <BaseBreadcrumbSeparator v-if="index < breadcrumbs.length - 1">
          <Icon icon="radix-icons:chevron-right" />
        </BaseBreadcrumbSeparator>
      </template>
    </BaseBreadcrumbList>
  </BaseBreadcrumb>
</template>
