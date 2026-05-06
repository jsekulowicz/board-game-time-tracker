<script setup lang="ts">
import { ref } from 'vue'
import '@jsekulowicz/ds-components/dialog/define'
import DsButton from '@/components/ds/DsButton.vue'

const emit = defineEmits<{
  (event: 'continue'): void
}>()

const open = ref(false)

function endGameSession() {
  emit('continue')
  open.value = false
}
</script>

<template>
  <span @click="open = true">
    <slot name="trigger" />
  </span>

  <ds-dialog :open="open" size="sm" @ds-close="open = false">
    <span slot="title">Are you sure you want to end the game session?</span>
    <p>This action cannot be undone. You will not be able to track players within this session.</p>
    <div slot="footer" class="flex flex-wrap justify-end gap-2">
      <DsButton variant="secondary" @click="open = false">Keep tracking</DsButton>
      <DsButton variant="danger" @click="endGameSession">End game session</DsButton>
    </div>
  </ds-dialog>
</template>
