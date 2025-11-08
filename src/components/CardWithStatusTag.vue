<script setup lang="ts">
import { UiCard } from '@/components/ui/ui-card'
</script>

<template>
  <UiCard class="relative gap-8" :class="{ 'mt-6': $slots.status }">
    <div
      v-if="$slots.status"
      class="absolute bg-background top-0 left-1/2 -translate-x-1/2 -translate-y-full border-1 border-b-0 rounded-t-md overflow-hidden z-10"
    >
      <slot name="status" />
    </div>
    <slot />
  </UiCard>
</template>
