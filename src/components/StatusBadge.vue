<script setup lang="ts">
import { UiBadge } from '@/components/ui/ui-badge'

export type StatusBadgeVariant = 'active' | 'inactive' | 'ended'

defineProps<{ variant: StatusBadgeVariant }>()
</script>

<template>
  <UiBadge class="h-8 text-success-foreground bg-success border-success-border" variant="outline">
    <slot />
  </UiBadge>
</template>
