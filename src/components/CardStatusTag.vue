<script setup lang="ts">
import { computed } from 'vue'
import '@jsekulowicz/ds-components/badge/define'

export type StatusTagVariant = 'active' | 'inactive' | 'ended' | 'default'

const props = defineProps<{ variant: StatusTagVariant }>()

const tone = computed(() => {
  switch (props.variant) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'neutral'
    case 'ended':
      return 'danger'
    default:
      return 'accent'
  }
})
</script>

<template>
  <ds-badge class="card-status-tag" :tone="tone">
    <slot />
  </ds-badge>
</template>
