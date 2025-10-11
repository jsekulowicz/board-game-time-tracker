<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import {
  BaseCard,
  BaseCardContent,
  BaseCardDescription,
  BaseCardHeader,
  BaseCardTitle,
} from '@/components/ui/base-card'
</script>

<template>
  <BaseLayout>
    <BaseCard>
      <BaseCardHeader>
        <BaseCardTitle>Player 1</BaseCardTitle>
      </BaseCardHeader>

      <BaseCardContent>0:00:00</BaseCardContent>
    </BaseCard>

    <BaseCard>
      <BaseCardHeader>
        <BaseCardTitle>Player 2</BaseCardTitle>
      </BaseCardHeader>

      <BaseCardContent>0:00:00</BaseCardContent>
    </BaseCard>
  </BaseLayout>
</template>
