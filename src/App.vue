<script setup lang="ts">
import DarkModeToggle from './components/DarkModeToggle.vue'
import PageHeader from './components/PageHeader.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <PageHeader>
    <Icon icon="radix-icons:clock" class="h-[1.2rem] w-[1.2rem]" />
    <h1 class="font-semibold">Board game time tracker</h1>

    <DarkModeToggle class="ml-auto" />
  </PageHeader>
</template>

<style scoped></style>
