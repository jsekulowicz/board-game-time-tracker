<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useColorMode } from '@vueuse/core'
import DsButton from '@/components/ds/DsButton.vue'
import { Icon } from '@iconify/vue'

const mode = useColorMode({ initialValue: 'system', disableTransition: false })

const toggleTooltip = computed(() => (mode.value === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'))

watchEffect(() => {
  document.documentElement.dataset.dsTheme = mode.value === 'dark' ? 'dark' : 'light'
})

function toggleDarkMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <DsButton variant="secondary" :tooltip="toggleTooltip" @click="toggleDarkMode">
    <Icon icon="radix-icons:half-2" />
    <span class="sr-only">Toggle dark mode</span>
  </DsButton>
</template>
