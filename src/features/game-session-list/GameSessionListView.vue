<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionListCard from './components/GameSessionListCard.vue'
import DsButton from '@/components/ds/DsButton.vue'

import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/plus'

import { RouteName } from '@/router/consts'
</script>

<template>
  <BaseLayout>
    <template #header="{ pageTitle }">
      <div class="page-toolbar">
        <h1 class="title">{{ pageTitle }}</h1>

        <RouterLink :to="{ name: RouteName.GameSessionAdd }" custom v-slot="{ navigate }">
          <DsButton variant="primary" size="sm" @click="() => navigate()">
            <ds-icon slot="leading" name="plus" size="md" />
            New session
          </DsButton>
        </RouterLink>
      </div>
    </template>

    <GameSessionListCard />
  </BaseLayout>
</template>

<style scoped>
.page-toolbar {
  display: flex;
  align-items: center;
  gap: var(--ds-space-3);
  margin-bottom: var(--ds-space-4);
}

.title {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-xl);
  letter-spacing: var(--ds-letter-spacing-display);
  margin: 0;
  line-height: 1.1;
}

@media (max-width: 480px) {
  .page-toolbar {
    flex-wrap: wrap;
  }
  .title {
    font-size: var(--ds-font-size-lg);
    flex: 1 1 auto;
  }
}
</style>
