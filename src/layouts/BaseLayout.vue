<script lang="ts" setup>
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import PageHeader from '@/components/PageHeader.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <main>
    <PageHeader>
      <Icon icon="radix-icons:clock" class="h-[1.2rem] w-[1.2rem]" />
      <h1 class="font-semibold">Board game time tracker</h1>

      <DarkModeToggle class="ml-auto" />
    </PageHeader>

    <section class="grid lg:max-w-[900px] gap-4 mx-auto mt-4 px-4">
      <slot></slot>
    </section>
  </main>
</template>
