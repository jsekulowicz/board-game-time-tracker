<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionAddCard from './components/GameSessionAddCard.vue'
</script>

<template>
  <BaseLayout>
    <template #header>
      <header class="add-page__hero">
        <h1 class="add-page__title">New session</h1>
        <p class="add-page__description">
          Set up your players and the game before the first turn starts. You can rename, recolor, or remove anyone before tracking begins.
        </p>
      </header>
    </template>

    <GameSessionAddCard />
  </BaseLayout>
</template>

<style scoped>
.add-page__hero {
  margin-bottom: var(--ds-space-5);
}

.add-page__title {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-xl);
  letter-spacing: var(--ds-letter-spacing-display);
  margin: 0;
  line-height: 1.1;
}

.add-page__description {
  margin: var(--ds-space-2) 0 0;
  color: var(--ds-color-fg-muted);
  font-size: var(--ds-font-size-sm);
}
</style>
