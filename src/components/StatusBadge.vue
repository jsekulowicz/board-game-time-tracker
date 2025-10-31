<script setup lang="ts">
import { BaseBadge } from '@/components/ui/base-badge'

export type StatusBadgeVariant = 'active' | 'inactive' | 'ended'

defineProps<{ variant: StatusBadgeVariant }>()
</script>

<template>
  <BaseBadge class="h-8 text-success-foreground bg-success border-success-border" variant="outline">
    <slot />
  </BaseBadge>
</template>
