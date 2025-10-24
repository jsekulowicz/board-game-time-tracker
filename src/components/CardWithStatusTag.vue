<script setup lang="ts">
import { BaseCard } from '@/components/ui/base-card'
import type { HTMLAttributes } from 'vue'

defineProps<{
  badgeWrapperClass?: HTMLAttributes['class']
}>()
</script>

<template>
  <BaseCard class="relative gap-8" :class="{ 'mt-6': $slots.status }">
    <div
      v-if="$slots.status"
      class="absolute bg-background top-0 left-1/2 -translate-x-1/2 -translate-y-full border-1 border-b-0 rounded-t-md overflow-hidden z-10"
      :class="badgeWrapperClass"
    >
      <slot name="status" />
    </div>
    <slot />
  </BaseCard>
</template>
