<script lang="ts" setup>
import { computed } from 'vue'

interface GridListContainerProps {
  maxCols?: number
}

const props = defineProps<GridListContainerProps>()

const colCountClasses = computed(() => {
  return [getColCountClass(1), getColCountClass(2, 'xs:'), getColCountClass(4, 'md:')].join(' ')
})

function getColCountClass(count: number, breakpointPrefix = '') {
  return `${breakpointPrefix}grid-cols-${props.maxCols ? Math.min(props.maxCols, count) : count}`
}
</script>

<template>
  <ul :class="`grid ${colCountClasses} gap-4`">
    <slot />
  </ul>
</template>
