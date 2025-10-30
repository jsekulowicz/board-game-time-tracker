<script lang="ts" setup>
import { BaseEmpty, BaseEmptyHeader, BaseEmptyMedia, BaseEmptyTitle, BaseEmptyDescription } from '@/components/ui/base-empty'
</script>

<template>
  <BaseEmpty>
    <BaseEmptyHeader>
      <BaseEmptyMedia variant="icon">404</BaseEmptyMedia>
      <BaseEmptyTitle>This game session does not exist</BaseEmptyTitle>
      <BaseEmptyDescription>We haven't found any game session for the id in the page address. Try a different one!</BaseEmptyDescription>
    </BaseEmptyHeader>
  </BaseEmpty>
</template>
