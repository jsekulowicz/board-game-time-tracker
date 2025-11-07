<script lang="ts" setup>
import { UiSkeleton } from '@/components/ui/ui-skeleton'
</script>

<template>
  <div class="flex flex-col space-y-3 w-full lg:max-w-[1200px]">
    <UiSkeleton v-for="index in 5" :key="`gs-table-placeholder-${index}`" class="h-[5svh] w-full" />
    <UiSkeleton class="h-[5svh] w-4/5" />
  </div>
</template>
