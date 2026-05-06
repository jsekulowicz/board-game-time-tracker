<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import '@jsekulowicz/ds-components/table/define'
import type { TableColumn, TableRowClickDetail } from '@jsekulowicz/ds-components/table'
import DsCard from '@/components/ds/DsCard.vue'
import GameSessionListTableLoading from './GameSessionListTableLoading.vue'
import { useGameSessionListStore } from '../stores/useGameSessionListStore'

import { RouteName } from '@/router/consts'
import { useTimeAgo } from '@vueuse/core'

const gameSessionListStore = useGameSessionListStore()
const router = useRouter()
gameSessionListStore.getGameSessionList()

type GameSessionTableRow = Record<string, unknown> & {
  id: string
  name: string
  status: string
  game: string
  playerCount: number
  moveCount: number
  turnCount: number
  created: string
  updated: string
}

const columns: TableColumn<GameSessionTableRow>[] = [
  { name: 'name', field: 'name', label: 'Name' },
  { name: 'status', field: 'status', label: 'Status' },
  { name: 'game', field: 'game', label: 'Game' },
  { name: 'playerCount', field: 'playerCount', label: 'Player count', align: 'right', width: '8rem' },
  { name: 'moveCount', field: 'moveCount', label: 'Move count', align: 'right', width: '7rem' },
  { name: 'turnCount', field: 'turnCount', label: 'Turn count', align: 'right', width: '7rem' },
  { name: 'created', field: 'created', label: 'Created', width: '8rem' },
  { name: 'updated', field: 'updated', label: 'Updated', width: '8rem' },
]

const rows = computed<GameSessionTableRow[]>(() =>
  gameSessionListStore.gameSessions.map((session) => ({
    id: session.id,
    name: session.name,
    status: session.status,
    game: session.game,
    playerCount: session.players.length,
    moveCount: session.currentMoveIndex + 1,
    turnCount: session.currentTurnIndex + 1,
    created: useTimeAgo(session.createdAt).value,
    updated: useTimeAgo(session.updatedAt || '').value,
  })),
)

function openSession(event: Event) {
  const { row } = (event as CustomEvent<TableRowClickDetail<GameSessionTableRow>>).detail

  router.push({
    name: RouteName.GameSession,
    params: {
      id: row.id,
    },
  })
}
</script>

<template>
  <GameSessionListTableLoading v-if="gameSessionListStore.loadingGameSessions" />

  <DsCard v-else class="ds-card-table">
    <ds-table :rows.prop="rows" :columns.prop="columns" clickable-rows @ds-row-click="openSession">
      <span slot="empty">No game sessions found</span>
    </ds-table>
  </DsCard>
</template>
