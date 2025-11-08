<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionListCard from './components/GameSessionListCard.vue'
import UiButton from '@/components/ui/ui-button/UiButton.vue'

import { Icon } from '@iconify/vue'
import { RouteName } from '@/router/consts'
</script>

<template>
  <BaseLayout>
    <template #header="{ pageTitle }">
      <div class="flex items-center gap-4">
        <h2 class="font-semibold">{{ pageTitle }}</h2>

        <UiButton size="sm" variant="outline" asChild>
          <RouterLink :to="{ name: RouteName.GameSessionAdd }">
            <Icon icon="radix-icons:plus" />
            <div>Add game session</div>
          </RouterLink>
        </UiButton>
      </div>
    </template>

    <GameSessionListCard />
  </BaseLayout>
</template>
