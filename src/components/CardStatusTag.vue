<script setup lang="ts">
import { computed } from 'vue'

export type StatusTagVariant = 'active' | 'inactive' | 'completed' | 'default'

const props = defineProps<{ variant: StatusTagVariant }>()

const colorClasses = computed(() => {
  switch (props.variant) {
    case 'active':
      return 'text-background bg-success-foreground'
    case 'inactive':
      return 'text-foreground bg-border'
    case 'completed':
      return 'text-background bg-foreground'
    default:
      return 'text-foreground bg-background'
  }
})
</script>

<template>
  <div class="flex justify-center h-6 w-32 px-2" :class="colorClasses" variant="outline">
    <slot />
  </div>
</template>
