<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionListCard from './components/GameSessionListCard.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'

import { Icon } from '@iconify/vue'
import { RouteName } from '@/router/consts'
</script>

<template>
  <BaseLayout>
    <header class="flex flex-wrap justify-between items-center gap-3">
      <h2 class="font-semibold">Game session list</h2>

      <BaseButton asChild>
        <RouterLink :to="{ name: RouteName.GameSessionAdd }">
          <Icon icon="radix-icons:plus" />
          <div>Add game session</div>
        </RouterLink>
      </BaseButton>
    </header>

    <GameSessionListCard />
  </BaseLayout>
</template>
