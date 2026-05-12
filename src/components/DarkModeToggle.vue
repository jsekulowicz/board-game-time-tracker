<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useColorMode } from '@vueuse/core'
import DsButton from '@/components/ds/DsButton.vue'
import '@jsekulowicz/ds-components/icon/define'
import '@jsekulowicz/ds-components/icon/moon'
import '@jsekulowicz/ds-components/icon/sun'

const mode = useColorMode({ initialValue: 'system', disableTransition: false })

const isDark = computed(() => mode.value === 'dark')
const toggleTooltip = computed(() => (isDark.value ? 'Switch to light mode' : 'Switch to dark mode'))
const iconName = computed(() => (isDark.value ? 'sun' : 'moon'))

watchEffect(() => {
  document.documentElement.dataset.dsTheme = isDark.value ? 'dark' : 'light'
})

function toggleDarkMode() {
  mode.value = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <DsButton
    variant="ghost"
    size="sm"
    :tooltip="toggleTooltip"
    tooltip-placement="left"
    tooltip-hover-only
    aria-label="Toggle theme"
    @click="toggleDarkMode"
  >
    <ds-icon slot="leading" :name="iconName" size="lg" />
  </DsButton>
</template>
