<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionListCard from './components/GameSessionListCard.vue'
import DsButton from '@/components/ds/DsButton.vue'

import { Icon } from '@iconify/vue'
import { RouteName } from '@/router/consts'
</script>

<template>
  <BaseLayout>
    <template #header="{ pageTitle }">
      <div class="flex items-center gap-4">
        <h2 class="font-semibold">{{ pageTitle }}</h2>

        <RouterLink :to="{ name: RouteName.GameSessionAdd }" custom v-slot="{ navigate }">
          <DsButton size="sm" variant="secondary" @click="() => navigate()">
            <Icon icon="radix-icons:plus" />
            <div>Add game session</div>
          </DsButton>
        </RouterLink>
      </div>
    </template>

    <GameSessionListCard />
  </BaseLayout>
</template>
