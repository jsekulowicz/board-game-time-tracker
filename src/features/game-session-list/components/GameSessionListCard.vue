<script setup lang="ts">
import { UiTable, UiTableHeader, UiTableHead, UiTableBody, UiTableRow, UiTableCell } from '@/components/ui/ui-table'
import { UiCard } from '@/components/ui/ui-card'
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

  <UiCard v-else class="py-0 overflow-hidden">
    <UiTable class="w-full overflow-x-auto table-auto text-sm">
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="whitespace-nowrap">Name</UiTableHead>
          <UiTableHead class="whitespace-nowrap">Status</UiTableHead>
          <UiTableHead class="whitespace-nowrap">Game</UiTableHead>
          <UiTableHead class="whitespace-nowrap">Player count</UiTableHead>
          <UiTableHead class="whitespace-nowrap">Move count</UiTableHead>
          <UiTableHead class="whitespace-nowrap">Turn count</UiTableHead>
          <UiTableHead class="whitespace-nowrap">Created</UiTableHead>
          <UiTableHead class="whitespace-nowrap">Updated</UiTableHead>
        </UiTableRow>
      </UiTableHeader>

      <UiTableBody>
        <UiTableRow v-for="session in gameSessionListStore.gameSessions" :key="session.id" class="hover:bg-muted/30 transition-colors">
          <UiTableCell>
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
          </UiTableCell>
          <UiTableCell>{{ session.status }}</UiTableCell>
          <UiTableCell>{{ session.game }}</UiTableCell>
          <UiTableCell class="text-right w-0">{{ session.players.length }}</UiTableCell>
          <UiTableCell class="text-right w-0">{{ session.currentMoveIndex + 1 }}</UiTableCell>
          <UiTableCell class="text-right w-0">{{ session.currentTurnIndex + 1 }}</UiTableCell>
          <UiTableCell class="whitespace-nowrap w-0">{{ useTimeAgo(session.createdAt) }}</UiTableCell>
          <UiTableCell class="whitespace-nowrap w-0">{{ useTimeAgo(session.updatedAt || '') }}</UiTableCell>
        </UiTableRow>

        <UiTableRow v-if="!gameSessionListStore.gameSessions.length">
          <UiTableCell colspan="4" class="text-center text-muted-foreground py-4">No game sessions found</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </UiCard>
</template>
