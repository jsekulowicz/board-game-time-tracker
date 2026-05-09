<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionAddCard from './components/GameSessionAddCard.vue'
</script>

<template>
  <BaseLayout>
    <template #header><span></span></template>

    <div class="add-page">
      <header class="add-page__hero">
        <h1 class="add-page__title">New session</h1>
        <p class="add-page__lede">
          Set up your players and the game before the first turn starts.
          You can rename, recolour, or remove anyone before tracking begins.
        </p>
      </header>

      <GameSessionAddCard class="add-page__form" />
    </div>
  </BaseLayout>
</template>

<style scoped>
.add-page {
  display: grid;
  gap: var(--ds-space-5);
}

.add-page__title {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-xl);
  letter-spacing: var(--ds-letter-spacing-display);
  margin: 0;
  line-height: 1.1;
}

.add-page__lede {
  margin: var(--ds-space-2) 0 0;
  color: var(--ds-color-fg-muted);
  font-size: var(--ds-font-size-sm);
  max-width: 56ch;
}

@media (min-width: 960px) {
  .add-page {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: var(--ds-space-8);
    align-items: start;
  }

  .add-page__hero {
    position: sticky;
    top: var(--ds-space-6);
  }

  .add-page__title {
    font-size: var(--ds-font-size-2xl);
  }
}
</style>
