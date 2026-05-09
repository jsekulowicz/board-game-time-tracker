<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/puzzle-piece'
import '@jsekulowicz/ds-components/icon/users'
import '@jsekulowicz/ds-components/icon/chevron-right'
import '@jsekulowicz/ds-components/table/define'

import GameSessionListTableLoading from './GameSessionListTableLoading.vue'
import GameSessionStatusTag from '@/features/game-session/components/GameSessionStatusTag.vue'
import { useGameSessionListStore } from '../stores/useGameSessionListStore'

import { RouteName } from '@/router/consts'
import { useTimeAgo } from '@vueuse/core'
import type { GameSessionResource } from '@/api/generated'

const gameSessionListStore = useGameSessionListStore()
const router = useRouter()
gameSessionListStore.getGameSessionList()

const sessions = computed<GameSessionResource[]>(() => gameSessionListStore.gameSessions)

const page = ref(1)
const pageSize = ref(10)
const totalSessions = computed(() => sessions.value.length)
const pagedSessions = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sessions.value.slice(start, start + pageSize.value)
})

function onPageChange(event: Event) {
  const detail = (event as CustomEvent<{ page: number; pageSize: number }>).detail
  page.value = detail.page
  pageSize.value = detail.pageSize
}

function onPageSizeChange(event: Event) {
  const detail = (event as CustomEvent<{ pageSize: number; page: number }>).detail
  pageSize.value = detail.pageSize
  page.value = detail.page
}

function openSession(id: string) {
  router.push({ name: RouteName.GameSession, params: { id } })
}

function totalDurationMs(session: GameSessionResource): number {
  return session.players.reduce((total, player) => {
    const playerTotal = player.moves.reduce((sum, m) => sum + (m.duration ?? 0), 0)
    return total + playerTotal + (player.previousTotalTimeMs ?? 0)
  }, 0)
}

