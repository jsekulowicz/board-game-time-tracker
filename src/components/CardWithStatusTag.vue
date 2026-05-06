<script setup lang="ts">
import DsCard from '@/components/ds/DsCard.vue'
</script>

<template>
  <DsCard class="relative ds-card-full" :class="{ 'mt-6': $slots.status }">
    <div
      v-if="$slots.status"
      class="absolute bg-background top-0 left-1/2 -translate-x-1/2 -translate-y-full border-1 border-b-0 rounded-t-md overflow-hidden z-10"
    >
      <slot name="status" />
    </div>
    <slot />
  </DsCard>
</template>
