<script setup lang="ts">
import { BaseTable, BaseTableHeader, BaseTableHead, BaseTableBody, BaseTableRow, BaseTableCell } from '@/components/ui/base-table'
import { BaseCard } from '@/components/ui/base-card'
import OverflowLabel from '@/components/OverflowLabel.vue'
import GameSessionListTableLoading from './GameSessionListTableLoading.vue'
import { useGameSessionListStore } from '../stores/useGameSessionListStore'

import { RouteName } from '@/router/consts'
import { useTimeAgo } from '@vueuse/core'

const gameSessionListStore = useGameSessionListStore()
gameSessionListStore.getGameSessionList()
</script>

<template>
  <GameSessionListTableLoading v-if="gameSessionListStore.loadingGameSessions" />

  <BaseCard v-else class="py-0 overflow-hidden">
    <BaseTable class="w-full overflow-x-auto table-auto text-sm">
      <BaseTableHeader>
        <BaseTableRow>
          <BaseTableHead class="whitespace-nowrap">Name</BaseTableHead>
          <BaseTableHead class="whitespace-nowrap">Status</BaseTableHead>
          <BaseTableHead class="whitespace-nowrap">Game</BaseTableHead>
          <BaseTableHead class="whitespace-nowrap">Player count</BaseTableHead>
          <BaseTableHead class="whitespace-nowrap">Move count</BaseTableHead>
          <BaseTableHead class="whitespace-nowrap">Turn count</BaseTableHead>
          <BaseTableHead class="whitespace-nowrap">Created</BaseTableHead>
          <BaseTableHead class="whitespace-nowrap">Updated</BaseTableHead>
        </BaseTableRow>
      </BaseTableHeader>

      <BaseTableBody>
        <BaseTableRow v-for="session in gameSessionListStore.gameSessions" :key="session.id" class="hover:bg-muted/30 transition-colors">
          <BaseTableCell>
            <RouterLink
              class="inline-flex underline"
              :to="{
                name: RouteName.GameSession,
                params: {
                  id: session.id,
                },
              }"
            >
              <OverflowLabel class="max-w-[250px] lg:max-w-none" :text="session.name" />
            </RouterLink>
          </BaseTableCell>
          <BaseTableCell>{{ session.status }}</BaseTableCell>
          <BaseTableCell>{{ session.game }}</BaseTableCell>
          <BaseTableCell class="text-right w-0">{{ session.players.length }}</BaseTableCell>
          <BaseTableCell class="text-right w-0">{{ session.currentMoveIndex + 1 }}</BaseTableCell>
          <BaseTableCell class="text-right w-0">{{ session.currentTurnIndex + 1 }}</BaseTableCell>
          <BaseTableCell class="whitespace-nowrap w-0">{{ useTimeAgo(session.createdAt) }}</BaseTableCell>
          <BaseTableCell class="whitespace-nowrap w-0">{{ useTimeAgo(session.updatedAt || '') }}</BaseTableCell>
        </BaseTableRow>

        <BaseTableRow v-if="!gameSessionListStore.gameSessions.length">
          <BaseTableCell colspan="4" class="text-center text-muted-foreground py-4">No game sessions found</BaseTableCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
  </BaseCard>
</template>