function formatTotalDuration(ms: number): string {
  if (ms <= 0) return '—'
  const totalSeconds = Math.round(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds.toString().padStart(2, '0')}s`
  return `${seconds}s`
}

function relativeUpdated(session: GameSessionResource): string {
  return useTimeAgo(session.updatedAt || session.createdAt).value
}
</script>

<template>
  <GameSessionListTableLoading v-if="gameSessionListStore.loadingGameSessions" />

  <template v-else-if="sessions.length === 0">
    <div class="empty">
      <ds-icon class="empty__icon" name="puzzle-piece" size="lg" />
      <h3>No sessions yet</h3>
      <p>Start tracking turn times by creating your first session.</p>
    </div>
  </template>

  <template v-else>
    <ul class="cards">
      <li v-for="session in pagedSessions" :key="session.id">
        <button class="card" type="button" @click="openSession(session.id)">
          <span class="card__icon">
            <ds-icon name="puzzle-piece" size="lg" />
          </span>
          <span class="card__body">
            <span class="card__head">
              <span class="card__game">{{ session.game }}</span>
              <GameSessionStatusTag :status="session.status" />
            </span>
            <span class="card__name">{{ session.name }}</span>
            <span class="card__meta">
              <span class="card__players">
                <span
                  v-for="player in session.players"
                  :key="player.id"
                  class="card__player-dot"
                  :style="{ background: player.color }"
                ></span>
                <span class="card__player-count">{{ session.players.length }}</span>
              </span>
              <span class="card__total numeric">{{ formatTotalDuration(totalDurationMs(session)) }}</span>
              <span class="card__updated">{{ relativeUpdated(session) }}</span>
            </span>
          </span>
          <ds-icon class="card__chevron" name="chevron-right" size="md" />
        </button>
      </li>
    </ul>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Status</th>
            <th class="align-right">Players</th>
            <th class="col-updated">Updated</th>
            <th class="align-right">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="session in pagedSessions" :key="session.id" @click="openSession(session.id)">
            <td>
              <div class="cell-game">
                <span class="cell-game__icon">
                  <ds-icon name="puzzle-piece" size="md" />
                </span>
                <div>
                  <div class="cell-game__title">{{ session.game }}</div>
                  <p class="cell-game__sub">{{ session.name }}</p>
                </div>
              </div>
            </td>
            <td><GameSessionStatusTag :status="session.status" /></td>
            <td class="align-right">
              <span class="cell-players">
                <span class="card__players">
                  <span
                    v-for="player in session.players"
                    :key="player.id"
                    class="card__player-dot"
                    :style="{ background: player.color }"
                  ></span>
                </span>
                <span class="card__player-count">{{ session.players.length }}</span>
              </span>
            </td>
            <td class="col-updated numeric">{{ relativeUpdated(session) }}</td>
            <td class="align-right numeric">{{ formatTotalDuration(totalDurationMs(session)) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="table-footer">
              <ds-table-pagination
                :page.prop="page"
                :page-size.prop="pageSize"
                :total.prop="totalSessions"
                @ds-page-change="onPageChange"
                @ds-page-size-change="onPageSizeChange"
              ></ds-table-pagination>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </template>
</template>

<style scoped>
.cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-3);
}

.cards li {
  display: block;
}

.card {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--ds-space-3);
  padding: var(--ds-space-4);
  border: 1px solid var(--ds-color-border);
  border-radius: var(--ds-radius-md);
  background: var(--ds-color-bg);
  text-align: left;
  cursor: pointer;
  transition: border-color 120ms ease, background-color 120ms ease;
  font: inherit;
  color: inherit;
}

.card:hover {
  border-color: var(--ds-color-border-strong);
}

.card:focus-visible {
  outline: 2px solid var(--ds-color-focus);
  outline-offset: 2px;
}

.card__icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--ds-radius-md);
  background: var(--ds-color-accent-subtle);
  color: var(--ds-color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-1);
  min-width: 0;
}

.card__head {
  display: flex;
  align-items: center;
  gap: var(--ds-space-2);
  flex-wrap: wrap;
}

.card__game {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-lg);
  letter-spacing: var(--ds-letter-spacing-display);
}

.card__name {
  font-size: var(--ds-font-size-sm);
  color: var(--ds-color-fg-muted);
}

.card__meta {
  display: flex;
  align-items: center;
  gap: var(--ds-space-3);
  font-size: var(--ds-font-size-xs);
  color: var(--ds-color-fg-muted);
  flex-wrap: wrap;
  margin-top: var(--ds-space-1);
}

.card__players {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}

.card__player-dot {
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--ds-color-bg);
  margin-left: -4px;
}

.card__player-dot:first-child {
  margin-left: 0;
}

.card__player-count {
  font-size: var(--ds-font-size-xs);
  color: var(--ds-color-fg-muted);
  margin-left: var(--ds-space-2);
}

.card__total {
  font-family: var(--ds-font-mono);
  font-variant-numeric: tabular-nums;
}

.card__chevron {
  color: var(--ds-color-fg-muted);
}

.table-wrap {
  display: none;
  border: 1px solid var(--ds-color-border);
  border-radius: var(--ds-radius-md);
  overflow: hidden;
  background: var(--ds-color-bg);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background: var(--ds-color-bg-subtle);
}

.table th {
  text-align: left;
  font-size: var(--ds-font-size-xs);
  color: var(--ds-color-fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: var(--ds-font-weight-medium);
  padding: var(--ds-space-3) var(--ds-space-4);
}

.table td {
  font-size: var(--ds-font-size-sm);
  padding: var(--ds-space-3) var(--ds-space-4);
  border-top: 1px solid var(--ds-color-border-subtle);
}

.table tbody tr {
  cursor: pointer;
  transition: background-color 120ms ease;
}

.table tbody tr:hover {
  background: var(--ds-color-bg-subtle);
}

.table tfoot td.table-footer {
  border-top: 1px solid var(--ds-color-border-subtle);
  padding: var(--ds-space-2) var(--ds-space-4);
}

.cell-game {
  display: flex;
  align-items: center;
  gap: var(--ds-space-3);
}

.cell-game__icon {
  width: 2rem;
  height: 2rem;
  border-radius: var(--ds-radius-sm);
  background: var(--ds-color-accent-subtle);
  color: var(--ds-color-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cell-game__title {
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-md);
  letter-spacing: var(--ds-letter-spacing-display);
}

.cell-game__sub {
  margin: 0;
  font-size: var(--ds-font-size-xs);
  color: var(--ds-color-fg-muted);
}

.cell-players {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-space-1);
}

.numeric {
  font-family: var(--ds-font-mono);
  font-variant-numeric: tabular-nums;
}

.align-right,
.table th.align-right,
.table td.align-right {
  text-align: right;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--ds-space-12) var(--ds-space-4);
  border: 1px dashed var(--ds-color-border);
  border-radius: var(--ds-radius-md);
  background: var(--ds-color-bg-subtle);
}

.empty__icon {
  color: var(--ds-color-fg-muted);
  margin-bottom: var(--ds-space-3);
}

.empty h3 {
  margin: 0 0 var(--ds-space-1);
  font-family: var(--ds-font-display);
  font-size: var(--ds-font-size-lg);
}

.empty p {
  margin: 0;
  color: var(--ds-color-fg-muted);
}

@media (min-width: 768px) {
  .cards {
    display: none;
  }
  .table-wrap {
    display: block;
  }
}

@media (max-width: 1100px) {
  .col-updated {
    display: none;
  }
}
</style>
