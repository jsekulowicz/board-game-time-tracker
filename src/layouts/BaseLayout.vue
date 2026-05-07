<script lang="ts" setup>
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'

import { useRoute } from 'vue-router'
import { usePageTitle } from '@/composables/usePageTitle'
import type { RouteName } from '@/router/consts'

import '@jsekulowicz/ds-components/page-shell/define'
import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/clock'

const route = useRoute()
const pageTitle = usePageTitle(route.name as RouteName)
</script>

<template>
  <ds-page-shell>
    <span slot="brand" class="brand">
      <ds-icon name="clock" size="md" />
      <span>Board game time tracker</span>
    </span>
    <span slot="header-actions">
      <DarkModeToggle />
    </span>

    <PageBreadcrumbs v-if="$route.meta.useBreadcrumbs" class="page-breadcrumbs" />

    <slot name="header" :pageTitle>
      <h2 class="page-title">{{ pageTitle }}</h2>
    </slot>

    <slot></slot>
  </ds-page-shell>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-space-2);
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-md);
  letter-spacing: var(--ds-letter-spacing-display);
}

.brand ds-icon {
  color: var(--ds-color-accent);
  flex-shrink: 0;
}

.page-breadcrumbs {
  margin-bottom: var(--ds-space-3);
}

.page-title {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-2xl);
  letter-spacing: var(--ds-letter-spacing-display);
  margin: 0 0 var(--ds-space-5);
  line-height: 1.1;
}
</style>
