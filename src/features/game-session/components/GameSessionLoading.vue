<script lang="ts" setup>
import { BaseSkeleton } from '@/components/ui/base-skeleton'
</script>

<template>
  <div class="flex flex-col space-y-3 w-full lg:max-w-[1200px]">
    <BaseSkeleton class="h-[30svh] w-full rounded-xl" />
    <div class="space-y-2">
      <BaseSkeleton class="h-[5svh] w-full" />
      <BaseSkeleton class="h-[5svh] w-4/5" />
    </div>
  </div>
</template>
