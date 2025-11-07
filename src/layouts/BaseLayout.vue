<script lang="ts" setup>
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import PageHeader from '@/components/PageHeader.vue'
import { Icon } from '@iconify/vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
</script>

<template>
  <main>
    <PageHeader>
      <Icon icon="radix-icons:clock" class="shrink-0 h-[1.5rem] w-[1.5rem]" />
      <h1 class="font-semibold">Board game time tracker</h1>

      <DarkModeToggle class="ml-auto" />
    </PageHeader>

    <section class="grid lg:max-w-[1200px] gap-4 mx-auto mt-4 px-4">
      <header class="flex flex-wrap justify-between items-center gap-3 min-h-9">
        <div class="flex flex-col">
          <PageBreadcrumbs v-if="$route.meta.useBreadcrumbs" class="mb-4" />
          <h2 class="font-semibold">{{ $route.meta.title }}</h2>
        </div>

        <slot name="header-actions" />
      </header>

      <slot></slot>
    </section>
  </main>
</template>
