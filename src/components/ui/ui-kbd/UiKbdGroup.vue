<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <kbd data-slot="kbd-group" :class="cn('inline-flex items-center gap-2 justify-center w-full', props.class)">
    <slot />
    <div v-if="$slots.kbd" class="hidden md:flex gap-1">
      <slot name="kbd" />
    </div>
  </kbd>
</template>
