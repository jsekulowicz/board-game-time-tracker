<script setup lang="ts">
import { computed } from 'vue'
import '@jsekulowicz/ds-components/badge/define'

export type StatusTagVariant = 'active' | 'inactive' | 'paused' | 'ended' | 'default'

const props = defineProps<{ variant: StatusTagVariant }>()

const tone = computed(() => {
  switch (props.variant) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'neutral'
    case 'paused':
      return 'warning'
    case 'ended':
      return 'accent'
    default:
      return 'accent'
  }
})
</script>

<template>
  <ds-badge :tone="tone">
    <slot />
  </ds-badge>
</template>
