<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import GameSessionListCard from './components/GameSessionListCard.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'

import { Icon } from '@iconify/vue'
import { RouteName } from '@/router/consts'
</script>

<template>
  <BaseLayout>
    <template #header-actions>
      <BaseButton asChild>
        <RouterLink :to="{ name: RouteName.GameSessionAdd }">
          <Icon icon="radix-icons:plus" />
          <div>Add game session</div>
        </RouterLink>
      </BaseButton>
    </template>

    <GameSessionListCard />
  </BaseLayout>
</template>
