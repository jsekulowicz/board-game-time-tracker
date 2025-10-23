<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface BaseSkeletonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<BaseSkeletonProps>()
</script>

<template>
  <div data-slot="skeleton" :class="cn('animate-pulse rounded-md bg-primary/10', props.class)" />
</template>
