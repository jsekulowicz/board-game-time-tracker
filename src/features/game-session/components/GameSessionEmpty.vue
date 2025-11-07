<script lang="ts" setup>
import { UiEmpty, UiEmptyHeader, UiEmptyMedia, UiEmptyTitle, UiEmptyDescription } from '@/components/ui/ui-empty'
</script>

<template>
  <UiEmpty>
    <UiEmptyHeader>
      <UiEmptyMedia variant="icon">404</UiEmptyMedia>
      <UiEmptyTitle>This game session does not exist</UiEmptyTitle>
      <UiEmptyDescription>We haven't found any game session for the id in the page address. Try a different one!</UiEmptyDescription>
    </UiEmptyHeader>
  </UiEmpty>
</template>
